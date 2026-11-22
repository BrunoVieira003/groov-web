<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props{
        title: string
        subtitle?: string
        children?: Snippet
    }

    let {title, subtitle, children}: Props = $props()
</script>

<div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
        <h1 class="text-5xl w-fit text-heading not-sm:mx-auto mb-2">{title}</h1>
        <h2 class="text-subheading">{subtitle}</h2>
    </div>
    {#if children}
        {@render children()}
    {/if}
</div>
