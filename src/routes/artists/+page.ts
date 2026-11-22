import { API_URL } from "$lib";
import { filterQuery } from "$lib/filters/listFilter";
import type Artist from "$lib/types/artist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {
    try {
        const response = await fetch(`${API_URL}/artists${filterQuery(url, "name")}`)
        const data = await response.json() as { artists: Artist[] }
        return { artists: data.artists }
    } catch (e) {
        console.error(e)
    }

}