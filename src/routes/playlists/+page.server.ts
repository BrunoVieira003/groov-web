import { PUBLIC_API_URL } from "$env/static/public";
import api from "$lib/plugins/api.js";
import type { PlaylistSummary } from "$lib/types/playlist";
import type { Actions, PageServerLoad } from "../library/$types";

export const load: PageServerLoad = async () => {
    try{
        const response = await fetch(`${PUBLIC_API_URL}/playlists`)
        const data = await response.json() as {playlists: PlaylistSummary[]}
        return {playlists: data.playlists}
    }catch(e){
        console.error(e)
    }
}

export const actions = {
    default: async ({request}) => {
        const data = await request.formData()
        const title = data.get('title')
        await api.post('/playlists', {title})
    }
} satisfies Actions