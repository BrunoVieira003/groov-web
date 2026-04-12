<script lang="ts">
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import type Song from "$lib/types/song";
    import ArtistsLabel from "./artists-label.svelte";
    import PlayButton from "./player/buttons/play-button.svelte";
    import { getCollectionContext } from "$lib/contexts/collection-context";
    import { fly } from "svelte/transition";
    import Marquee from "./marquee.svelte";
    import { targetedSong, targetedTrackNumber } from "$lib/stores/songAction";

    interface PropsType {
        song: Song
        trackNumber: number
        oncontextmenu: (e: MouseEvent) => void
    }

    let { song, trackNumber, oncontextmenu }: PropsType = $props();

    let selected = $derived($currentSong?.id === song.id && trackNumber === $songQueue.currentIndex);

    let collectionContext = getCollectionContext();

    function playItem() {
        if (selected) {
            songQueue.togglePlay();
            return;
        }

        const songIndex = collectionContext.tracks.findIndex(s => s.id === song.id)
        songQueue.playQueue(collectionContext.tracks, songIndex, collectionContext.collectionType, collectionContext.collectionName, collectionContext.collectionId || '')
    }

    function onContext(e: MouseEvent){
        targetedSong.set(song)
        targetedTrackNumber.set(trackNumber)
        oncontextmenu(e)
    }
</script>

<div
    class="grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 bg-neutral-dark rounded-md text-subheading hover:bg-neutral-medium data-[active=true]:bg-neutral-lighter data-[active=true]:text-heading"
    data-active={selected}
    oncontextmenu={onContext}
    role="button"
    tabindex="-1"
    transition:fly={{ duration: 100 }}
>
    <p class="hidden md:block text-center">{trackNumber !== undefined ? trackNumber+1 : ''}</p>

    <div class="flex items-center gap-4">
        <PlayButton
            paused={!selected || $songQueue.paused}
            onclick={playItem}
        />
        <div class="flex flex-col w-full overflow-hidden">
            <Marquee>
                <p class="font-bold text-md text-heading">{song.title}</p>
            </Marquee>
            <ArtistsLabel artists={song.authors} size='small'/>
        </div>
    </div>
    {#if song.album}
        <a
            href="/albums/{song.album.id}"
            class="hidden md:block hover:underline">{song.album.title}</a
        >
    {/if}
</div>