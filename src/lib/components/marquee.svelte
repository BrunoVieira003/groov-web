<script lang="ts">
    import type { Snippet } from "svelte";

    interface PropsType {
        children: Snippet;
    }
    let { children }: PropsType = $props();

    let containerWidth = $state(0);
    let contentWidth = $state(0);

    let isOverflowing = $derived(contentWidth > containerWidth);
</script>

<div
    class="marquee-container w-full"
    bind:clientWidth={containerWidth}
>
    <div
        class="w-fit"
        class:marquee-text={isOverflowing}
        bind:clientWidth={contentWidth}
    >
        {@render children()}
    </div>
</div>

<style>
    .marquee-container {
        overflow: hidden;
        white-space: nowrap;
    }

    .marquee-container:hover .marquee-text {
        animation: marquee 15s linear infinite;
    }

    @keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
    }
</style>
