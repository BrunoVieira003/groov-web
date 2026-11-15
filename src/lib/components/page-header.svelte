<script lang="ts">
    interface Props{
        title: string
        subtitle?: string
    }

    let {title, subtitle}: Props = $props()
</script>

<div class="mb-4">
    <h1 class="text-5xl w-fit text-heading not-sm:mx-auto mb-2">{title}</h1>
    <h2 class="text-subheading">{subtitle}</h2>
</div>