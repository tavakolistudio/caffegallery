"use client"
import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false)
  const howlRef = useRef<{ play: () => void; pause: () => void; stop: () => void } | null>(null)
  const [loaded, setLoaded] = useState(false)

  const toggle = async () => {
    try {
      if (!loaded) {
        const { Howl } = await import("howler")
        howlRef.current = new Howl({
          src: ["/audio/cafe-ambience.mp3"],
          loop: true,
          volume: 0.3,
          onloaderror: () => {
            // fail silently if file missing
          },
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
    } catch {
      // fail silently
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(244,233,216,0.12)] text-[#B8A58F] hover:text-[#C58A45] hover:border-[#C58A45] transition-all duration-200"
    >
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
