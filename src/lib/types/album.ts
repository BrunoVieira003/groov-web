import type { ArtistSummary } from "./artist"
import type { ColorPalette } from "./colors"
import type Song from "./song"

export interface Album{
    id?: string
    title: string
    year?: string
    colors: ColorPalette
    songs: Song[]
    artist: ArtistSummary
}

export interface AlbumSummary extends Pick<Album, 'id' | 'title' | 'year' | 'artist' | 'colors'>{}