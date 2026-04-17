<script lang="ts">
    import volumeIcon from "$lib/assets/icons/volume.svg?raw";
    import muteIcon from "$lib/assets/icons/mute.svg?raw";
    import { volume } from "$lib/stores/player";

    let previousVolume = $state($volume);
    let muted = $derived($volume === 0);
    let progress = $derived((($volume - 0) / (1 - 0)) * 100);

    function toggleMute() {
        if (!muted) {
            previousVolume = $volume;
            volume.set(0);
        } else {
            volume.set(previousVolume !== 0 ? previousVolume : 1);
        }
    }
</script>

<div class="flex items-center gap-1">
    <button class="cursor-pointer *:size-7" onclick={toggleMute}>
        {#if muted}
            {@html muteIcon}
        {:else}
            {@html volumeIcon}
        {/if}
    </button>

    <input
        type="range"
        bind:value={$volume}
        class="volume-control bg-linear-to-l from-neutral-medium to-heading from-0% to-10%"
        onchange={() => (previousVolume = $volume)}
        min="0"
        max="1"
        step="0.01"
        style:--background="linear-gradient(90deg, var(--color-heading) {progress}%,
        var(--color-neutral-lighter) {progress}%)"
    />
</div>

<style>
    .volume-control {
        appearance: none;
        width: 100%;
        height: 0.5rem;
        border-radius: 9999px;
        background: var(--background);
        cursor: pointer;
    }

    /* Thumb: for Chrome, Safari, Edge */
    .volume-control::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background: #ffffff;
        box-shadow: none;
    }

    /* Thumb: for Firefox */
    .volume-control::-moz-range-thumb {
        border: none;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background: #ffffff;
        box-shadow: none;
    }
</style>
