"use client"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function SvgBean({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.45)} viewBox="0 0 60 87" fill="none">
      <ellipse cx="30" cy="43" rx="27" ry="41" fill="#C58A45" opacity={opacity} />
      <path
        d="M30 6 Q36 43 30 80"
        stroke="#7A4520"
        strokeWidth="2.5"
        opacity={opacity * 0.55}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SvgRing({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="47" stroke="#C58A45" strokeWidth="2.5" opacity={opacity} />
      <circle cx="50" cy="50" r="41" stroke="#C58A45" strokeWidth="1.5" opacity={opacity * 0.55} />
      <circle cx="50" cy="50" r="35" stroke="#C58A45" strokeWidth="1" opacity={opacity * 0.28} />
    </svg>
  )
}

function SvgDrop({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={Math.round(size * 0.7)} height={size} viewBox="0 0 44 63" fill="none">
      <path d="M22 5 C40 24 40 44 22 56 C4 44 4 24 22 5Z" fill="#C58A45" opacity={opacity} />
    </svg>
  )
}

function SvgAnise({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {[0, 45, 90, 135].map(a => (
        <ellipse key={a} cx="50" cy="50" rx="44" ry="9" transform={`rotate(${a} 50 50)`} fill="#C58A45" opacity={opacity * 0.78} />
      ))}
      <circle cx="50" cy="50" r="11" fill="#C58A45" opacity={opacity} />
      <circle cx="50" cy="50" r="5" fill="#7A4520" opacity={opacity * 0.85} />
    </svg>
  )
}

type Shape = "bean" | "ring" | "drop" | "anise"

interface Deco {
  id: string
  shape: Shape
  x: string
  y: string
  size: number
  rot: number
  op: number
  dy: number
}

const DECOS: Deco[] = [
  // Always visible — gentle drift
  { id: "dc1",  shape: "bean",  x: "6vw",  y: "12vh",  size: 50, rot: 22,   op: 0.11, dy: -260  },
  { id: "dc2",  shape: "ring",  x: "86vw", y: "20vh",  size: 92, rot: 0,    op: 0.06, dy: -140  },
  { id: "dc3",  shape: "bean",  x: "91vw", y: "58vh",  size: 36, rot: -40,  op: 0.13, dy: -310  },
  { id: "dc4",  shape: "drop",  x: "14vw", y: "72vh",  size: 27, rot: 14,   op: 0.09, dy: -380  },
  { id: "dc5",  shape: "anise", x: "46vw", y: "88vh",  size: 38, rot: 12,   op: 0.07, dy: -220  },
  // Enter on early scroll (~20-40%)
  { id: "dc6",  shape: "ring",  x: "3vw",  y: "112vh", size: 70, rot: 18,   op: 0.05, dy: -500  },
  { id: "dc7",  shape: "bean",  x: "92vw", y: "135vh", size: 44, rot: 52,   op: 0.12, dy: -600  },
  { id: "dc8",  shape: "anise", x: "8vw",  y: "148vh", size: 42, rot: 8,    op: 0.07, dy: -680  },
  { id: "dc9",  shape: "drop",  x: "89vw", y: "165vh", size: 30, rot: -18,  op: 0.09, dy: -740  },
  // Enter on mid scroll (~40-60%)
  { id: "dc10", shape: "ring",  x: "87vw", y: "200vh", size: 112, rot: 32,  op: 0.04, dy: -900  },
  { id: "dc11", shape: "bean",  x: "4vw",  y: "218vh", size: 56, rot: -23,  op: 0.10, dy: -980  },
  { id: "dc12", shape: "anise", x: "90vw", y: "248vh", size: 44, rot: 22,   op: 0.07, dy: -1100 },
  { id: "dc13", shape: "drop",  x: "6vw",  y: "272vh", size: 28, rot: 4,    op: 0.09, dy: -1200 },
  // Enter on deeper scroll (~60-80%)
  { id: "dc14", shape: "ring",  x: "5vw",  y: "330vh", size: 80, rot: -12,  op: 0.05, dy: -1400 },
  { id: "dc15", shape: "bean",  x: "91vw", y: "355vh", size: 40, rot: 62,   op: 0.11, dy: -1560 },
  { id: "dc16", shape: "anise", x: "10vw", y: "390vh", size: 38, rot: -28,  op: 0.08, dy: -1700 },
  { id: "dc17", shape: "bean",  x: "86vw", y: "420vh", size: 48, rot: 15,   op: 0.10, dy: -1850 },
  // Enter near end (~80-100%)
  { id: "dc18", shape: "drop",  x: "4vw",  y: "460vh", size: 32, rot: 7,    op: 0.09, dy: -2000 },
  { id: "dc19", shape: "ring",  x: "89vw", y: "495vh", size: 86, rot: 24,   op: 0.04, dy: -2100 },
  { id: "dc20", shape: "bean",  x: "8vw",  y: "530vh", size: 42, rot: -48,  op: 0.11, dy: -2250 },
]

function DecoShape({ shape, size, op }: { shape: Shape; size: number; op: number }) {
  switch (shape) {
    case "bean":  return <SvgBean  size={size} opacity={op} />
    case "ring":  return <SvgRing  size={size} opacity={op} />
    case "drop":  return <SvgDrop  size={size} opacity={op} />
    case "anise": return <SvgAnise size={size} opacity={op} />
  }
}

export default function ParallaxDeco() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const anims = DECOS.map(d => {
      const el = document.getElementById(d.id)
      if (!el) return null
      return gsap.to(el, {
        y: d.dy,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      })
    })

    return () => {
      anims.forEach(a => a?.scrollTrigger?.kill())
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 4 }}
    >
      {DECOS.map(d => (
        <div
          key={d.id}
          id={d.id}
          className="absolute"
          style={{
            left: d.x,
            top: d.y,
            transform: `rotate(${d.rot}deg)`,
            willChange: "transform",
          }}
        >
          <DecoShape shape={d.shape} size={d.size} op={d.op} />
        </div>
      ))}
    </div>
  )
}
