<script lang="ts">
    import Cassete from "$lib/components/cassete.svelte";
    import Marquee from "$lib/components/marquee.svelte";
    import { albumLayout, audioVisualizer } from "$lib/stores/settings";
    import emptyImage from "$lib/assets/images/empty.png";
    import TabSelect from "$lib/components/tab-select.svelte";
    import VisualizerBottomIcon from '$lib/assets/icons/visualizer-bottom.svg?raw'
    import VisualizerMiddleIcon from '$lib/assets/icons/visualizer-middle.svg?raw'
    import VisualizerTopIcon from '$lib/assets/icons/visualizer-top.svg?raw'
    import VisualizerDisabledIcon from '$lib/assets/icons/visualizer-disabled.svg?raw'
</script>

<h1
    class="page-title w-full text-center sm:text-start sm:w-11/12 md:w-8/12 sm:mx-auto text-highlight"
>
    Settings
</h1>
<div class="w-full sm:text-start sm:w-11/12 md:w-8/12 sm:mx-auto">
    
    <div class="space-y-4 p-4 border border-neutral-light rounded-lg">
        <h2 class="page-title text-2xl! text-heading">Layout options</h2>
        <p class="text-heading text-xl">Album layout</p>
        <p class="text-subheading text-sm mb-6">
            Changes the style that albums are displayed
        </p>

        <TabSelect options={[
            {label: 'Default', value: 'default'},
            {label: 'Cassete', value: 'cassete'},
        ]}
        bind:value={$albumLayout}
        />
        {#if $albumLayout === "default"}
            <div class="min-h-81">
                <div
                    class="space-y-4 hover:bg-neutral-medium p-4 rounded-md w-full sm:w-1/2 xl:w-1/4 mx-auto"
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
            <div class="min-h-81">
                <div class="w-full sm:w-1/2 xl:w-1/3 mx-auto py-4">
                    <Cassete title="Album title" />
                </div>
            </div>
        {/if}
    
    <hr class="mx-auto text-neutral-medium">

    <h2 class="text-xl">Audio visualizer</h2>
    <p class="text-subheading text-sm mb-6">Change audio visualizer appearance in full view player mode</p>
    <TabSelect options={[
        {label: 'Disabled', value: 'disabled'},
        {label: 'Bottom', value: 'bottom'},
        {label: 'Middle', value: 'middle'},
        {label: 'Top', value: 'top'},
    ]}
    bind:value={$audioVisualizer}
    />

    <div class="text-white max-w-60 mx-auto">
        {#if $audioVisualizer === 'bottom'}
            {@html VisualizerBottomIcon}
        {:else if $audioVisualizer === 'middle'}
            {@html VisualizerMiddleIcon}
        {:else if $audioVisualizer === 'top'}
            {@html VisualizerTopIcon}
        {:else}
            {@html VisualizerDisabledIcon}
        {/if}
    </div>

    </div>
</div>
