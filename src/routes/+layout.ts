import { env } from "$env/dynamic/public"
import playlistStore from "$lib/stores/playlistList"
import type { PlaylistSummary } from "$lib/types/playlist"
import type { PageServerLoad } from "./library/$types"

export const load: PageServerLoad = async () => {
    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/playlists`,)
        const data = await response.json() as { playlists: PlaylistSummary[] }

        playlistStore.set({ items: data.playlists })
    } catch (e) {
        console.log(e)
    }

}