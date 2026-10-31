import { API_URL } from "$lib";
import type { PlaylistSummary } from "$lib/types/playlist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try {
        const response = await fetch(`${API_URL}/playlists`)
        const data = await response.json() as { playlists: PlaylistSummary[] }
        return { playlists: data.playlists }
    } catch (e) {
        console.error(e)
    }
}