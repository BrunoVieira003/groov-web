import api from '$lib/plugins/api';
import type { Actions } from '@sveltejs/kit';

export const actions = {
    upload: async ({request}) => {
        const formData = await request.formData()

        const {data} = await api.post('/songs/upload', formData)

        return { taskId: data.taskId }
    },

    scan: async () => {
        const { data } = await api.post('/tasks/scan-folder')
        return {taskId: data.taskId}
    },

    pruneSongs: async () => {
        const {data} = await api.post('/tasks/prune-songs')
        return {taskId: data.taskId}
    },

    pruneAssets: async () => {
        const {data} = await api.post('/tasks/prune-assets')
        return {taskId: data.taskId}
    }
} satisfies Actions