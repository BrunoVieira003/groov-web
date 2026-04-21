<script lang="ts">
    import { env } from "$env/dynamic/private";
    import Cassete from "$lib/components/cassete.svelte";
    import Marquee from "$lib/components/marquee.svelte";
    import { albumLayout } from "$lib/stores/settings";
    import emptyImage from "$lib/assets/images/empty.png";
</script>

<h1
    class="page-title w-full text-center sm:text-start sm:w-11/12 md:w-8/12 sm:mx-auto text-highlight"
>
    Settings
</h1>
<div class="w-full sm:text-start sm:w-11/12 md:w-8/12 sm:mx-auto">
    <h2 class="page-title text-2xl! text-heading">Layout options</h2>

    <div class="space-y-4 p-4 border border-neutral-light rounded-lg">
        <p class="text-heading">Album layout</p>
        <p class="text-subheading text-sm mb-6">
            Changes the style that albums are displayed
        </p>
        <select
            bind:value={$albumLayout}
            class="p-2 outline-none border-none bg-neutral-medium text-heading"
        >
            <option value="default">Default</option>
            <option value="cassete">Cassete</option>
        </select>
        {#if $albumLayout === "default"}
            <div class="py-4">
                <div
                    class="space-y-4 hover:bg-neutral-medium p-4 rounded-md w-1/4 mx-auto"
                >
                    <img
                        src={emptyImage}
                        alt="album_cover_art"
                        class="aspect-square! self-center w-full rounded-xl object-cover"
                    />
                    <div>
                        <div class="flex">
                            <Marquee>
                                <p class="text-nowrap text-heading font-bold">
                                    Album title
                                </p>
                            </Marquee>
                            <p>{new Date().getFullYear()}</p>
                        </div>
                        <Marquee
                            ><p class="hover:underline text-sm text-subheading">
                                Album artist
                            </p></Marquee
                        >
                    </div>
                </div>
            </div>
        {:else}
            <div class="py-4">
                <div class="w-1/3 mx-auto">
                    <Cassete title="Album title" />
                </div>
            </div>
        {/if}
    </div>
</div>
