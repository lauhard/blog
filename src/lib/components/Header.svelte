<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { routes } from "$lib/routes";
</script>

<header class="header">
    <Navigation {routes} ></Navigation>
</header>

<style>
    header {
        height: var(--header-height);
        width: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        position: fixed;
        left:0;
    }
</style>
