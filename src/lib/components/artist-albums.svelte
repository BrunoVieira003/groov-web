<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { Album } from "$lib/types/album";
    import emptyImage from '$lib/assets/images/empty.png'

    interface PropsType{
        albums: Album[]
    }

    let { albums }: PropsType = $props()

    let coverImage: HTMLImageElement
</script>

<div class="grid grid-cols-6">
    {#each albums as album (album.id)}
        <div class="flex flex-col justify-center gap-4 p-4">
            <img
            bind:this={coverImage}
            src="{PUBLIC_API_URL}/albums/{album?.id}/cover"
            alt="album_cover_art"
            class="aspect-square! self-center size-60 rounded-xl object-cover"
            onerror={() => coverImage.src = emptyImage}
            >
            <a href="/albums/{album.id}" class="hover:underline text-nowrap text-md w-fit mx-auto font-bold">{album.title}</a>
            <p class="text-sm">{album.year}</p>
        </div>
    {/each}
</div>