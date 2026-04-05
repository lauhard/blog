<script lang="ts">
    import NavigationItem from "$lib/components/NavigationItem.svelte";
    import type { Route } from "$lib/routes";
    import { LucideChevronFirst, LucideChevronLast } from "lucide-svelte";
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
            icon: data.prevPost?.title ? LucideChevronFirst : undefined,
        };
        nextRoute = {
            path: "/posts/" + (data.nextPost?.slug ?? ""),
            name: data.nextPost?.title ?? "",
            icon: data.nextPost?.title ? LucideChevronLast : undefined,
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
        height: fit-content;
        background-color: var(--color-ld-white-400);
        margin-top: 2rem;
        margin-bottom: 0.5rem;
        border-radius: 1rem;
        text-wrap: balance;
        gap: 0.5rem;
    }
    :global(.nav-item) {
        width: 50%;
        display: flex;
        flex: 1;
        height: 100%;
        padding-block: 0.2rem;
        border-radius: 5px;
        border: 1px solid var(--color-ld-accent-600);

    }
    :global(.nav-link) {
        width: 50%;
        display: flex;
        max-height: 80px;
        height: max-content;
        flex: 1;
        justify-content: flex-start;
        font-weight: normal;
        line-height: 1.5rem;
    }
    :global(.nav-item-right > a) {
        display: flex;
        flex-direction: row-reverse;
        text-align: right;
    }
    :global(.nav-item > a:has(svg) > svg) {
        min-width: 45px;
        min-height: 45px;
        padding: 0.3rem;
        margin-inline: 0rem;
        border-radius: 100%;
        stroke-width: 0.1rem;
        color: var(--color-ld-black-500);
    }

    :global(.nav-item:hover a > svg) {
        color: var(--color-ld-accent-700);
    }

 
  

    @media (width < 800px) {
        menu {
            flex-direction: column;
        }
        :global(.nav-item) {
            width: 100%;
        }
        :global(.nav-link) {
            width: 50%;
            display: flex;
            max-height: 80px;
            height: auto;
            flex: 1;
            justify-content: flex-start;
            font-weight: normal;
            line-height: 1.5rem;
        }
    }
</style>
