<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { PageProps } from "./$types";
    import emptyImage from '$lib/assets/images/empty.png'
    import Marquee from "$lib/components/marquee.svelte";
    import { goto } from "$app/navigation";

    let { data }: PageProps = $props()

    // svelte-ignore non_reactive_update
    let coverImage: HTMLImageElement
</script>


<h1 class="page-title w-fit not-sm:mx-auto">Albums</h1>
<h2 class="w-fit not-sm:mx-auto">{data.albums?.length} albums</h2>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
    {#each data.albums as album}
        <a class="space-y-4 hover:bg-neutral-medium p-4 rounded-md" href="/albums/{album.id}">
            <img
            bind:this={coverImage}
            src="{PUBLIC_API_URL}/albums/{album?.id}/cover"
            alt="album_cover_art"
            class="aspect-square! self-center w-full rounded-xl object-cover"
            onerror={() => coverImage.src = emptyImage}
            >
            <div>
                <div class="flex">
                    <Marquee>
                        <p class="text-nowrap text-heading font-bold">{album.title}</p>
                    </Marquee>
                    <p>{album.year}</p>
                </div>
                <Marquee><a href="/artists/{album.artist.id}" class="hover:underline text-sm text-subheading">{album.artist.name}</a></Marquee>
            </div>
        </a>
    {/each}
</div>