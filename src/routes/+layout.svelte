<script lang="ts">
	import "$lib/css/main.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navigation from "$lib/components/Navigation.svelte";
	import { routes } from "$lib/routes";
	import Footer from "$lib/components/Footer.svelte";
	import { page } from "$app/state";
    import ThemeToggle from "$lib/components/ThemeToggle.svelte";
    import { LucideCog, LucideWrench } from "lucide-svelte";
	let app_verson = import.meta.env.VITE_VERSION ?? "local.dev";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header>
		<a href="/"> <h1>alau.at</h1></a>
		<button
			id="menu-anchor"
			popovertarget="popover-menu"
			class="btn btn-menu">
			<LucideCog></LucideCog>
			</button
		>
	</header>
	<menu id="popover-menu" popover>
		<ul>
			<li class="theme-toggle">
				<ThemeToggle></ThemeToggle>
				<span>Dark Mode</span>
			</li>
		</ul>
		<div class="menu-footer">
			<span>Version:</span><span>{app_verson}</span>
		</div>
	</menu>

	<main>
		{@render children()}
	</main>
	<Footer></Footer>
</div>

<style>
	#menu-anchor {
		anchor-name: --menu-anchor;
		
		border: 1px solid var(--color-ld-white-500);
		margin-block: 1rem;
		max-width: 50px;
		width: 50px;
		height: 50px;
		padding: 0px;
		@media (width < 600px){
			max-width: 45px;
			width: 45px;
			height: 45px;
			padding: 2px;
		}
		margin-inline-end: 1.5rem;
		border-radius: 50px;
	}
	#popover-menu {
		position-anchor: --menu-anchor;
		position: fixed;
		inset: auto;
		top: anchor(bottom);
		right: anchor(right);
		margin: 0;
		padding: 0;
		margin-top: .5rem;
		min-width: 200px;
		min-height: 300px;
		background-color: var(--color-ld-white-400);
		border: 1px solid var(--color-ld-accent-500);
		border-radius: 10px;
		box-shadow: var(--shadow-md);
		ul{
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				padding: 1rem;
				li{
					min-height: 2rem;
				}
			}
			.theme-toggle{
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				gap: 1rem;
			}
		.menu-footer{
			position: absolute;
			bottom: 0;
			padding: .5rem 1rem;
			
			span:last-of-type{
				margin-left: .5rem;
			}
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
			a {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				text-decoration: none;
			}
			h1 {
				margin: 0;
				margin-inline: 1.5rem;
				font-family: "Alpino-Light", sans-serif;
				color: var(--color-ld-accent-500);
				font-size: 1.7rem;
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
