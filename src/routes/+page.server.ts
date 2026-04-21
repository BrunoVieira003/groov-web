import { env } from "$env/dynamic/private";
import type Song from "$lib/types/song";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const response = await fetch(`${env.API_URL}/songs`)
        const data = await response.json() as { songs: Song[] }
        return { songs: data.songs }
    } catch (e) {
        console.log(e)
    }

}