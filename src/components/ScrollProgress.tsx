"use client"
import { useState, useEffect } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#C58A45] to-[#D7A85B] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
