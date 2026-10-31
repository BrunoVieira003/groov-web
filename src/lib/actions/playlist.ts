import { API_URL } from "$lib";

export async function createPlaylist(formData: FormData){
    await fetch(`${API_URL}/playlists`, {
        method: 'post',
        body: formData
    })
}

export async function updatePlaylistCover(playlistId: string, formData: FormData){
    await fetch(`${API_URL}/playlists/${playlistId}/cover`, {
        method: 'PATCH',
        body: formData
    })
}