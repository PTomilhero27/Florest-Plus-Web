"use client"

import * as React from "react"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion"
import { cn } from "@/lib/utils"
import logo from "@/app/image/logo.png"

const NAV = [
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Como Operamos", href: "#como-operamos" },
  { label: "Governança", href: "#governanca" },
  { label: "Projetos", href: "#projetos" },
  { label: "Conhecimento", href: "#conhecimento" },
  { label: "Nosso Time", href: "#time" },
]

function useLockBodyScroll(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

const drawer: Variants = {
  hidden: { opacity: 0, y: -14, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.9,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: { duration: 0.18, ease: "easeOut" },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
}

export function LiquidGlassHeader() {
  const [open, setOpen] = React.useState(false)
  useLockBodyScroll(open)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 120], [0, -6])
  const opacity = useTransform(scrollY, [0, 140], [1, 0.92])
  const blur = useTransform(scrollY, [0, 140], [10, 16])
  const backdrop = useTransform(blur, (b) => `blur(${b}px)`)

  function close() {
    setOpen(false)
  }

  return (
    <>
      <motion.header
        style={{ y, opacity }}
        className="fixed left-0 top-0 z-50 w-full px-3 pt-3"
      >
        {/* ✅ quando open no mobile, escondemos a barra do header pra não duplicar */}
        <motion.div
          style={{ backdropFilter: backdrop }}
          initial={{ y: -18, opacity: 0, scale: 0.985 }}
          animate={
            open
              ? { opacity: 0, scale: 0.99, y: -6 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={cn(
            "mx-auto max-w-6xl",
            open ? "pointer-events-none lg:pointer-events-auto" : ""
          )}
        >
          <div className="liquid-glass relative overflow-hidden rounded-2xl border border-white/15">
            {/* “líquido” dentro do vidro */}
            <div className="pointer-events-none absolute inset-0">
              <div className="liquid-blob liquid-blob-a" />
              <div className="liquid-blob liquid-blob-b" />
              <div className="liquid-noise" />
              <div className="liquid-highlight" />
            </div>

            <div className="relative flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
              <a href="#" className="flex items-center gap-2">
                <Image
                  src={logo}
                  className="h-7 w-auto opacity-95"
                  alt="Logo"
                  width={110}
                  height={28}
                  priority
                />
              </a>

              <nav className="hidden items-center gap-6 lg:flex">
                {NAV.map((nav) => (
                  <a
                    key={nav.href}
                    href={nav.href}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {nav.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button className="hidden rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 sm:block">
                  PT <span className="ml-1 inline-block opacity-70">▾</span>
                </button>

                <a
                  href="#contato"
                  className="hidden rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90 sm:inline-flex"
                >
                  Fale Conosco
                </a>

                {/* Mobile toggle */}
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white/85 transition hover:bg-white/10 lg:hidden"
                  aria-label={open ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={open}
                >
                  <AnimatedMenuIcon open={open} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu (descendo) */}
      <AnimatePresence>
        {open ? (
          <>
            {/* Overlay */}
            <motion.button
              aria-label="Fechar menu"
              className="fixed inset-0 z-40 cursor-default bg-transparent"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                background:
                  "radial-gradient(1200px 600px at 70% 10%, rgba(120,255,210,0.16), rgba(0,0,0,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                backdropFilter: "blur(12px)",
              }}
            />

            {/* ✅ Menu começa no topo (mesmo lugar do header) e desce */}
            <motion.aside
              className="fixed left-3 right-3 top-3 z-50 overflow-hidden rounded-2xl border border-white/15"
              variants={drawer}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="liquid-glass relative">
                <div className="pointer-events-none absolute inset-0">
                  <div className="liquid-blob liquid-blob-a" />
                  <div className="liquid-blob liquid-blob-b" />
                  <div className="liquid-noise" />
                  <div className="liquid-highlight" />
                </div>

                <div className="relative p-4">
                  {/* Header do menu */}
                  <div className="flex items-center justify-between">
                    <Image
                      src={logo}
                      className="h-7 w-auto opacity-95"
                      alt="Logo"
                      width={110}
                      height={28}
                      priority
                    />

                    <button
                      onClick={close}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white/85 transition hover:bg-white/10"
                      aria-label="Fechar"
                    >
                      <AnimatedMenuIcon open />
                    </button>
                  </div>

                  {/* Links */}
                  <motion.div
                    className="mt-4 grid gap-1"
                    variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                    initial="hidden"
                    animate="show"
                  >
                    {NAV.map((nav) => (
                      <motion.a
                        variants={item}
                        key={nav.href}
                        href={nav.href}
                        onClick={close}
                        className="rounded-xl px-3 py-3 text-sm text-white/85 transition hover:bg-white/10"
                      >
                        {nav.label}
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Footer actions */}
                  <motion.div variants={item} className="mt-4 flex items-center gap-2">
                    <button className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                      PT <span className="ml-1 inline-block opacity-70">▾</span>
                    </button>

                    <a
                      href="#contato"
                      onClick={close}
                      className="flex-1 rounded-2xl bg-white px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-white/90"
                    >
                      Fale Conosco
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

/**
 * Ícone hamburger -> X (animado).
 */
function AnimatedMenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-5">
      <motion.span
        className="absolute left-0 top-[3px] h-[2px] w-5 rounded-full bg-white/90"
        animate={open ? { top: "9px", rotate: 45 } : { top: "3px", rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.span
        className="absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-white/90"
        animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.span
        className="absolute left-0 top-[15px] h-[2px] w-5 rounded-full bg-white/90"
        animate={open ? { top: "9px", rotate: -45 } : { top: "15px", rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </span>
  )
}
