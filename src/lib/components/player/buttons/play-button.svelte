<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import pauseIcon from '$lib/assets/icons/pause.svg?raw'
    import playIcon from '$lib/assets/icons/play.svg?raw'

    interface PropsType extends HTMLButtonAttributes{
        paused: boolean,
    }

    let {paused, ...props}: PropsType = $props()

</script>

<button {...props} class="cursor-pointer">
    <div class="text-heading size-7">
    {#if paused}
        {@html playIcon}
    {:else}
        {@html pauseIcon}
    {/if}
    </div>
</button>