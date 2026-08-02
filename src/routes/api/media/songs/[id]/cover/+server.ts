import { env } from '$env/dynamic/private';

export async function GET({ params, fetch, request }) {
    const response = await fetch(`${env.API_URL}/songs/${params.id}/cover`, {
        headers: {
            Range: request.headers.get("Range") ?? ""
        }
    });

    return new Response(response.body, {
        status: response.status,
        headers: response.headers
    });
}