<script lang="ts">
	import "$lib/css/main.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navigation from "$lib/components/Navigation.svelte";
	import { routes } from "$lib/routes";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header class="header">
		<Navigation {routes}>
		</Navigation>
	</header>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		position: relative;
		header {
			position: fixed;
			display: flex;
			justify-content: space-between;
			max-height: var(--header-height);
			height: var(--header-height);
			width: 100%;
			z-index: 100;
			background-color: var(--color-ld-white-300);
		}
		main {
			height: inherit;
			padding-top: var(--header-height);
			width: var(--content-width);
		}
	}
</style>
