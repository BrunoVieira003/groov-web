import { env } from '$env/dynamic/private';

export async function DELETE({ params, fetch, request }) {
    const response = await fetch(`${env.API_URL}/playlists/${params.id}`, {
        headers: {
            Range: request.headers.get("Range") ?? ""
        },
        method: 'DELETE'
    });

    return new Response(response.body, {
        status: response.status,
        headers: response.headers
    });
}