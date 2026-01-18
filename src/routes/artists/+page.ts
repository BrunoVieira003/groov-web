import { PUBLIC_API_URL } from "$env/static/public";
import type Artist from "$lib/types/artist";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try{
        const response = await fetch(`${PUBLIC_API_URL}/artist`)
        const data = await response.json() as {artists: Artist[]}
        return {artists: data.artists}
    }catch(e){
        console.error(e)
    }
    
}