import { API_URL } from "$lib";
import type { Album } from "$lib/types/album";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const response = await fetch(`${API_URL}/albums/${params.albumId}`)
        const data = await response.json() as Album
        return { album: data }
    } catch (e) {
        console.log(e)
    }
}