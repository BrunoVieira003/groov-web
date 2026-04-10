<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import nextIcon from "$lib/assets/icons/next.svg?raw";

    let enabled = $derived(() => {
        if (
            $songQueue.loopMode === "repeat-off" &&
            $songQueue.currentIndex === $songQueue.tracks.length - 1
        ) {
            return false;
        }

        return true;
    });
</script>

<button onclick={songQueue.nextTrack} class="data-[enabled=true]:cursor-pointer" data-enabled={enabled()}>
    <div class="text-heading size-5 data-[enabled=false]:opacity-20" data-enabled={enabled()}>
        {@html nextIcon}
    </div>
</button>
