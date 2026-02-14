"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

import type { Slide } from "./hero.slides"
import { SLIDES } from "./hero.slides"
import { HeroTypewriter } from "./hero-typewriter"
import { BiomeWheelNav } from "./biome-wheel-nav"

export function HeroStage({
  active,
  index,
  setIndex,
  introActive,
}: {
  active: Slide
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  introActive: boolean
}) {
  // ✅ zoom-in só na primeira entrada pós-intro e PARA (não “volta”)
  const didPostIntroRef = React.useRef(false)
  const [postIntroEnter, setPostIntroEnter] = React.useState(false)

  React.useEffect(() => {
    if (!introActive && !didPostIntroRef.current) {
      didPostIntroRef.current = true
      setPostIntroEnter(true)
      const t = setTimeout(() => setPostIntroEnter(false), 1600)
      return () => clearTimeout(t)
    }
  }, [introActive])

  // ✅ Toda vez que o slide mudar: dar um zoom-in lento
  const [zoomPulse, setZoomPulse] = React.useState(false)

  React.useEffect(() => {
    if (introActive) return
    setZoomPulse(true)
    const t = setTimeout(() => setZoomPulse(false), 2600) // duração do “pulso”
    return () => clearTimeout(t)
  }, [active.key, introActive])

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      {/* Background crossfade suave (sem flash branco) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.key}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            // ✅ zoom lento em toda troca
            scale: zoomPulse ? [1.16, 1.02] : 1.02,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{
            // crossfade mais “cinema”
            opacity: { duration: 1.45, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 1.1, ease: "easeOut" },
            // ✅ zoom mais demorado
            scale: zoomPulse
              ? { duration: 2.6, ease: [0.16, 1, 0.3, 1] }
              : { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <Image
            src={active.img}
            alt={active.display}
            fill
            priority
            className="object-cover"
          />

          {/* overlays SEMPRE presentes (anti flash branco) */}
          <div className="absolute inset-0 bg-black/22" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_55%,rgba(0,0,0,0.08),rgba(0,0,0,0.62))]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]" />

          {/* grão leve */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
              backgroundSize: "220px 220px",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-4">
        <motion.div
          className="w-full"
          initial={false}
          animate={
            introActive
              ? { opacity: 0, y: 10, filter: "blur(12px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-5xl text-center">
            <HeroTypewriter slide={active} />

            <p className="mx-auto mt-6 max-w-2xl text-sm text-white/85 sm:text-base">
              Compre árvores, gere impacto real e acompanhe o plantio com TreeTags.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Nav */}
      <BiomeWheelNav
        slides={SLIDES}
        index={index}
        disabled={introActive}
        onChange={(next) => {
          setIndex(next)
        }}
      />
    </div>
  )
}
