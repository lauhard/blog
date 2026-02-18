<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	type SplitMode = 'chars' | 'words';

	let {
		text,
		as = 'h1',
		mode = 'chars',
		baseColor = 'currentColor',
		activeColor = '#8b5cf6',
		hoverStagger = 0.02,
		duration = 0.35,
		ease = 'power2.out',
		lift = 0, // z.B. 6 => yPercent -6 beim Aktivieren
		className = ''
	}: {
		text: string;
		as?: 'h1' | 'h2' | 'p' | 'span';
		mode?: SplitMode;
		baseColor?: string;
		activeColor?: string;
		hoverStagger?: number;
		duration?: number;
		ease?: string;
		lift?: number;
		className?: string;
	} = $props();

	let el = $state<HTMLElement | null>(null);

	let originalHTML = '';
	let ctx: gsap.Context | null = null;
	let tl: gsap.core.Timeline | null = null;

	let isActive = $state(false);

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
			const parts = rawText.split(/(\s+)/);
			return parts
				.map((p) => (/^\s+$/.test(p) ? escapeHtml(p) : `<span class="seg" data-seg="word">${escapeHtml(p)}</span>`))
				.join('');
		}

		return Array.from(rawText)
			.map((ch) => {
				const safe = ch === ' ' ? '&nbsp;' : escapeHtml(ch);
				return `<span class="seg" data-seg="char" aria-hidden="true">${safe}</span>`;
			})
			.join('');
	}

	function segments() {
		if (!el) return [] as HTMLElement[];
		return Array.from(el.querySelectorAll<HTMLElement>('.seg'));
	}

	onMount(() => {
		if (!el) return;

		originalHTML = el.innerHTML;

		// Split erst im Client (SSR-safe)
		el.innerHTML = splitToSpans(text, mode);
		el.setAttribute('aria-label', text);

		ctx = gsap.context(() => {
			const segs = segments();

			// baseline
			gsap.set(segs, {
				display: 'inline-block',
				color: baseColor,
				yPercent: 0
			});

			// Toggle timeline: "off" -> "on" (play); reverse: "on" -> "off"
			tl = gsap
				.timeline({
					paused: true,
					defaults: { ease, duration }
				})
				.to(
					segs,
					{
						color: activeColor,
						yPercent: lift ? -Math.abs(lift) : 0,
						stagger: { each: hoverStagger, from: 'start' },
						overwrite: 'auto'
					},
					0
				);
		}, el);

		const toggle = () => {
			if (!tl) return;

			isActive = !isActive;

			// Wenn aktiv: play (stagger vorwärts)
			// Wenn inaktiv: reverse (stagger rückwärts)
			if (isActive) {
				tl.play(0);
			} else {
				// reverse von Ende, damit das Zurücklaufen sauber wirkt
				tl.reverse();
			}
		};

		// Desktop: Hover-Enter toggelt
		const onEnter = () => toggle();

		// Mobile/Touch: Click toggelt (Hover existiert nicht zuverlässig)
		const onClick = (e: MouseEvent) => {
			// verhindert Textauswahl/Highlighting bei schnellen Klicks
			e.preventDefault();
			toggle();
		};

		el.addEventListener('pointerenter', onEnter);
		el.addEventListener('click', onClick);

		return () => {
			el?.removeEventListener('pointerenter', onEnter);
			el?.removeEventListener('click', onClick);
			ctx?.revert();
			if (el) el.innerHTML = originalHTML || escapeHtml(text);
		};
	});
</script>

<svelte:element this={as} bind:this={el} class={`splitToggle ${className}`} style="display:inline-block;">
	{text}
</svelte:element>

<style>
	.splitToggle {
		transform: translateZ(0);
		will-change: transform, color;
		cursor: default;
	}

	.splitToggle :global(.seg[data-seg="char"]) {
		white-space: pre;
	}
</style>
