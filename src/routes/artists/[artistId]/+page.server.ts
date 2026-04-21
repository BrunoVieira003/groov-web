import { env } from "$env/dynamic/private";
import type Artist from "$lib/types/artist";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await fetch(`${env.API_URL}/artist/${params.artistId}`)
        const data = await response.json() as Artist
        return { artist: data }
    } catch (e) {
        console.log(e)
    }
}