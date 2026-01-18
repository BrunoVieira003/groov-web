import { PUBLIC_API_URL } from "$env/static/public";
import type Artist from "$lib/types/artist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({params}) => {
    try{
        const response = await fetch(`${PUBLIC_API_URL}/artist/${params.artistId}`)
        const data = await response.json() as {artist: Artist }
        return {artist: data.artist}
    }catch(e){
        console.log(e)
    }
}