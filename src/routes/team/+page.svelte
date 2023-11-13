<script lang="ts">
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	let canvas: any;
	let mapImage: any;
	let pin: any;
	let ctx: any;

	let isClicked = false;

	const promise = new Promise<Options>((resolve) => {
		canvas;

		mapImage = new Image();
		mapImage.src = 'team/pxmap.png';

		pin = new Image();
		pin.src = 'team/pin.png';
		pin.style.opacity = '0.2';
		pin.style.class = 'hello';

		mapImage.onload = () =>
			resolve({
				width: mapImage.width,
				height: mapImage.height,
				render,
				friction: 0.95
			});

		function render(context: CanvasRenderingContext2D, _t: number, _focus: Point) {
			ctx = context;
			context.imageSmoothingEnabled = false;
			context.drawImage(mapImage, 0, 0);

			if (!isClicked) context.drawImage(pin, 50, 50, 10, 10);
		}
	});

	function getTransformedPoint(x: any, y: any) {
		const devicePixelRatio = window.devicePixelRatio || 1;
		const originalPoint = new DOMPoint(x * devicePixelRatio, y * devicePixelRatio);
		return ctx.getTransform().invertSelf().transformPoint(originalPoint);
	}

	function onPointerClick(event: PointerEvent) {
		if (!ctx) return;

		const cursorPosition = getTransformedPoint(event.offsetX, event.offsetY);
		const x = cursorPosition.x;
		const y = cursorPosition.y;

		if (x > 50 && x <= 60 && y > 50 && y <= 60) {
			isClicked = !isClicked;
		}
	}
</script>

<div class="h-screen w-full">
	{#await promise then options}
		<canvas
			bind:this={canvas}
			on:pointerdown={onPointerClick}
			use:panzoom={options}
			class="bg-[url('/team/pxgrid.png')] h-full w-full z-50"
		/>
	{/await}
</div>

<style>
	canvas {
		box-sizing: border-box;
	}
</style>
