import { env } from '$env/dynamic/private';
import api from '$lib/plugins/api';
import type { Actions } from '@sveltejs/kit';

export const actions = {
    upload: async ({request, fetch}) => {
        const formData = await request.formData()

        const response = await fetch(`${env.API_URL}/tasks/prune-assets`, {
            method: 'post',
            body: JSON.stringify(formData)
        })
        const data = await response.json() as {taskId: string}
        return data
    },

    scan: async ({fetch}) => {
        const response = await fetch(`${env.API_URL}/tasks/prune-assets`, {method: 'post'})
        const data = await response.json() as {taskId: string}
        return data
    },

    pruneSongs: async ({fetch}) => {
        const response = await fetch(`${env.API_URL}/tasks/prune-assets`, {method: 'post'})
        const data = await response.json() as {taskId: string}
        return data
    },

    pruneAssets: async ({fetch}) => {
        const response = await fetch(`${env.API_URL}/tasks/prune-assets`, {method: 'post'})
        const data = await response.json() as {taskId: string}
        return data
    }
} satisfies Actions