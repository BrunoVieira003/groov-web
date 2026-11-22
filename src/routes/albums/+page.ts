import { API_URL } from "$lib";
import { filterQuery } from "$lib/filters/listFilter";
import type { Album } from "$lib/types/album";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {
    try {
        const response = await fetch(`${API_URL}/albums${filterQuery(url, "title")}`)
        const data = await response.json() as { albums: Album[] }
        return data
    } catch (e) {
        console.log(e)
    }
}