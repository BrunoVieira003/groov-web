<script lang="ts">
    import { currentVolume } from "$lib/stores/audioState";
    import volumeIcon from "$lib/assets/icons/volume.svg?raw"
    import muteIcon from "$lib/assets/icons/mute.svg?raw"

    
    const activeColor = "#e5e7eb";
    const inactiveColor = "#6a7282";
    
    let previousVolume = $state($currentVolume)
    let muted = $derived(() => $currentVolume === 0)
    let progress = $derived(() => ($currentVolume - 0) / (1 - 0) * 100)

    function toggleMute(){
        if(!muted()){
            previousVolume = $currentVolume
            currentVolume.set(0)
        }else{
            currentVolume.set(previousVolume !== 0 ? previousVolume : 1)
        }
    }
</script>

<div class="flex items-center gap-1">
    <button class="cursor-pointer *:size-7" onclick={toggleMute}>
        {#if muted()}
            {@html muteIcon}
        {:else}
            {@html volumeIcon}
        {/if}
    </button>

    <input
    type="range" bind:value={$currentVolume}
    class="volume-control"
    onchange={() => previousVolume = $currentVolume}
    min="0"
    max="1"
    step="0.01"
    style:--background="linear-gradient(90deg, {activeColor} {progress()}%, {inactiveColor} {progress()}%)"
    >
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