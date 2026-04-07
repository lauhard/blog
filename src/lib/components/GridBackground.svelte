<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let W = 0, H = 0;
	let animId = 0;

	const CELL   = 58;  // grid spacing (px)
	const REACH  = 30;  // how close (perp.) the mouse must be to bend a line
	const HW     = 28;  // half-width of the bent bezier section along the line
	const MAX_BEND = 9; // max perpendicular deflection (px)
	const DOT_R  = 52;  // dot highlight radius

	let mouseX = -9999, mouseY = -9999;
	let cols = 0, rows = 0;

	function resize() {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width  = W;
		canvas.height = H;
		cols = Math.ceil(W / CELL) + 2;
		rows = Math.ceil(H / CELL) + 2;
	}

	function getColors() {
		const cs     = document.documentElement.style.colorScheme;
		const isDark = cs === 'dark' || (!cs && window.matchMedia('(prefers-color-scheme: dark)').matches);
		return {
			line:   isDark ? 'rgba(255,255,255,0.065)' : 'rgba(0,0,0,0.052)',
			dot:    isDark ? 'rgba(255,255,255,0.14)'  : 'rgba(0,0,0,0.09)',
			accent: isDark ? ([237, 138, 66] as const)  : ([34, 143, 142] as const),
		};
	}

	function draw() {
		animId = requestAnimationFrame(draw);
		if (!ctx) return;

		ctx.clearRect(0, 0, W, H);
		const { line, dot, accent } = getColors();
		const [ar, ag, ab] = accent;
		const hasMouse = mouseX > -9000;

		// ── horizontal lines ──────────────────────────────────────────────
		for (let r = 0; r < rows; r++) {
			const ly  = (r - 1) * CELL;
			const dy  = mouseY - ly;          // signed distance: + = mouse below line
			const ady = Math.abs(dy);

			// Bend amplitude: peaks at ady = REACH/2, zero at 0 and REACH.
			// Direction: toward the mouse (dy > 0 → bend downward, dy < 0 → upward).
			const prox  = hasMouse && ady < REACH ? (1 - ady / REACH) : 0;
			const bendY = prox > 0 ? -dy * prox * (MAX_BEND * 2 / REACH) : 0;

			// Base line
			ctx.beginPath();
			ctx.strokeStyle = line;
			ctx.lineWidth   = 0.65;
			ctx.moveTo(-CELL, ly);

			if (Math.abs(bendY) > 0.2) {
				ctx.lineTo(mouseX - HW, ly);
				ctx.bezierCurveTo(
					mouseX - HW * 0.3, ly + bendY,
					mouseX + HW * 0.3, ly + bendY,
					mouseX + HW,       ly,
				);
			}
			ctx.lineTo(W + CELL, ly);
			ctx.stroke();

			// Glow on the bent section
			if (Math.abs(bendY) > 0.2) {
				ctx.save();
				ctx.strokeStyle = `rgba(${ar},${ag},${ab},${prox * 0.6})`;
				ctx.lineWidth   = 1.2;
				ctx.shadowBlur  = 8;
				ctx.shadowColor = `rgba(${ar},${ag},${ab},${prox * 0.5})`;
				ctx.beginPath();
				ctx.moveTo(mouseX - HW, ly);
				ctx.bezierCurveTo(
					mouseX - HW * 0.3, ly + bendY,
					mouseX + HW * 0.3, ly + bendY,
					mouseX + HW,       ly,
				);
				ctx.stroke();
				ctx.restore();
			}
		}

		// ── vertical lines ────────────────────────────────────────────────
		for (let c = 0; c < cols; c++) {
			const lx  = (c - 1) * CELL;
			const dx  = mouseX - lx;
			const adx = Math.abs(dx);

			const prox  = hasMouse && adx < REACH ? (1 - adx / REACH) : 0;
			const bendX = prox > 0 ? -dx * prox * (MAX_BEND * 2 / REACH) : 0;

			ctx.beginPath();
			ctx.strokeStyle = line;
			ctx.lineWidth   = 0.65;
			ctx.moveTo(lx, -CELL);

			if (Math.abs(bendX) > 0.2) {
				ctx.lineTo(lx, mouseY - HW);
				ctx.bezierCurveTo(
					lx + bendX, mouseY - HW * 0.3,
					lx + bendX, mouseY + HW * 0.3,
					lx,         mouseY + HW,
				);
			}
			ctx.lineTo(lx, H + CELL);
			ctx.stroke();

			if (Math.abs(bendX) > 0.2) {
				ctx.save();
				ctx.strokeStyle = `rgba(${ar},${ag},${ab},${prox * 0.6})`;
				ctx.lineWidth   = 1.2;
				ctx.shadowBlur  = 8;
				ctx.shadowColor = `rgba(${ar},${ag},${ab},${prox * 0.5})`;
				ctx.beginPath();
				ctx.moveTo(lx, mouseY - HW);
				ctx.bezierCurveTo(
					lx + bendX, mouseY - HW * 0.3,
					lx + bendX, mouseY + HW * 0.3,
					lx,         mouseY + HW,
				);
				ctx.stroke();
				ctx.restore();
			}
		}

		// ── intersection dots ─────────────────────────────────────────────
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const px = (c - 1) * CELL;
				const py = (r - 1) * CELL;

				// Follow the bent lines: compute displacement at this intersection
				let dotX = px, dotY = py;
				if (hasMouse) {
					// Y offset from horizontal line at py bending near mouseX
					const dy_h   = mouseY - py;
					const prox_h = Math.abs(dy_h) < REACH ? (1 - Math.abs(dy_h) / REACH) : 0;
					if (prox_h > 0 && Math.abs(px - mouseX) < HW) {
						const t       = (px - (mouseX - HW)) / (2 * HW);
						const bendY_h = -dy_h * prox_h * (MAX_BEND * 2 / REACH);
						dotY = py + 3 * bendY_h * t * (1 - t);
					}
					// X offset from vertical line at px bending near mouseY
					const dx_v   = mouseX - px;
					const prox_v = Math.abs(dx_v) < REACH ? (1 - Math.abs(dx_v) / REACH) : 0;
					if (prox_v > 0 && Math.abs(py - mouseY) < HW) {
						const t       = (py - (mouseY - HW)) / (2 * HW);
						const bendX_v = -dx_v * prox_v * (MAX_BEND * 2 / REACH);
						dotX = px + 3 * bendX_v * t * (1 - t);
					}
				}

				const dist = Math.sqrt((px - mouseX) ** 2 + (py - mouseY) ** 2);
				if (hasMouse && dist < DOT_R) {
					const n = 1 - dist / DOT_R;
					ctx.beginPath();
					ctx.arc(dotX, dotY, 1.4 + n * 2.2, 0, 6.2832);
					ctx.fillStyle = `rgba(${ar},${ag},${ab},${0.1 + n * 0.7})`;
					ctx.fill();
				} else {
					ctx.beginPath();
					ctx.arc(dotX, dotY, 1.4, 0, 6.2832);
					ctx.fillStyle = dot;
					ctx.fill();
				}
			}
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		resize();
		const onResize = () => resize();
		const onMouse  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
		const onTouch  = (e: TouchEvent) => {
			if (e.touches.length > 0) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
		};
		window.addEventListener('resize',    onResize);
		window.addEventListener('mousemove', onMouse);
		window.addEventListener('touchmove', onTouch, { passive: true });
		animId = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize',    onResize);
			window.removeEventListener('mousemove', onMouse);
			window.removeEventListener('touchmove', onTouch);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}
</style>
