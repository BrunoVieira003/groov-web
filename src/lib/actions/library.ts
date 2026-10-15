import { env } from "$env/dynamic/public"

export async function upload (formData: FormData){
    const response = await fetch(`${env.PUBLIC_API_URL}/songs/upload`, {
        method: 'post',
        body: formData
    })
    const data = await response.json() as {taskId: string}
    return data
}

export async function scan(){
    const response = await fetch(`${env.PUBLIC_API_URL}/tasks/scan-folder`, {method: 'post'})
    const data = await response.json() as {taskId: string}
    return data
}

export async function pruneSongs(){
    const response = await fetch(`${env.PUBLIC_API_URL}/tasks/prune-songs`, {method: 'post'})
    const data = await response.json() as {taskId: string}
    return data
}

export async function pruneArtists(){
    const response = await fetch(`${env.PUBLIC_API_URL}/tasks/prune-artists`, {method: 'post'})
    const data = await response.json() as {taskId: string}
    return data
}

export async function pruneAlbums(){
    const response = await fetch(`${env.PUBLIC_API_URL}/tasks/prune-albums`, {method: 'post'})
    const data = await response.json() as {taskId: string}
    return data
}

export async function pruneAssets(){
    const response = await fetch(`${env.PUBLIC_API_URL}/tasks/prune-assets`, {method: 'post'})
    const data = await response.json() as {taskId: string}
    return data
}