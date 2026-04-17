<script lang="ts">
    import { songQueue, type Collection } from "$lib/stores/queue";
    import playIcon from '$lib/assets/icons/play.svg?raw'
    import type Song from "$lib/types/song";

    interface PropsType{
        tracks: Song[],
        collection?: Collection
    }

    let { tracks, collection }: PropsType = $props()

    function handlePlayAll(){
        songQueue.playQueue(tracks, 0, collection)
    }
</script>

<button
class="flex items-center w-fit not-sm:mx-auto not-sm:mt-6 gap-2 py-1 px-2 rounded-md sm:mb-6 text-heading cursor-pointer hover:bg-neutral-light"
onclick={handlePlayAll}
>
    <div class="size-8">
        {@html playIcon}
    </div>
    Play all
</button>