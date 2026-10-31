import { API_URL } from "$lib";
import type Song from "$lib/types/song";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    try {
        const response = await fetch(`${API_URL}/songs`)
        const data = await response.json() as { songs: Song[] }
        return { songs: data.songs }
    } catch (e) {
        console.log(e)
    }

}