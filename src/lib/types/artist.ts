import type Song from "./song"

export default interface Artist{
    id?: string,
    name: string,
    songs: {
        song: Song
    }[]
}