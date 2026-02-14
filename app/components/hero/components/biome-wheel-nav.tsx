"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Slide } from "./hero.slides"

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function BiomeWheelNav({
  slides,
  index,
  onChange,
  disabled,
  onInteract, // ✅ novo: pai usa pra resetar timer
}: {
  slides: readonly Slide[]
  index: number
  onChange: (nextIndex: number) => void
  disabled?: boolean
  onInteract?: () => void
}) {
  const len = slides.length
  const prevIdx = mod(index - 1, len)
  const nextIdx = mod(index + 1, len)

  const cur = slides[index]
  const Icon = cur.Icon

  function goPrev() {
    if (disabled) return
    onInteract?.()
    onChange(prevIdx)
  }

  function goNext() {
    if (disabled) return
    onInteract?.()
    onChange(nextIdx)
  }

  return (
    <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="pointer-events-auto mx-auto w-full max-w-[450px]">
          <div className="mx-auto flex flex-col items-center">
            {/* 🔺 TOPO — BIOMA SELECIONADO */}
            <motion.div
              key={cur.key}
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="text-center text-sm font-semibold tracking-[0.28em] text-white/90 drop-shadow">
                {cur.display.toUpperCase()}
              </div>

              <motion.button
                type="button"
                disabled={disabled}
                className={cn(
                  "mt-3 grid place-items-center",
                  "h-14 w-14 rounded-full",
                  // 🌿 Verde claro glass (selecionado)
                  "border border-emerald-200/45 bg-emerald-200/18 backdrop-blur-2xl",
                  "shadow-[0_12px_32px_rgba(0,0,0,0.35)]",
                  "ring-1 ring-emerald-200/25",
                  disabled ? "opacity-55" : "hover:bg-emerald-200/25"
                )}
                whileHover={disabled ? undefined : { y: -2 }}
                whileTap={disabled ? undefined : { scale: 0.96 }}
                aria-label={`Biome atual: ${cur.display}`}
              >
                <span
                  className={cn(
                    "grid place-items-center rounded-full",
                    "h-10 w-10",
                    "border border-emerald-200/35 bg-emerald-200/15",
                    "text-emerald-50"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
              </motion.button>
            </motion.div>

            {/* 🔻 BASE — SETAS (mais afastadas e simétricas) */}
            <div className="mt-7 w-full">
              <div className="mx-auto flex w-full items-center justify-between px-14 sm:px-20">
                <NavArrow
                  disabled={disabled}
                  onClick={goPrev}
                  ariaLabel={`Anterior: ${slides[prevIdx]?.display ?? "anterior"}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </NavArrow>

                <NavArrow
                  disabled={disabled}
                  onClick={goNext}
                  ariaLabel={`Próximo: ${slides[nextIdx]?.display ?? "próximo"}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </NavArrow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavArrow({
  disabled,
  onClick,
  ariaLabel,
  children,
}: {
  disabled?: boolean
  onClick: () => void
  ariaLabel: string
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "grid place-items-center",
        "h-11 w-11 rounded-full",
        "border border-white/15 bg-white/80 text-black/80",
        "shadow-[0_10px_26px_rgba(0,0,0,0.35)]",
        "backdrop-blur-md",
        disabled ? "opacity-50" : "hover:bg-white/90"
      )}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
