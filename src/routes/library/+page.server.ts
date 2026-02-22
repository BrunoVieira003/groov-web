import { PUBLIC_API_URL } from '$env/static/public';
import type { Actions } from '@sveltejs/kit';

export const actions = {
    upload: async ({fetch, request}) => {
        const formData = await request.formData()

        const response = await fetch(`${PUBLIC_API_URL}/songs/upload`, {
            method: 'post',
            body: formData
        })

        return { success: response.ok }
    },

    scan: async ({fetch}) => {
        await fetch(`${PUBLIC_API_URL}/tasks/scan-folder`, {method: 'POST'})
        return
    }
} satisfies Actions