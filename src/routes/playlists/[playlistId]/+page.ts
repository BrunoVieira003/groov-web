import { env } from "$env/dynamic/public";
import type { Playlist } from "$lib/types/playlist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/playlists/${params.playlistId}`)
        const data = await response.json() as Playlist
        return { playlist: data }
    } catch (e) {
        console.log(e)
    }
}