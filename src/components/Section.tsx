import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-24 px-6 max-w-7xl mx-auto", className)}
    >
      {children}
    </section>
  )
}
