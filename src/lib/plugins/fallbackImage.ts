import emptyImage from "$lib/assets/images/empty.png";
import type { Attachment } from "svelte/attachments";

export const fallbackImage: Attachment<HTMLImageElement> = (element) => {
    element.onerror = () => {
        console.log('error')
        element.src = emptyImage
        element.onerror = null
    }
}