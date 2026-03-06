import { PUBLIC_API_URL } from "$env/static/public"
import { playlistList } from "$lib/stores/playlistList"
import type { PlaylistSummary } from "$lib/types/playlist"
import type { PageServerLoad } from "./library/$types"

export const load: PageServerLoad = async () => {
    try{
        const response = await fetch(`${PUBLIC_API_URL}/playlists`,)
        const data = await response.json() as {playlists: PlaylistSummary[]}
        
        playlistList.set({items: data.playlists})
    }catch(e){
        console.log(e)
    }

}