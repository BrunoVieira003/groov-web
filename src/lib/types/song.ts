import type { AlbumSummary } from "./album"
import type { ColorPalette } from "./colors"

export default interface Song{
    id?: string
    title: string
    year?: number
    colors: ColorPalette
    duration?: number
    createdAt: string
    updatedAt: string
    album: AlbumSummary
    authors: {
        id: string
        name: string
    }[],
    trackNumber?: number | null
    relationId?: string
}