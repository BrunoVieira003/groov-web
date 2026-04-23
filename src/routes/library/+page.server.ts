import { env } from '$env/dynamic/private';
import api from '$lib/plugins/api';
import type { Actions } from '@sveltejs/kit';

export const actions = {
    upload: async ({request, fetch}) => {
        try{

            const formData = await request.formData()
    
            const response = await fetch(`${env.API_URL}/songs/upload`, {
                method: 'post',
                body: formData
            })
            const data = await response.json() as {taskId: string}
            return data
        }catch(e){
            console.log(e)
        }
    },

    scan: async ({fetch}) => {
        const response = await fetch(`${env.API_URL}/tasks/scan-folder`, {method: 'post'})
        const data = await response.json() as {taskId: string}
        return data
    },

    pruneSongs: async ({fetch}) => {
        const response = await fetch(`${env.API_URL}/tasks/prune-songs`, {method: 'post'})
        const data = await response.json() as {taskId: string}
        return data
    },

    pruneAssets: async ({fetch}) => {
        const response = await fetch(`${env.API_URL}/tasks/prune-assets`, {method: 'post'})
        const data = await response.json() as {taskId: string}
        return data
    }
} satisfies Actions