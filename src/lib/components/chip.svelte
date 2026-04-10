<script lang="ts">
    interface Props{
        active?: boolean
    }

    let {active = $bindable(false)}: Props = $props()
</script>

<button class="py-1 px-3 text-legend bg-neutral-medium opacity-90 w-fit text-sm rounded-lg cursor-pointer" class:active={active} onclick={() => active = !active}>
    <slot/>
</button>

<style>
    .active{
        background-color: var(--color-neutral-light);
        color: var(--color-heading);
        opacity: 100%;
    }
</style>