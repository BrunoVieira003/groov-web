<div class="flex flex-col w-full max-h-155 overflow-y-auto">
    <slot/>
</div>

<style>
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #24262c;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #434652;
    }
</style>