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
<div class="bg-orbit-container" aria-hidden="true">
    <!-- from top -->
    <div class="bg-particle particle-1"></div>
    <div class="bg-particle particle-2"></div>
    <div class="bg-particle particle-3"></div>
    <!-- from right -->
    <div class="bg-particle particle-4"></div>
    <div class="bg-particle particle-5"></div>
    <div class="bg-particle particle-6"></div>
    <!-- from bottom -->
    <div class="bg-particle particle-7"></div>
    <div class="bg-particle particle-8"></div>
    <div class="bg-particle particle-9"></div>
    <!-- from left -->
    <div class="bg-particle particle-10"></div>
    <div class="bg-particle particle-11"></div>
    <div class="bg-particle particle-12"></div>
</div>
	<main>
		{@render children()}
	</main>
	<Footer></Footer>
</div>

<style>
    /* Background Offset Path Animations */
    .bg-orbit-container {
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
        filter: blur(1px);
        opacity: .6;
        mix-blend-mode:normal;
    }

    .bg-particle {
        position: absolute;
        border-radius: 50%;
        top: 0; left: 0;
    }

    /* === FROM TOP === */
    .particle-1 {
        width: 140px; height: 140px;
        background: var(--color-ld-accent-300);
        offset-path: path("M 250 -120 C 300 250, 650 500, 850 900");
        animation: float-path 55s ease-in-out infinite alternate;
        opacity: 0.5;
        animation-delay: 0s;
    }

    .particle-2 {
        width: 25px; height: 25px;
        background: var(--color-ld-accent-500);
        offset-path: path("M 600 -80 C 550 300, 750 550, 350 900");
        animation: float-path 48s ease-in-out infinite alternate;
        opacity: 0.7;
        animation-delay: -20s;
    }

    .particle-3 {
        width: 70px; height: 70px;
        background: var(--color-ld-white-700);
        offset-path: path("M 950 -100 C 880 200, 500 450, 650 900");
        animation: float-path 62s ease-in-out infinite alternate;
        opacity: 0.4;
        animation-delay: -38s;
    }

    /* === FROM RIGHT === */
    .particle-4 {
        width: 90px; height: 90px;
        background: var(--color-ld-accent-300);
        offset-path: path("M 1500 180 C 1100 220, 600 350, 120 550");
        animation: float-path 58s ease-in-out infinite alternate;
        opacity: 0.45;
        animation-delay: -10s;
    }

    .particle-5 {
        width: 20px; height: 20px;
        background: var(--color-ld-white-700);
        offset-path: path("M 1500 450 C 1050 500, 550 380, 120 250");
        animation: float-path 44s ease-in-out infinite alternate;
        opacity: 0.65;
        animation-delay: -30s;
    }

    .particle-6 {
        width: 55px; height: 55px;
        background: var(--color-ld-accent-500);
        offset-path: path("M 1500 750 C 1100 720, 650 620, 120 700");
        animation: float-path 67s ease-in-out infinite alternate;
        opacity: 0.5;
        animation-delay: -52s;
    }

    /* === FROM BOTTOM === */
    .particle-7 {
        width: 110px; height: 110px;
        background: var(--color-ld-white-700);
        offset-path: path("M 200 1050 C 280 700, 600 450, 900 -80");
        animation: float-path 60s ease-in-out infinite alternate;
        opacity: 0.38;
        animation-delay: -5s;
    }

    .particle-8 {
        width: 30px; height: 30px;
        background: var(--color-ld-accent-300);
        offset-path: path("M 580 1050 C 500 650, 800 400, 400 -80");
        animation: float-path 50s ease-in-out infinite alternate;
        opacity: 0.6;
        animation-delay: -25s;
    }

    .particle-9 {
        width: 18px; height: 18px;
        background: var(--color-ld-accent-500);
        offset-path: path("M 980 1050 C 900 700, 450 480, 700 -80");
        animation: float-path 42s ease-in-out infinite alternate;
        opacity: 0.7;
        animation-delay: -44s;
    }

    /* === FROM LEFT === */
    .particle-10 {
        width: 80px; height: 80px;
        background: var(--color-ld-accent-500);
        offset-path: path("M -120 200 C 250 180, 650 300, 1080 480");
        animation: float-path 53s ease-in-out infinite alternate;
        opacity: 0.45;
        animation-delay: -16s;
    }

    .particle-11 {
        width: 35px; height: 35px;
        background: var(--color-ld-white-700);
        offset-path: path("M -120 500 C 200 520, 600 420, 1080 280");
        animation: float-path 46s ease-in-out infinite alternate;
        opacity: 0.6;
        animation-delay: -35s;
    }

    .particle-12 {
        width: 120px; height: 120px;
        background: var(--color-ld-accent-300);
        offset-path: path("M -120 780 C 280 750, 650 650, 1080 700");
        animation: float-path 70s ease-in-out infinite alternate;
        opacity: 0.35;
        animation-delay: -58s;
    }

    @keyframes float-path {
        100% { offset-distance: 100%; }
    }
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
