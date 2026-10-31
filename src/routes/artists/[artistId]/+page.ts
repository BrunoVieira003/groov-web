import { API_URL } from "$lib";
import type Artist from "$lib/types/artist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const response = await fetch(`${API_URL}/artists/${params.artistId}`)
        const data = await response.json() as Artist
        return { artist: data }
    } catch (e) {
        console.log(e)
    }
}