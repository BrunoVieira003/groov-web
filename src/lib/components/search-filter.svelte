<script lang="ts">
    import { goto } from "$app/navigation";
    import { FILTER_PARAM } from "$lib/filters/listFilter";
    import { page } from "$app/state";
    import searchIcon from "$lib/assets/icons/search.svg?raw";
    import { onDestroy, untrack } from "svelte";
    import { useDebounce } from "runed";

    interface Props {
        placeholder?: string;
        debounce?: number;
    }

    let { placeholder = "Filter...", debounce = 300 }: Props = $props();

    let value = $state(page.url.searchParams.get(FILTER_PARAM) ?? "");

    function apply() {
        const text = value.trim();
        const current = page.url.searchParams.get(FILTER_PARAM) ?? "";
        if (text === current) return;

        const url = new URL(page.url);
        if (text) url.searchParams.set(FILTER_PARAM, text);
        else url.searchParams.delete(FILTER_PARAM);

        goto(url, { replaceState: true, keepFocus: true, noScroll: true });
    }

    const debouncedApply = useDebounce(apply, () => debounce);

    $effect(() => {
        const fromUrl = page.url.searchParams.get(FILTER_PARAM) ?? "";
        untrack(() => {
            // compare trimmed so a trailing space being typed isn't wiped out
            if (!debouncedApply.pending && fromUrl !== value.trim()) value = fromUrl;
        });
    });

    function onInput() {
        debouncedApply().catch(() => {});
    }

    function applyNow() {
        debouncedApply.cancel();
        apply();
    }

    onDestroy(() => debouncedApply.cancel());
</script>

<form
    role="search"
    class="relative text-legend has-[.input:focus]:text-white w-full sm:w-72"
    onsubmit={(e) => {
        e.preventDefault();
        applyNow();
    }}
>
    <input
        type="text"
        bind:value
        oninput={onInput}
        {placeholder}
        aria-label={placeholder}
        class="input bg-surface py-1 text-md w-full pl-3 pr-9 rounded-md outline-none border border-border focus:bg-surface-active"
    />
    <div class="absolute top-1/2 -translate-y-1/2 opacity-70 right-2 pointer-events-none">
        {@html searchIcon}
    </div>
</form>
