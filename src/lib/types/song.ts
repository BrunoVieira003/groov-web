import type { AlbumSummary } from "./album"

export default interface Song{
    id?: string
    title: string
    year?: number
    color?: string
    contrastColor?: string
    createdAt: string
    updatedAt: string
    album: AlbumSummary
    authors: {
        id: string
        name: string
    }[]
}