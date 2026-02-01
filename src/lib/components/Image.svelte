<script lang="ts">
    let { src = "", alt = "", iClass = "" } = $props();
    let loading: "lazy" | "eager" = "lazy";
</script>

<img class="markdown-image {iClass}" {src} {alt} width="100" height="100" {loading} />

<style>
    .markdown-image {
        object-position: center;
        object-fit: contain;
        display: flex;
        width: 100%;
        height: auto;
        max-inline-size: 100%;
        max-block-size: 100%;
        border-radius: var(--radius-5);
        box-sizing: border-box;
    }
</style>