"use client"

import * as React from "react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import type { Slide } from "./hero.slides"

function phraseFor(slide: Slide) {
  if (slide.key === "mata") {
    return {
      line1: "Regenerando o futuro na",
      // mata atlântica em UPPERCASE (como você pediu)
      words: [
        { text: "MATA", className: "text-emerald-100" },
        { text: "ATLÂNTICA", className: "text-emerald-100" },
      ],
    }
  }

  const prep = slide.key === "serrado" ? "no" : "na" // no cerrado | na amazônia
  return {
    line1: "Regenerando o",
    line2: `futuro ${prep} `,
    // biome em lowercase (como você pediu)
    words: [
      { text: slide.label, className: "text-emerald-100" },
    ],
  }
}

export function HeroTypewriter({ slide }: { slide: Slide }) {
  const { line1, line2, words } = React.useMemo(() => phraseFor(slide), [slide])

  return (
    <div className="mx-auto max-w-5xl text-center">
      {/* Linha 1 */}
      <div className="mr-2 text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center">
        {line1}
      </div>

      {/* Linha 2 com typewriter (remonta a cada slide) */}
      <div className="mt-2 flex justify-center">
        <div className=" flex text-balance text-[10.5vw] font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
         <div className="mr-2 text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center">
          {line2}
          </div>
            <TypewriterEffect
            key={slide.key}
            words={words}
            className="justify-center"
            cursorClassName="bg-white/60"
          />
        </div>
      </div>
    </div>
  )
}
