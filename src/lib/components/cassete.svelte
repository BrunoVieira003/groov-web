<script lang="ts">
    import Marquee from "./marquee.svelte";
    import emptyImage from '$lib/assets/images/empty.png'

    interface PropsType{
        title?: string
        coverImageSrc?: string
        spinning?: boolean
    }

    let {title = '', coverImageSrc = emptyImage, spinning = false}: PropsType = $props()

    // svelte-ignore non_reactive_update
    let coverImage: HTMLImageElement

</script>
<div class="flex flex-col items-center justify-between pt-4 bg-neutral-medium w-full aspect-video rounded-md">
    <div class="flex flex-col items-center justify-center bg-highlight w-6/7 h-2/3 rounded-md overflow-hidden">
        <div class="h-full min-h-10 w-full flex justify-center overflow-hidden">
            <img
            bind:this={coverImage}
            src={coverImageSrc}
            alt="album_cover_art"
            class="w-full rounded-t-md object-cover"
            onerror={() => coverImage.src = emptyImage}
            >
        </div>

        <div class="w-8/12 h-2/4 flex items-center justify-evenly bg-neutral-light p-2 rounded-xs outline-8 outline-highlight">
            <div class="w-1/5 bg-neutral-dark aspect-square rounded-full relative border-4 border-highlight">
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight" class:spinning></div>
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight rotate-45" class:spinning></div>
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight rotate-90" class:spinning></div>
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight rotate-135" class:spinning></div>
                <div class="absolute w-9/12 h-9/12 right-1/2 translate-x-1/2 -translate-y-1/2 top-1/2 bg-neutral-dark rounded-full"></div>
            </div>
            <div class="w-2/5 bg-neutral-dark h-2/3 glass"></div>
            <div class="w-1/5 bg-neutral-dark aspect-square rounded-full relative border-4 border-highlight">
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight" class:spinning></div>
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight rotate-45" class:spinning></div>
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight rotate-90" class:spinning></div>
                <div class="absolute left-1/2 -translate-x-1/2 h-full w-1/10 mx-auto bg-highlight rotate-135" class:spinning></div>
                <div class="absolute w-9/12 h-9/12 left-1/2 -translate-x-1/2 center translate-y-1/2 bottom-1/2 bg-neutral-dark rounded-full" class:spinning></div>
            </div>
        </div>

        <div class="h-full w-fit flex px-2 py-1 items-center justify-start">
            <Marquee>
                <p class="text-neutral-darker font-semibold text-sm">{title}</p>
            </Marquee>
        </div>
    </div>

    <div class="h-1/4 bg-neutral-light w-4/6 rounded-t-md cassete-shadow"></div>
</div>

<style>
    .spinning {
        animation: spin 3s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>