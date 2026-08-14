import emptyImage from "$lib/assets/images/empty.png";

export function fallbackImage(e: Event){
    const target = e.currentTarget as HTMLImageElement

    target.src = emptyImage
    target.onerror = null
}