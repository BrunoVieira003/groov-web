import { env } from "$env/dynamic/public";
import type { Album } from "$lib/types/album";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/albums`)
        const data = await response.json() as { albums: Album[] }
        return data
    } catch (e) {
        console.log(e)
    }
}