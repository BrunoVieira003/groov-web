import { env } from "$env/dynamic/private";
import type { Album } from "$lib/types/album";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await fetch(`${env.API_URL}/albums`)
        const data = await response.json() as { albums: Album[] }
        return data
    } catch (e) {
        console.log(e)
    }
}