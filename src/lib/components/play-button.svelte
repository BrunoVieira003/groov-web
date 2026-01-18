<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import pauseIcon from '$lib/assets/icons/pause.svg'
    import playIcon from '$lib/assets/icons/play.svg'

    interface PropsType extends HTMLButtonAttributes{
        paused: boolean,
        
    }

    let props: PropsType = $props()

</script>

<style>
</style>

<button {...props} class='text-white'>
    {#if props.paused}
        <img src={playIcon} alt="play_icon" class='size-7'/>
    {:else}
        <img src={pauseIcon} alt="play_icon" class='size-7 '/>
    {/if}
</button>