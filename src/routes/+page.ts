import { PUBLIC_API_URL } from "$env/static/public";
import type Song from "$lib/types/song";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
    try{
        const response = await fetch(`${PUBLIC_API_URL}/songs`)
        const data = await response.json() as {songs: Song[] }
        console.log(data)
        return {songs: data.songs}
    }catch(e){
        console.log(e)
    }

}