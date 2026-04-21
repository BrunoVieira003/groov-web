import { env } from "$env/dynamic/private";
import type Artist from "$lib/types/artist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try {
        const response = await fetch(`${env.API_URL}/artist`)
        const data = await response.json() as { artists: Artist[] }
        return { artists: data.artists }
    } catch (e) {
        console.error(e)
    }

}