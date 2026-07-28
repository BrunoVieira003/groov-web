<script lang="ts">
    import { page } from "$app/state";
    import searchIcon from "$lib/assets/icons/search.svg?raw"
    import { onClickOutside } from "runed";
    import { fly } from "svelte/transition";
    import artistIcon from  "$lib/assets/icons/artist.svg?raw"
    import albumIcon from  "$lib/assets/icons/album.svg?raw"
    import playlistIcon from  "$lib/assets/icons/playlist.svg?raw"
    import libraryIcon from  "$lib/assets/icons/library.svg?raw"
    import settingsIcon from  "$lib/assets/icons/settings.svg?raw"
    import homeIcon from  "$lib/assets/icons/home.svg?raw"

    let searchText = $state(page.url.searchParams.get('q'))

    
    // svelte-ignore non_reactive_update
    let sideMenu = $state<HTMLElement>()

        let sidemenuActive = $state(false)
        onClickOutside(() => sideMenu, () => sidemenuActive = false)

</script>

<div class="flex not-sm:flex-col justify-between lg:gap-20 pb-2 sm:py-3 px-2 lg:px-30 bg-neutral-dark z-10" transition:fly={{ duration: 200, y: -100 }}>
    <div class="flex items-center w-full justify-between gap-1 sm:gap-4 lg:gap-8">
        <h1 class="hidden sm:block text-2xl font-medium text-subheading">Groov</h1>
        <div class="flex w-full mx-auto items-center not-sm:justify-between text-sm text-subheading *:hover:text-heading *:p-2 *:rounded-lg">
            <a href="/" class="flex justify-between items-center gap-1">
                <div class="size-6">{@html homeIcon}</div>
                Home
            </a>
            <a href="/artists" class="flex justify-between items-center gap-1">
                <div class="size-6">{@html artistIcon}</div>
                Artists
            </a>
            <a href="/albums" class="flex justify-between items-center gap-1">
                <div class="size-6">{@html albumIcon}</div>
                Albums
            </a>
            <a href="/playlists" class="flex justify-between items-center gap-1">
                <div class="size-6">{@html playlistIcon}</div>
                Playlists
            </a>
            <a href="/library" class="flex justify-between items-center gap-1">
                <div class="size-6">{@html libraryIcon}</div>
                Library
            </a>
            <a href="/settings" class="flex justify-between items-center gap-1">
                <div class="size-6">{@html settingsIcon}</div>
                Settings
            </a>
        </div>
    </div>
    <form action="/search" method="get" class="relative text-legend has-[.input:focus]:text-white w-full not-sm:w-11/12 not-sm:mx-auto">
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