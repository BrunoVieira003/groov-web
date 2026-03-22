import type { ArtistSummary } from "./artist"
import type Song from "./song"

export interface Album{
    id?: string
    title: string
    year?: string
    coverArtFormat?: string
    songs: Song[]
    artist: ArtistSummary
}

export interface AlbumSummary extends Pick<Album, 'id' | 'title' | 'year' | 'coverArtFormat' | 'artist'>{}