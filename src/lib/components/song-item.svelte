<script lang="ts">
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import type Song from "$lib/types/song";
    import ArtistsLabel from "./artists-label.svelte";
    import PlayButton from "./play-button.svelte";

    interface PropsType{
        song: Song
        onPlayClick: (songId?: string) => void
    }

    let { song, onPlayClick }: PropsType = $props()

    let selected = $derived(() => $currentSong?.id === song.id)

    function clickCallback(){
        if(selected()){
            songQueue.togglePlay()
            return
        }

        onPlayClick(song.id)
        

    }
</script>

<div class="flex items-center justify-start gap-10 p-4 rounded-md hover:bg-gray-900 data-[active=true]:bg-gray-800" data-active={selected()}>
    <PlayButton paused={!selected() || $songQueue.paused} onclick={clickCallback}/>
    <p class="w-1/2 line-clamp-1">{song.title}</p>
    <ArtistsLabel artists={song.authors}/>
</div>