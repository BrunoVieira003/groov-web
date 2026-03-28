<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import pauseIcon from '$lib/assets/icons/pause.svg?raw'
    import playIcon from '$lib/assets/icons/play.svg?raw'

    interface PropsType extends HTMLButtonAttributes{
        paused: boolean,
    }

    let props: PropsType = $props()

</script>

<button {...props}>
    <div class="text-white size-7">
    {#if props.paused}
        {@html playIcon}
    {:else}
        {@html pauseIcon}
    {/if}
    </div>
</button>