<script>
    import Cassete from "$lib/components/cassete.svelte";
    import { currentSong, currentTime, duration, paused } from "$lib/stores/player";

</script>
<div>
    <Cassete title={$currentSong?.title} spinning={!$paused} duration={$duration} currentTime={$currentTime}/>
</div>