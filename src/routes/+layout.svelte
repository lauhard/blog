<script lang="ts">
	import "$lib/css/main.css"
	import "$lib/css/component.css";
	import favicon from "$lib/assets/favicon.svg";
    import Header from "$lib/components/Header.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<Header></Header>
	<main>
		{@render children()}
	</main>
</div>
<style>
	main {
		margin-top: var(--header-height);
		max-width: var(--content-width);
		padding-inline: var(--side);
	}
</style>