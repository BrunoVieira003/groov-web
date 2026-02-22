import { PUBLIC_API_URL } from '$env/static/public';
import toast from 'svelte-hot-french-toast';
import type { Actions } from './$types';

export const actions = {
    default: async (event) => {
        const {fetch, request}  = event
        const formData = await request.formData()

        const response = await fetch(`${PUBLIC_API_URL}/songs/upload`, {
            method: 'post',
            body: formData
        })

        return {success: response.ok}
    }
} satisfies Actions