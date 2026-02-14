import type { StaticImageData } from "next/image"
import { Flame, Leaf, Trees } from "lucide-react"

import serradoImg from "@/app/image/serrado.png"
import amazoniaImg from "@/app/image/amazonia.png"
import mataAtlanticaImg from "@/app/image/mata-atlantica.png"

export type BiomeKey = "serrado" | "amazonia" | "mata"

export type Slide = Readonly<{
  key: BiomeKey
  /** label em lowercase para composição de frase (cerrado/amazônia/mata atlântica) */
  label: string
  /** display curto para UI (ex: CERRADO) */
  display: string
  img: StaticImageData
  Icon: React.ForwardRefExoticComponent<any>
}>

export const SLIDES = [
  {
    key: "serrado",
    label: "cerrado",
    display: "CERRADO",
    img: serradoImg,
    Icon: Leaf,
  },
  {
    key: "mata",
    label: "mata atlântica",
    display: "MATA ATLÂNTICA",
    img: mataAtlanticaImg,
    Icon: Trees,
  },
  {
    key: "amazonia",
    label: "amazônia",
    display: "AMAZÔNIA",
    img: amazoniaImg,
    Icon: Flame,
  },
] as const satisfies readonly Slide[]
