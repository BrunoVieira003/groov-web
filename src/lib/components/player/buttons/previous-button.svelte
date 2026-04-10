<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import previousIcon from "$lib/assets/icons/previous.svg?raw";

    let enabled = $derived(() => {
        if (
            $songQueue.loopMode === "repeat-off" &&
            $songQueue.currentIndex === 0
        ) {
            return false;
        }

        return true;
    });
</script>

<button onclick={songQueue.previousTrack} class="data-[enabled=true]:cursor-pointer" data-enabled={enabled()}>
    <div class="text-heading size-5 data-[enabled=false]:opacity-20" data-enabled={enabled()}>
        {@html previousIcon}
    </div>
</button>
