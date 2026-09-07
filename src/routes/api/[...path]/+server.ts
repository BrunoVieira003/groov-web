import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";

async function proxy({ request, params, fetch }: Parameters<RequestHandler>[0]) {
    const url = new URL(request.url);

    const backendUrl = new URL(
        `/${params.path}`,
        env.API_URL
    );

    backendUrl.search = url.search;

    const headers = new Headers();

    for (const [key, value] of request.headers) {
        if (key.toLowerCase() !== 'host') {
            headers.set(key, value);
        }
    }

    console.log('content type', headers.get("Content-Type"))

    const response = await fetch(backendUrl, {
        method: request.method,
        headers: {
            ...headers,
            Range: request.headers.get("Range") ?? "",
            "Content-Type": "application/json"
        },
        body: ['GET', 'HEAD'].includes(request.method)
            ? undefined
            : request.body,
        // @ts-expect-error SvelteKit/undici typing
        duplex: 'half'
    });

    const responseHeaders = new Headers();

    for (const [key, value] of response.headers) {
        responseHeaders.set(key, value);
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
    });
}

export const GET = proxy;
export const HEAD = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;