<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	type SplitMode = 'chars' | 'words';

	let {
		text,
		as = 'h1',
		mode = 'chars',
		baseColor = 'currentColor',
		hoverColor = '#ff2d55',
		stagger = 0.02,
		duration = 0.7,
		ease = 'power3.out',
		className = ''
	}: {
		text: string;
		as?: 'h1' | 'h2' | 'p' | 'span';
		mode?: SplitMode;
		baseColor?: string;
		hoverColor?: string;
		stagger?: number;
		duration?: number;
		ease?: string;
		className?: string;
	} = $props();

	let el = $state<HTMLElement | null>(null);
	let originalHTML = '';
	let ctx: gsap.Context | null = null;

	function escapeHtml(s: string) {
		return s
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	function splitToSpans(rawText: string, splitMode: SplitMode) {
		if (splitMode === 'words') {
			// Preserve spaces as actual spaces between word spans
			const words = rawText.split(/(\s+)/);
			return words
				.map((part) => {
					if (/^\s+$/.test(part)) return escapeHtml(part);
					return `<span class="seg" data-seg="word">${escapeHtml(part)}</span>`;
				})
				.join('');
		}

		// chars (including spaces as non-breaking)
		return Array.from(rawText).map((ch) => {
			const safe = ch === ' ' ? '&nbsp;' : escapeHtml(ch);
			// aria-hidden auf Segmenten, damit Screenreader nicht stottern
			return `<span class="seg" data-seg="char" aria-hidden="true">${safe}</span>`;
		}).join('');
	}

	function segments() {
		if (!el) return [] as HTMLElement[];
		return Array.from(el.querySelectorAll<HTMLElement>('.seg'));
	}

	onMount(() => {
		if (!el) return;

		// 1) Original sichern + splitten
		originalHTML = el.innerHTML;
		el.innerHTML = splitToSpans(text, mode);

		// 2) Accessibility: ein unsplittetes SR-Label
		el.setAttribute('aria-label', text);

		// 3) GSAP Context für sauberes Cleanup
		ctx = gsap.context(() => {
			const segs = segments();

			gsap.set(segs, { display: 'inline-block', color: baseColor });

			// Intro animation
			gsap.fromTo(
				segs,
				{ yPercent: 110, opacity: 0, rotateZ: 0.001 },
				{
					yPercent: 0,
					opacity: 1,
					duration,
					ease,
					stagger
				}
			);
		}, el);

		// 4) Hover: per Event-Listener (robust; kein Svelte on:hover syntactic sugar nötig)
		const handleEnter = () => {
			const segs = segments();
			gsap.to(segs, {
				color: hoverColor,
				duration: 0.25,
				stagger: { each: 0.008, from: 'start' },
				overwrite: 'auto'
			});
		};

		const handleLeave = () => {
			const segs = segments();
			gsap.to(segs, {
				color: baseColor,
				duration: 0.35,
				stagger: { each: 0.006, from: 'end' },
				overwrite: 'auto'
			});
		};

		el.addEventListener('pointerenter', handleEnter);
		el.addEventListener('pointerleave', handleLeave);

		return () => {
			el?.removeEventListener('pointerenter', handleEnter);
			el?.removeEventListener('pointerleave', handleLeave);
			ctx?.revert();
			// Optional: Original-HTML wiederherstellen (sauber beim Route-Change)
			if (el) el.innerHTML = originalHTML || escapeHtml(text);
		};
	});
</script>

<svelte:element
	this={as}
	bind:this={el}
	class={`splitText ${className}`}
	style="display: inline-block;"
>
	<!-- Fallback für SSR/No-JS: Normaler Text -->
	{text}
</svelte:element>

<style>
	.splitText {
		/* Minimiert “jitter” bei animierten glyphs */
		transform: translateZ(0);
		will-change: transform, opacity;
	}

	/* Optional: etwas tighter für char-splitting */
	.splitText :global(.seg[data-seg="char"]) {
		white-space: pre;
	}

	/* Optional: nicer hover feel */
	.splitText:hover {
		cursor: default;
	}
</style>
