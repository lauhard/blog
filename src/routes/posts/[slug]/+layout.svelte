<script lang="ts">
    import type { Snippet } from "svelte";
    let {
        children,
    }: {
        children: Snippet;
    } = $props();
</script>

<div class="wrapper">
    {@render children()}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
    }
    .wrapper::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--color-ld-white-400);
        opacity: 0.7;
        backdrop-filter: blur(10px);
        /* box-shadow: 0px 0px 30px 30px var(--color-ld-white-400); */
        filter:blur(5px);
        z-index: 0;
    }
    :global(.wrapper > *) {
        position: relative;
        z-index: 1;
    }
</style>
