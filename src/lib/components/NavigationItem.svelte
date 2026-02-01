<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { type Route } from "$lib/routes";
    let {
        route,
        classPrefix = "",
        ...props
    }: {
        route: Route;
        classPrefix?: string;
    } = $props();

    const isNavItemActive = (routePath: string) => {
        if (
            page.url.pathname == routePath ||
            (page.url.pathname.includes(routePath.toLowerCase()) &&
                routePath.toLowerCase() != "/")
        ) {
            return true;
        }
    };
</script>

{#snippet GetIconFromRoute(route: Route)}
    {#if route?.icon != undefined}
        {@const Icon = route.icon}
        <Icon size="1.5rem" />
    {/if}
{/snippet}

<li
    class="{classPrefix}nav-item"
    class:active={route.path ? isNavItemActive(route.path) === true : false}
    data-hasList={route?.subRoutes ? "true" : "false"}
    data-route-name={route.name}
    {...props}
>
    <a class="{classPrefix}nav-link" href={resolve(route.path as any)}>
        {@render GetIconFromRoute(route)}
        {route.name}
    </a>
</li>