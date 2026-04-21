<script lang="ts">
    import { env } from "$env/dynamic/public";
    import type { AlbumProps } from "./album-props";
    import emptyImage from "$lib/assets/images/empty.png";
    import Marquee from "../marquee.svelte";

    let { album }: AlbumProps = $props();

    let coverImage: HTMLImageElement;
</script>

<a
    class="space-y-4 hover:bg-neutral-medium p-4 rounded-md"
    href="/albums/{album.id}"
>
    <img
        bind:this={coverImage}
        src="{env.PUBLIC_API_URL}/albums/{album.id}/cover"
        alt="album_cover_art"
        class="aspect-square! self-center w-full rounded-xl object-cover"
        onerror={() => (coverImage.src = emptyImage)}
    />
    <div>
        <div class="flex">
            <Marquee>
                <p class="text-nowrap text-heading font-bold">{album.title}</p>
            </Marquee>
            <p>{album.year}</p>
        </div>
        {#if album.artist}
            <Marquee
                ><a
                    href="/artists/{album.artist.id}"
                    class="hover:underline text-sm text-subheading"
                    >{album.artist.name}</a
                ></Marquee
            >
        {/if}
    </div>
</a>
