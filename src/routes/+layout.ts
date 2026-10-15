import { env } from "$env/dynamic/public"
import type { PlaylistSummary } from "$lib/types/playlist"
import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/playlists`,)
        const data = await response.json() as { playlists: PlaylistSummary[] }

        return {playlists: data.playlists}
    } catch (e) {
        console.log(e)
    }

}