import { env } from "$env/dynamic/private"
import playlistStore from "$lib/stores/playlistList"
import type { PlaylistSummary } from "$lib/types/playlist"
import { get } from "svelte/store"
import type { PageServerLoad } from "./library/$types"

export const load: PageServerLoad = async () => {
    try {
        const response = await fetch(`${env.API_URL}/playlists`,)
        const data = await response.json() as { playlists: PlaylistSummary[] }

        return {playlists: data.playlists}
    } catch (e) {
        console.log(e)
    }

}