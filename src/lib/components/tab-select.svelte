<script lang="ts" generics="ItemValue">
    import type { getContext, Snippet } from "svelte";

    interface Props{
        options: {label: string, value: ItemValue}[],
        value: ItemValue
    }

    let { options, value = $bindable() }: Props = $props()
</script>

<div class="flex justify-stretch flex-wrap w-full border-2 border-neutral-medium rounded-md">
    {#each options as option}
        <button
        class="flex-1 p-2 first:rounded-l-sm last:rounded-r-sm data-[active=true]:bg-neutral-lighter hover:bg-neutral-light hover:cursor-pointer"
        data-active={value === option.value}
        onclick={() => value = option.value}
        >
            {option.label}
        </button>
    {/each}
</div>