<script lang="ts">
	import "$lib/css/main.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navigation from "$lib/components/Navigation.svelte";
	import { routes } from "$lib/routes";
	import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/state";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header>
		<a href="/"> <h1>alau.at</h1></a>
		{#if page.params.slug}
			<a class="btn-posts" href="/posts">Back to Posts</a>
			 <!-- content here -->
		{/if}
	</header>
	<main>
		{@render children()}
	</main>
	<Footer></Footer>
</div>

<style>
	.app {
		position: relative;
		height: auto;
		width: 100%;
		header {
			position: fixed;
			display: flex;
			justify-content: space-between;
			max-height: var(--header-height);
			height: var(--header-height);
			width: 100%;
			z-index: 100;
			background-color: var(--color-ld-white-300);
			a{
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				text-decoration: none;
			}
			h1 {
				margin: 0;
				margin-inline: 2rem;
				font-family: "Alpino-Bold";
				color: var(--color-ld-accent-500);
				font-size: 2rem;
			}
			.btn-posts{
				height: 2.5rem;
				display: flex;
				align-self: center;
				margin-right: 1rem;
			}
		}
		main {
			height: inherit;
			padding-top: var(--header-height);
			max-width: var(--content-width);
			padding-inline: var(--side);
		}
	}
</style>
