import { env } from "$env/dynamic/private";
import type { Playlist } from "$lib/types/playlist";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { invalidateAll } from "$app/navigation";
import toast from "svelte-hot-french-toast";

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await fetch(`${env.API_URL}/playlists/${params.playlistId}`)
        const data = await response.json() as Playlist
        return { playlist: data }
    } catch (e) {
        console.log(e)
    }
}

export const actions = {
    updateCover: async ({request, params, fetch}) => {
        const data = await request.formData()
        try{
            await fetch(`${env.API_URL}/playlists/${params.playlistId}/cover`, {
                method: 'PATCH',
                body: data
            })
        }catch(e){
            console.log(e)
        }
    }
} satisfies Actions