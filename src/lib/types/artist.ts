import type Song from "./song"

export default interface Artist{
    id?: string,
    name: string,
    songs: Song[]
}

export interface ArtistSummary extends Pick<Artist, 'id' | 'name'>{}