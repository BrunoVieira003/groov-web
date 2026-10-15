import { env } from "$env/dynamic/public";

export async function createPlaylist(formData: FormData){
    await fetch(`${env.PUBLIC_API_URL}/playlists`, {
        method: 'post',
        body: formData
    })
}

export async function updatePlaylistCover(playlistId: string, formData: FormData){
    await fetch(`${env.PUBLIC_API_URL}/playlists/${playlistId}/cover`, {
        method: 'PATCH',
        body: formData
    })
}