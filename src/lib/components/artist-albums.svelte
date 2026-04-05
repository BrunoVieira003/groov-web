<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { Album } from "$lib/types/album";
    import emptyImage from '$lib/assets/images/empty.png'
    import Marquee from "./marquee.svelte";

    interface PropsType{
        albums: Album[]
    }

    let { albums }: PropsType = $props()

    // svelte-ignore non_reactive_update
        let coverImage: HTMLImageElement
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {#each albums as album (album.id)}
        <div class="flex flex-col justify-center gap-4 p-4">
            <img
            bind:this={coverImage}
            src="{PUBLIC_API_URL}/albums/{album.id}/cover"
            alt="album_cover_art"
            class="aspect-square! self-center rounded-xl object-cover"
            onerror={() => coverImage.src = emptyImage }
            >
            <Marquee>
                <a href="/albums/{album.id}" class="hover:underline text-nowrap text-md w-fit mx-auto font-bold">{album.title}</a>
            </Marquee>
            <p class="text-sm">{album.year}</p>
        </div>
    {/each}
</div>