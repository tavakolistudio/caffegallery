"use client"
import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false)
  const howlRef = useRef<{ play: () => void; pause: () => void } | null>(null)
  const [loaded, setLoaded] = useState(false)

  const toggle = async () => {
    try {
      if (!loaded) {
        const { Howl } = await import("howler")
        howlRef.current = new Howl({
          src: ["/audio/cafe-ambience.mp3"],
          loop: true,
          volume: 0.3,
          onloaderror: () => {},
        })
        setLoaded(true)
      }
      if (playing) {
        howlRef.current?.pause()
        setPlaying(false)
      } else {
        howlRef.current?.play()
        setPlaying(true)
      }
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute" : "Sound"}
      className="text-[#516254] hover:text-[#121613] transition-colors"
    >
      {playing ? <Volume2 size={15} /> : <VolumeX size={15} />}
    </button>
  )
}
