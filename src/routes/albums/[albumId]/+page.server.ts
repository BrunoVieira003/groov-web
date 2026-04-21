import { env } from "$env/dynamic/private";
import type { Album } from "$lib/types/album";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await fetch(`${env.API_URL}/albums/${params.albumId}`)
        const data = await response.json() as Album
        return { album: data }
    } catch (e) {
        console.log(e)
    }
}