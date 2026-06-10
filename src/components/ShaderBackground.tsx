"use client"
import { useEffect, useRef } from "react"

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

// Domain-warped fractal Brownian motion — amber/smoke palette matching caffegallery
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i),           f),
        dot(hash2(i+vec2(1.,0.)),f-vec2(1.,0.)), u.x),
    mix(dot(hash2(i+vec2(0.,1.)),f-vec2(0.,1.)),
        dot(hash2(i+vec2(1.,1.)),f-vec2(1.,1.)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 R = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = R * p * 2.1 + vec2(100.7, 98.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float asp = u_res.x / u_res.y;

  vec2 st = vec2(uv.x * asp, uv.y);
  float t  = u_time * 0.10;
  vec2 m   = (u_mouse - 0.5) * vec2(asp, 1.0) * 0.10;

  // Three layers of domain-warping for depth
  vec2 q = vec2(fbm(st + t * 0.9),
                fbm(st + vec2(5.2, 1.3) + t));
  vec2 r = vec2(fbm(st + 1.5*q + vec2(1.7, 9.2) + 0.16*t + m),
                fbm(st + 1.5*q + vec2(8.3, 2.8) + 0.13*t + m));
  float f = fbm(st + 2.0*r + t*0.45);

  float n = clamp(f * 0.5 + 0.5, 0.0, 1.0);

  // Caffegallery color ramp:
  // #080604 → mid-brown → #C58A45 → warm highlight
  vec3 col = mix(vec3(0.031, 0.024, 0.016), vec3(0.38, 0.20, 0.06), pow(n, 1.1));
  col = mix(col, vec3(0.773, 0.541, 0.271), pow(n, 2.2));
  col = mix(col, vec3(0.96,  0.82,  0.46),  pow(n, 5.5));

  // Soft centre glow to focus the eye
  vec2 cv = (uv - vec2(0.5, 0.38)) / vec2(asp, 1.0);
  col += vec3(0.773, 0.541, 0.271) * 0.05 / (dot(cv, cv) * 8.0 + 0.12);

  // Vignette
  vec2 vp = uv * 2.0 - 1.0;
  col *= 1.0 - dot(vp * 0.52, vp * 0.52);

  // Bottom-to-black gradient so content below blends
  col *= smoothstep(0.0, 0.38, uv.y);

  gl_FragColor = vec4(col, 1.0);
}
`

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null
    if (!gl) return

    function mkShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime  = gl.getUniformLocation(prog, "u_time")
    const uRes   = gl.getUniformLocation(prog, "u_res")
    const uMouse = gl.getUniformLocation(prog, "u_mouse")

    let mouse = { x: 0.5, y: 0.5 }
    let raf   = 0

    function resize() {
      const c = canvasRef.current
      if (!c) return
      c.width  = c.offsetWidth
      c.height = c.offsetHeight
      gl!.viewport(0, 0, c.width, c.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight }
    }
    window.addEventListener("mousemove", onMove)

    const t0 = performance.now()
    function draw() {
      const c = canvasRef.current
      if (!c) return
      gl!.uniform1f(uTime,  (performance.now() - t0) / 1000)
      gl!.uniform2f(uRes,   c.width, c.height)
      gl!.uniform2f(uMouse, mouse.x, mouse.y)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
}
