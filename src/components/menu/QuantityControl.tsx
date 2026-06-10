"use client"

import { toPersian } from "@/lib/persianNumbers"

interface Props {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  size?: "sm" | "md"
}

export default function QuantityControl({ quantity, onIncrease, onDecrease, size = "md" }: Props) {
  const dim = size === "sm" ? "w-8 h-8 text-base" : "w-10 h-10 text-lg"

  return (
    <div className="flex items-center gap-2" dir="ltr">
      <button
        onClick={onDecrease}
        className={`${dim} rounded-full flex items-center justify-center font-bold border transition-colors`}
        style={{
          borderColor: quantity <= 1 ? "#E2EDE8" : "#1B5C38",
          color: quantity <= 1 ? "#C0CBBD" : "#1B5C38",
          background: "transparent",
        }}
        aria-label="کاهش تعداد"
      >
        −
      </button>
      <span className="text-sm font-bold text-[#121613] min-w-[1.5rem] text-center select-none">
        {toPersian(quantity)}
      </span>
      <button
        onClick={onIncrease}
        className={`${dim} rounded-full flex items-center justify-center font-bold transition-colors text-white`}
        style={{ background: "#1B5C38" }}
        aria-label="افزایش تعداد"
      >
        +
      </button>
    </div>
  )
}
