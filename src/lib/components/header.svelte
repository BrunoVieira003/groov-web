<script lang="ts">
    import { page } from "$app/state";
    import searchIcon from "$lib/assets/icons/search.svg?raw"
    import { onClickOutside } from "runed";
    import { fly } from "svelte/transition";

    let searchText = $state(page.url.searchParams.get('q'))

    
    // svelte-ignore non_reactive_update
    let sideMenu = $state<HTMLElement>()

        let sidemenuActive = $state(false)
        onClickOutside(() => sideMenu, () => sidemenuActive = false)

</script>

<div class="flex items-center justify-between lg:gap-20 h-1/12 py-3 px-2 lg:px-30" transition:fly={{ duration: 200, y: -100 }}>
    <div class="flex items-center gap-1 sm:gap-4 lg:gap-8">
        <h1 class="hidden sm:block text-2xl font-medium">Groov</h1>
        <div class="flex sm:gap-4 lg:gap-8 items-center justify-between text-sm *:p-2 *:rounded-lg *:hover:bg-neutral-light">
            <a href="/">Home</a>
            <a href="/artists">Artists</a>
            <a href="/playlists">Playlists</a>
            <a href="/library">Library</a>
        </div>
    </div>
    <form action="/search" method="get" class="relative text-legend has-[.input:focus]:text-white">
        <input
        type="text"
        name="q"
        bind:value={searchText}
        id="q"
        placeholder="Search..."
        class="input bg-neutral-medium py-2 w-full px-3 rounded-md outline-none border-2 border-transparent focus:border-neutral-lighter"
        >
        <dir class="absolute top-1/2 -translate-y-1/2 opacity-70 right-2">
            {@html searchIcon}
        </dir>
    </form>
</div>