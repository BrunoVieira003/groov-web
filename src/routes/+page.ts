import { PUBLIC_API_URL } from "$env/static/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
    try{
        const response = await fetch(`${PUBLIC_API_URL}/song`)
        const data = await response.json() as {songs: any[] }
        return {songs: data.songs}
    }catch(e){
        console.log(e)
    }

}