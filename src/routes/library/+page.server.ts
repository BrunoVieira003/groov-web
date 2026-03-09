import { PUBLIC_API_URL } from '$env/static/public';
import api from '$lib/plugins/api';
import type { Actions } from '@sveltejs/kit';

export const actions = {
    upload: async ({fetch, request}) => {
        const formData = await request.formData()

        const {data} = await api.post('/songs/upload', formData)

        return { taskId: data.taskId }
    },

    scan: async ({}) => {
        const { data } = await api.post('/tasks/scan-folder')
        return {taskId: data.taskId}
    }
} satisfies Actions