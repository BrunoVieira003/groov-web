<script lang="ts">
    import { currentSong } from "$lib/stores/currentSong";
    import { queueState} from "$lib/stores/queueState";
    import type Song from "$lib/types/song";
    import PlayButton from "./play-button.svelte";

    interface PropsType{
        song: Song,
    }

    let { song }: PropsType = $props()

    let selected = $derived(() => $currentSong === song)

    function clickCallback(){
        if(selected()){
            queueState.togglePlay()
            return
        }

        currentSong.set(song)

    }
</script>

<div class="flex items-center justify-start gap-10 p-4 bg-gray-800 rounded-md data-[active=true]:bg-gray-500" data-active={selected()}>
    <PlayButton paused={!selected() || $queueState.paused} onclick={clickCallback}/>
    <p class="w-1/2 line-clamp-1">{song.title}</p>
    <div class="flex gap-1">
        {#each song?.authors as author}
            <a class="text-sm hover:underline not-last:after:content-[',']" href="/">{author.artist.name}</a>
        {/each}
    </div>
</div>