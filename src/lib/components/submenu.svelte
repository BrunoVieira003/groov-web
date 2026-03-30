<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";

    interface PropsType{
        children: Snippet
        label: string
        labelClass?: ClassValue
    }

    let {children, label, labelClass}: PropsType = $props()

    let active = $state(false)
</script>


<button class="relative" onmouseenter={() => active = true} onmouseleave={() => active = false}>
    <p class={labelClass}>{label}</p>
    {#if active}
        <div class="absolute align-middle right-0 top-0 translate-x-full">
            {@render children()}
        </div>
    {/if}
</button>