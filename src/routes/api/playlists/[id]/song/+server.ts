import { env } from "$env/dynamic/private";

export async function POST({ params, fetch, request }) {
    const response = await fetch(`${env.API_URL}/playlists/${params.id}/song`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: request.body,
        duplex: 'half'
    });

    return new Response(null, {
        status: response.status,
        headers: response.headers
    });
}

export async function DELETE({ params, fetch, request }) {
    const response = await fetch(`${env.API_URL}/playlists/${params.id}/song`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: request.body,
        duplex: "half"
    });

    return new Response(response.body, {
        status: response.status,
        headers: response.headers
    });
}