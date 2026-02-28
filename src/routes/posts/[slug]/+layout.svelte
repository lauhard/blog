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
    
    <div>
        {@render children()}
    </div>
    <menu>
        {#if prevRoute?.name != ""}
            <NavigationItem route={prevRoute} className=""></NavigationItem>
        {/if}
        {#if nextRoute?.name != ""}
            <NavigationItem route={nextRoute} className="nav-item-right"
            ></NavigationItem>
        {/if}
    </menu>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        
    }
    menu {
        margin: 0;
        padding: 0;
        width: 100%;
        z-index: 300;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 80px;
        height: auto;
        background-color: var(--color-ld-white-400);
        margin-block: .5rem;
        border-radius: 1rem;

    }
    :global(.nav-item) {
        width: 50%;
        display: flex;
        flex: 1;
        
    }
    :global(.nav-link) {
        width: 50%;
        display: flex;
        max-height: 80px;
        flex: 1;
        justify-content: flex-start;
    }
    :global(.nav-item-right > a) {
        display: flex;
        flex-direction: row-reverse;
        text-align: right;
    }
    :global(.nav-item > a:has(svg) > svg) {
        min-width: 45px;
        min-height: 45px;
        padding: 0.6rem;
        margin-inline: 1rem;
        border-radius: 100%;
        background-color: var(--color-ld-accent-500);
        color: var(--color-ld-white-600);
        border: 4px var(--color-ld-accent-600) solid;
    }

    :global(.nav-item:hover a > svg) {
        color: var(--color-ld-accent-700);
    }
   
    @media (width < 800px) {
        :global(.nav-link) {
            text-align: normal;
        }
        :global(.nav-item-right) {
            justify-content: end;
        }
    }
    @media (width < 600px) {
        :global(.nav-link) {
            justify-content: space-between;
        }
        :global(.link-text) {
            display: none;
        }
    }
</style>
