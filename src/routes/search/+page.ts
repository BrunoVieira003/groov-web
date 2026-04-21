import { env } from "$env/dynamic/public";
import type Artist from "$lib/types/artist";
import type { Playlist, PlaylistSummary } from "$lib/types/playlist";
import type Song from "$lib/types/song";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {
    const query = url.searchParams.get('q')
    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/search?q=${query}`,)
        const data = await response.json() as { songs: Song[], artists: Artist[], playlists: PlaylistSummary[] }
        return { songs: data.songs, artists: data.artists, playlists: data.playlists }
    } catch (e) {
        console.log(e)
    }

}