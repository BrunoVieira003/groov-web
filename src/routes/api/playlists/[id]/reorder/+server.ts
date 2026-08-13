import { env } from "$env/dynamic/private";

export async function PATCH({ params, fetch, request }) {
    const response = await fetch(`${env.API_URL}/playlists/${params.id}/reorder`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: request.body,
        duplex: 'half'
    });

    return new Response(response.body, {
        status: response.status,
        headers: response.headers
    });
}