import { PUBLIC_API_URL } from "$env/static/public";
import type Artist from "$lib/types/artist";
import type Song from "$lib/types/song";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch, url}) => {
    const query = url.searchParams.get('q')
    try{
        const response = await fetch(`${PUBLIC_API_URL}/search?q=${query}`,)
        const data = await response.json() as {songs: Song[], artists: Artist[]}
        return {songs: data.songs, artists: data.artists}
    }catch(e){
        console.log(e)
    }

}