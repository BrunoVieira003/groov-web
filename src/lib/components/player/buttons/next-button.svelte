<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import nextIcon from '$lib/assets/icons/next.svg'

</script>
<button onclick={songQueue.nextTrack}>
    <img 
    src={nextIcon}
    alt="next_track" 
    class="size-5 data-[enabled=false]:opacity-20" 
    data-enabled={$songQueue.currentIndex !== $songQueue.tracks.length - 1}
    >
</button>