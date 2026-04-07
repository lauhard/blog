<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		trigger: Snippet;
		children: Snippet;
		id?: string;
		minWidth?: string;
		minHeight?: string;
		triggerClass?: string;
	}

	let {
		trigger,
		children,
		id = crypto.randomUUID(),
		minWidth = "200px",
		minHeight = "auto",
		triggerClass = "",
	}: Props = $props();

	const anchorName = $derived(`--popover-anchor-${id}`);
	const popoverId = $derived(`popover-${id}`);
</script>

<button
	popovertarget={popoverId}
	class="popover-trigger {triggerClass}"
	style="anchor-name: {anchorName}"
>
	{@render trigger()}
</button>

<div
	id={popoverId}
	popover
	class="bounce-popover"
	style="position-anchor: {anchorName}; min-width: {minWidth}; min-height: {minHeight};"
>
	{@render children()}
</div>

<style>
	.popover-trigger {
		cursor: pointer;
	}

	.bounce-popover {
		position: fixed;
		inset: auto;
		top: anchor(bottom);
		right: anchor(right);
		margin: 0;
		padding: 0;
		margin-top: 0.5rem;
		background-color: var(--color-ld-white-400);
		border: 1px solid var(--color-ld-accent-500);
		border-radius: 10px;
		box-shadow: var(--shadow-md);

		&:global(:popover-open) {
			animation: bounce-in 0.55s linear;
		}

		:global(ul) {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			padding: 1rem;
		}

		:global(li) {
			min-height: 2rem;
		}
	}

	@keyframes bounce-in {
		0%   { opacity: 0; transform: translateY(-18px) scale(0.88); }
		40%  { opacity: 1; transform: translateY(9px)   scale(1.05); }
		62%  {             transform: translateY(-5px)  scale(0.97); }
		78%  {             transform: translateY(3px)   scale(1.02); }
		90%  {             transform: translateY(-1px)  scale(0.99); }
		100% {             transform: translateY(0)     scale(1);    }
	}
</style>
