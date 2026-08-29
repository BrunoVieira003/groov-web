<script lang="ts">
    import searchIcon from "$lib/assets/icons/search.svg?raw"
    import artistIcon from  "$lib/assets/icons/artist.svg?raw"
    import albumIcon from  "$lib/assets/icons/album.svg?raw"
    import playlistIcon from  "$lib/assets/icons/playlist.svg?raw"
    import settingsIcon from  "$lib/assets/icons/settings.svg?raw"
    import logo from "$lib/assets/icons/logo.svg?raw"
    import { page } from "$app/state";
    import { onClickOutside } from "runed";

    let searchText = $state(page.url.searchParams.get('q'))

    
    // svelte-ignore non_reactive_update
    let sideMenu = $state<HTMLElement>()

        let sidemenuActive = $state(false)
        onClickOutside(() => sideMenu, () => sidemenuActive = false)
</script>

<div class="flex items-start justify-between gap-1 sm:gap-4 lg:gap-8 border-r-2 border-border p-2">
    <div class="text-md text-subheading *:hover:text-heading *:p-3 *:rounded-lg">
        <a href="/" class="flex justify-start gap-2 items-center">
            <div class="size-10">{@html logo}</div>
            <p class="text-xl text-[#a21894] font-semibold">Groov</p>
        </a>
        <form action="/search" method="get" class="relative text-legend has-[.input:focus]:text-white w-full not-sm:w-11/12 not-sm:mx-auto">
            <input
            type="text"
            name="q"
            bind:value={searchText}
            id="q"
            placeholder="Search..."
            class="input bg-surface py-2 w-full px-3 rounded-md outline-none border-2 border-transparent focus:bg-surface-active"
            >
            <dir class="absolute top-1/2 -translate-y-1/2 opacity-70 right-4">
                {@html searchIcon}
            </dir>
        </form>
        <a href="/artists" class="flex items-center gap-2">
            <div class="size-6">{@html artistIcon}</div>
            Artists
        </a>
        <a href="/albums" class="flex items-center gap-2">
            <div class="size-6">{@html albumIcon}</div>
            Albums
        </a>
        <a href="/playlists" class="flex items-center gap-2">
            <div class="size-6">{@html playlistIcon}</div>
            Playlists
        </a>
        <a href="/settings/appearance" class="flex items-center gap-2">
            <div class="size-6">{@html settingsIcon}</div>
            Settings
        </a>
    </div>
</div>