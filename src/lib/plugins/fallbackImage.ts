import emptyImage from "$lib/assets/images/empty.png";
import type { Attachment } from "svelte/attachments";

// export function fallbackImage(): Attachment<HTMLImageElement>{
//     return (element) => {
//         element.onerror = () => {
//             console.log('error')
//             element.src = emptyImage
//             element.onerror = null
//         }
//     }
// }

export const fallbackImage: Attachment<HTMLImageElement> = (element) => {
    element.onerror = () => {
        console.log('error')
        element.src = emptyImage
        element.onerror = null
    }
}