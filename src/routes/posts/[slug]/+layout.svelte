<script lang="ts">
    import NavigationItem from "$lib/components/NavigationItem.svelte";
    import type { Route } from "$lib/routes";
    import {
        LucideArrowLeftFromLine,
        LucideArrowRightFromLine,
    } from "lucide-svelte";
    import type { Snippet } from "svelte";
    let {
        children,
        data,
    }: {
        children: Snippet;
        data: {
            prevPost: { slug: string; title: string };
            nextPost: { slug: string; title: string };
        };
    } = $props();
    let prevRoute = $derived<Route>({
        path: data.prevPost?.slug ?? "",
        name: data.prevPost?.title ?? "",
    });
    let nextRoute = $derived<Route>({
        path: data.nextPost?.slug ?? "",
        name: data.nextPost?.title ?? "",
    });
    $effect(() => {
        prevRoute = {
            path: "/posts/" + (data.prevPost?.slug ?? ""),
            name: data.prevPost?.title ?? "",
            icon: data.prevPost?.title ? LucideArrowLeftFromLine : undefined,
        };
        nextRoute = {
            path: "/posts/" + (data.nextPost?.slug ?? ""),
            name: data.nextPost?.title ?? "",
            icon: data.nextPost?.title ? LucideArrowRightFromLine : undefined,
        };
    });
</script>

<div class="wrapper">
    <menu>
        <NavigationItem route={prevRoute}></NavigationItem>
        <NavigationItem route={nextRoute} className="nav-link-right"
        ></NavigationItem>
    </menu>
    {@render children()}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        @media (width < 1100px) {
            flex-direction: column-reverse;
        }
    }
    menu {
        margin: 0;
        padding: 0;
        width: 100%;
        position: sticky;
        top: 0px;
        z-index: 300;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 80px;
        height: auto;
        background-color: var(--color-ld-white-300);
        @media (width < 1100px) {
            position: relative;
        }
    }
    :global(.nav-link) {
        @media (width < 800px) {
            max-width: 200px;
        }
    }
    :global(.nav-link-right > a) {
        display: flex;
        flex-direction: row-reverse;
    }
    :global(.nav-link-right > a:has(svg) > svg) {
        min-width: 35px;
    }
</style>
