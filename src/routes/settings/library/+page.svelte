<script lang="ts">
    import UploadButton from "$lib/components/forms/upload-button.svelte";
    import activeTab from "$lib/stores/activeTab";
    import toast from "svelte-hot-french-toast";
    import searchIcon from '$lib/assets/icons/search.svg?raw'
    import uploadIcon from '$lib/assets/icons/upload.svg?raw'
    import pruneSongIcon from '$lib/assets/icons/cut-song.svg?raw'
    import pruneArtistIcon from '$lib/assets/icons/cut-artist.svg?raw'
    import pruneAlbumIcon from '$lib/assets/icons/cut-album.svg?raw'
    import pruneAssetIcon from '$lib/assets/icons/cut-asset.svg?raw'
    import { pruneAlbums, pruneArtists, pruneAssets, pruneSongs, scan, upload } from "$lib/actions/library";

    activeTab.set('library')

    const handleUpload = async (e?: any) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(e.currentTarget)
        try{
            await upload(formData)
            toast.success('Song upload success')
            form.reset()
        }catch(e){
            toast.error('Error uploading song')
        }
    }

    const handleScan = async (e?: any) => {
        e.preventDefault()
        try{
            await scan()
            toast.success('Scan folder task initialized')
        }catch(e){
            toast.error('Scan folder failed')
        }
    }

    const handlePruneSongs = async (e?: any) => {
        e.preventDefault()
        try{
            await pruneSongs()
            toast.success('Prune songs task initialized')
        }catch(e){
            toast.error('Prune songs folder failed')
        }
    }

    const handlePruneArtists = async (e?: any) => {
        e.preventDefault()
        try{
            await pruneArtists()
            toast.success('Prune artists task initialized')
        }catch(e){
            toast.error('Prune artists folder failed')
        }
    }

    const handlePruneAlbums = async (e?: any) => {
        e.preventDefault()
        try{
            await pruneAlbums()
            toast.success('Prune albums task initialized')
        }catch(e){
            toast.error('Prune albums folder failed')
        }
    }

    const handlePruneAssets = async (e?: any) => {
        e.preventDefault()
        try{
            await pruneAssets()
            toast.success('Prune assets task initialized')
        }catch(e){
            toast.error('Prune assets folder failed')
        }
    }

    
</script>

<h2 class="w-full text-3xl text-heading mb-0">Library</h2>
<p class="text-legend mb-6">Manage your files and database</p>
    
<section class="space-y-2 mb-8">
    <div class="flex not-sm:flex-col gap-4 items-stretch justify-between bg-surface p-4 rounded-md">
        <div class="flex items-center gap-4">
            <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html searchIcon}</i>
            <div>
                <p class="font-semibold text-heading">Scan folder</p>
                <p class="text-sm text-legend w-full">Scans your music directory and update database with new files or tags</p>
            </div>
        </div>
        <form method="post" class="flex gap-4" onsubmit={handleScan}>
            <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
        </form>
    </div>
    
    <div class="flex not-sm:flex-col gap-2 items-stretch justify-between bg-surface p-4 rounded-md">
        <div class="flex items-center gap-4">
            <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html uploadIcon}</i>
            <div>
                <p class="font-semibold text-heading">Upload new song</p>
                <p class="text-sm text-legend w-full">Upload a new file to be saved in your music directory</p>
            </div>
        </div>
        <form method="post" class="flex gap-4 not-sm:flex-col not-sm:items-stretch items-center" enctype="multipart/form-data" onsubmit={handleUpload}>
            <UploadButton name='file' id='file' accept='.mp3' placeholder='Choose audio file'/>
            <input type="submit" value="Execute" class="cursor-pointer p-2 w-full rounded-lg bg-surface hover:bg-surface-hover text-heading border border-border">
        </form>
    </div>
</section>

<section class="space-y-4">
    <h2 class="text-subheading text-xl">Maintance</h2>
    <div class="*:p-4 *:border *:border-t-0 *:border-border *:first:border-t *:first:rounded-t-md *:last:rounded-b-md *:bg-surface">
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneSongIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune songs</p>
                    <p class="text-sm text-legend line-clamp-3">Verify the database for songs with no file associated. This is useful when you delete a file, but the app still has the song on the database</p>
                </div>
            </div>
            <form method="post" class="flex items-center gap-4" onsubmit={handlePruneSongs}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
        
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneArtistIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune artists</p>
                    <p class="text-sm text-legend line-clamp-3">Verify the database for artists with no song associated.</p>
                </div>
            </div>
            <form method="post" class="flex items-center gap-4" onsubmit={handlePruneArtists}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
        
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneAlbumIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune albums</p>
                    <p class="text-sm text-legend line-clamp-3">Verify the database for albums with no song associated.</p>
                </div>
            </div>
            <form method="post" class="flex items-center gap-4" onsubmit={handlePruneAlbums}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
        
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneAssetIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune assets</p>
                    <p class="text-sm text-legend line-clamp-3">Remove unused images for songs and albums</p>
                </div>
            </div>
            <form method="post" class="flex items-center gap-4" onsubmit={handlePruneAssets}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
    </div>
</section>