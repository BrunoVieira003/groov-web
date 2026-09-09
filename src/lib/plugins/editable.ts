export function editable(value: string | undefined, onFinish: (value: string) => void | Promise<void>, enabled: boolean = false){
    return (element: HTMLElement) => {
        element.contentEditable = String(enabled)
        element.textContent = value ?? ""

        element.onkeydown = (e) => {
            if(e.key === 'Enter'){
                e.preventDefault()
                element.blur()
            }
        }

        element.oninput = () => {
            value = element.textContent
        }

        element.onblur = () => {
            onFinish(element.textContent)
        }

        return () => {
            element.textContent = ''
        }
    }
}