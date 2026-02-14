"use client"

import * as React from "react"
import { LiquidGlassHeader } from "./components/header/liquid-glass-header"

import ProblemSection from "./components/problem/problem.section"
import { ImpactSection } from "./components/impact/impact.section"
import { HeroSection } from "./components/hero/hero.section"

export default function Home() {
  const [introDone, setIntroDone] = React.useState(false)

  return (
    <main className="min-h-dvh text-white">
      {introDone ? <LiquidGlassHeader /> : null}


      <HeroSection onIntroDone={() => setIntroDone(true)} />

      {/* o resto do site */}
      <ProblemSection />
      <ImpactSection />
    </main>
  )
}
