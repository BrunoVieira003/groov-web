<script lang="ts">
    interface Props{
        active?: boolean
    }

    let {active = $bindable(false)}: Props = $props()
</script>

<button class="py-1 px-3 outline outline-slate-800 w-fit text-sm rounded-lg cursor-pointer" class:active={active} onclick={() => active = !active}>
    <slot/>
</button>

<style>
    .active{
        background-color: #1d293d;
    }
</style>