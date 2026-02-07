<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    let searchText = $state(page.url.searchParams.get('q'))

    async function handleSearch(e: SubmitEvent){
        e.preventDefault()
        console.log('click')
        await goto(`/search`)
    }


</script>
<div class="flex items-center gap-20 bg-gray-800 py-3 px-40 mb-6">
    <h1 class="text-2xl font-medium">Groov</h1>
    <div class="flex gap-8 items-center justify-between text-sm *:p-2 *:rounded-lg *:hover:bg-slate-700">
        <a href="/">Home</a>
        <a href="/artists">Artists</a>
        <a href="/tasks">Tasks</a>
    </div>
    <form action="/search">
        <input
        type="text"
        name="q"
        bind:value={searchText}
        id="q"
        placeholder="Search for a song or artist..."
        class="bg-slate-900 py-2 px-3 rounded-md outline-none"
        >
    </form>
</div>