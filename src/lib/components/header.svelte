<script lang="ts">
    import { page } from "$app/state";
    import searchIcon from "$lib/assets/icons/search.svg?raw"
    import { onClickOutside } from "runed";

    let searchText = $state(page.url.searchParams.get('q'))

    
    // svelte-ignore non_reactive_update
    let sideMenu = $state<HTMLElement>()

        let sidemenuActive = $state(false)
        onClickOutside(() => sideMenu, () => sidemenuActive = false)

</script>

<div class="flex items-center justify-between lg:gap-20 h-1/12 bg-gray-800 py-3 px-2 lg:px-40">
    <div class="flex items-center gap-1 sm:gap-4 lg:gap-8">
        <h1 class="hidden sm:block text-2xl font-medium">Groov</h1>
        <div class="flex sm:gap-4 lg:gap-8 items-center justify-between text-sm *:p-2 *:rounded-lg *:hover:bg-slate-700">
            <a href="/">Home</a>
            <a href="/artists">Artists</a>
            <a href="/playlists">Playlists</a>
            <a href="/library">Library</a>
        </div>
    </div>
    <form action="/search" method="get" class="relative">
        <input
        type="text"
        name="q"
        bind:value={searchText}
        id="q"
        placeholder="Search..."
        class="bg-slate-900 py-2 w-full px-3 rounded-md text-slate-600 outline-none border-2 border-slate-600 focus:text-white focus:border-slate-400"
        >
        <dir class="absolute top-1/2 -translate-y-1/2 opacity-70 right-2 text-slate-600">
            {@html searchIcon}
        </dir>
    </form>
</div>