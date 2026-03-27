import type { Album } from "./album"
import type Song from "./song"

export default interface Artist{
    id?: string,
    name: string,
    songs: Song[],
    albums: Album[]
}

export interface ArtistSummary extends Pick<Artist, 'id' | 'name'>{}