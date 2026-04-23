import { env } from "$env/dynamic/private";
import type { PlaylistSummary } from "$lib/types/playlist";
import type { Actions, PageServerLoad } from "../library/$types";

export const load: PageServerLoad = async () => {
    try {
        const response = await fetch(`${env.API_URL}/playlists`)
        const data = await response.json() as { playlists: PlaylistSummary[] }
        return { playlists: data.playlists }
    } catch (e) {
        console.error(e)
    }
}

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData()

        await fetch(`${env.API_URL}/playlists`, {
            method: 'post',
            body: formData
        })
    }
} satisfies Actions