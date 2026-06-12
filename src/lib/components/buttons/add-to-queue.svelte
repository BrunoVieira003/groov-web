<script lang="ts">
    import { songQueue, type Collection } from "$lib/stores/queue";
    import playIcon from '$lib/assets/icons/full-mode.svg?raw'
    import type Song from "$lib/types/song";

    interface PropsType{
        tracks: Song[],
    }

    let { tracks }: PropsType = $props()

    function handleAddToQueue(){
        for(let t of tracks){
            songQueue.addToQueue(t)
        }
    }
</script>

<button
class="flex items-center w-fit not-sm:mx-auto not-sm:mt-6 gap-2 py-1.5 px-2 rounded-md sm:mb-6 text-heading cursor-pointer hover:bg-neutral-light"
onclick={handleAddToQueue}
>
    <div class="size-7">
        {@html playIcon}
    </div>
    Add to queue
</button>