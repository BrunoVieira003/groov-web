<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import previousIcon from '$lib/assets/icons/previous.svg'

</script>

<button onclick={songQueue.previousTrack}>
    <img 
    src={previousIcon} 
    alt="previous_track" 
    class="size-5 data-[enabled=false]:opacity-20" 
    data-enabled={$songQueue.currentIndex !== 0}
    >
</button>