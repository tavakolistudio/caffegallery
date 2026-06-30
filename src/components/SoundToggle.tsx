"use client"
import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const audio = new Audio("/audio/cafe-music.mp3")
    audio.loop = true
    audio.volume = 0.25
    audioRef.current = audio

    const startMusic = () => {
      if (startedRef.current) return
      startedRef.current = true
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }

    // Try immediate autoplay
    audio.play().then(() => {
      startedRef.current = true
      setPlaying(true)
    }).catch(() => {
      // Blocked by browser — start on first user interaction
      const handler = () => {
        startMusic()
        document.removeEventListener("click", handler)
        document.removeEventListener("touchstart", handler)
        document.removeEventListener("keydown", handler)
      }
      document.addEventListener("click", handler)
      document.addEventListener("touchstart", handler)
      document.addEventListener("keydown", handler)
    })

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      title={playing ? "Mute" : "Play music"}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(244,233,216,0.12)] text-[#B8A58F] hover:text-[#C58A45] hover:border-[#C58A45] transition-all duration-200"
    >
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
