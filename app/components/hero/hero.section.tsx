"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"

import { SLIDES } from "./components/hero.slides"
import { IntroOverlay } from "./components/intro-overlay"
import { HeroStage } from "./components/hero-stage"

export function HeroSection({ onIntroDone }: { onIntroDone?: () => void }) {
  const [introActive, setIntroActive] = React.useState(true)
  const [index, setIndex] = React.useState(0)

  const active = SLIDES[index]

  function finishIntro() {
    setIntroActive(false)
    onIntroDone?.()
  }

  return (
    <section className="relative w-full">
      {/* HERO sempre montado por trás (sem delay) */}
      <HeroStage
        active={active}
        index={index}
        setIndex={setIndex}
        introActive={introActive}
      />

      {/* INTRO por cima */}
      <AnimatePresence>
        {introActive ? (
          <IntroOverlay
            key="intro"
            videoSrc="/videos/serrado.webm"
            onDone={finishIntro}
          />
        ) : null}
      </AnimatePresence>
    </section>
  )
}
