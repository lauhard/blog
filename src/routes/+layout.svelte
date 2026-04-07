<script lang="ts">
	import "$lib/css/main.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navigation from "$lib/components/Navigation.svelte";
	import { routes } from "$lib/routes";
	import Footer from "$lib/components/Footer.svelte";
	import { page } from "$app/state";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";
	import BouncePopover from "$lib/components/BouncePopover.svelte";
	import { LucideCog } from "lucide-svelte";
	import { beforeNavigate, onNavigate } from "$app/navigation";
	import AnimatedTitle from "$lib/components/AnimatedTitle.svelte";
	import GridBackground from "$lib/components/GridBackground.svelte";

	let app_verson = import.meta.env.VITE_VERSION ?? "local.dev";
	let { children } = $props();

	beforeNavigate(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header>
		<AnimatedTitle />
		<BouncePopover minHeight="300px" triggerClass="btn btn-menu">
			{#snippet trigger()}
				<LucideCog />
			{/snippet}
			{#snippet children()}
				<ul>
					<li class="theme-toggle">
						<ThemeToggle></ThemeToggle>
						<span>Dark / Light</span>
					</li>
				</ul>
				<div class="menu-footer">
					<span>Version:</span><span>{app_verson}</span>
				</div>
			{/snippet}
		</BouncePopover>
	</header>
<GridBackground />
	<main>
		{@render children()}
	</main>
	<Footer></Footer>
</div>

<style>
:global(.btn-menu) {
		border: 1px solid var(--color-ld-white-500);
		margin-block: 1rem;
		max-width: 50px;
		width: 50px;
		height: 50px;
		padding: 0px;
		@media (width < 600px) {
			max-width: 45px;
			width: 45px;
			height: 45px;
			padding: 2px;
		}
		margin-inline-end: 1.5rem;
		border-radius: 50px;
		transition:
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.3s ease;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover :global(svg) {
			animation: spin 1.5s linear ;
		}
	}

	:global(.theme-toggle) {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		gap: 1rem;
	}

	:global(.menu-footer) {
		position: absolute;
		bottom: 0;
		padding: 0.5rem 1rem;

		span:last-of-type {
			margin-left: 0.5rem;
		}
	}
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
			background-color: var(--color-ld-white-400);
		}
		main {
			height: inherit;
			padding-top: var(--header-height);
			max-width: var(--content-width);
			padding-inline: var(--side);
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* View Transitions Defaults */
	::view-transition-old(root),
	::view-transition-new(root) {
		animation-duration: 0.4s;
	}
</style>
