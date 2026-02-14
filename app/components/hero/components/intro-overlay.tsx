"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { VideoText } from "@/components/ui/video-text"

export function IntroOverlay({
  videoSrc,
  onDone,
}: {
  videoSrc: string
  onDone: () => void
}) {
  React.useEffect(() => {
    // ✅ tempo total da intro
    const t = setTimeout(() => onDone(), 5200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(12px)", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          {/* ✅ texto cresce e “entra” na tela no final */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1, 1.62],
              filter: ["blur(0px)", "blur(0px)", "blur(7px)"],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 5.2,
              times: [0, 0.72, 1],
              ease: ["easeOut", "easeInOut", "easeIn"],
            }}
          >
            <div className="relative h-[260px] w-[min(92vw,980px)] overflow-hidden">
              <VideoText src={videoSrc}>Florest+</VideoText>
            </div>

            {/* glow suave */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-40 blur-2xl"
              style={{
                background:
                  "radial-gradient(600px 220px at 50% 50%, rgba(255,255,255,0.18), rgba(0,0,0,0))",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* fechamento suave */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.35, duration: 0.65 }}
        style={{
          background:
            "radial-gradient(900px 600px at 50% 50%, rgba(0,0,0,0), rgba(0,0,0,1))",
        }}
      />
    </motion.div>
  )
}
