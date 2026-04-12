<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import playIcon from '$lib/assets/icons/play.svg?raw'
    import type Song from "$lib/types/song";
    import type { CollectionType } from "$lib/contexts/collection-context";

    interface PropsType{
        tracks: Song[],
        collectionType?: CollectionType
        collectionName?: string
        collectionId?: string
    }

    let { tracks, collectionType, collectionName, collectionId }: PropsType = $props()

    function handlePlayAll(){
        songQueue.playQueue(tracks, 0, collectionType, collectionName, collectionId)
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