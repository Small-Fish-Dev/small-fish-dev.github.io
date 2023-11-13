<script lang="ts">
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	let canvas: any;
	let mapImage: any;
	let pin: any;
	let ctx: any;

	let small = 10;
	let clicked = 20;
	let isClicked = false;
	let lastClicked: any;

	let v1: any;
	let v2: any;
	let v3: any;
	let v4: any;

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
		const originalPoint = new DOMPoint(x, y);

		v1 = ctx.getTransform();

		v2 = v1.invertSelf();

		v3 = v2.transformPoint(originalPoint);

		return v3;
	}

	function onPointerClick(event: any) {
		if (!ctx) return;

		const cursorPosition = getTransformedPoint(event.clientX, event.clientY);
		lastClicked = cursorPosition;

		if (
			cursorPosition.x > 50 &&
			cursorPosition.x <= 60 &&
			cursorPosition.y > 50 &&
			cursorPosition.y <= 60
		) {
			isClicked = !isClicked;
		}
	}
</script>

<div class="h-screen w-full">
	<div class="absolute">
		<p class="text-xl text-white">{v1}</p>
		<p class="text-xl text-white">{v2}</p>
		<p class="text-xl text-white">{v3?.x} {v3?.y}</p>
	</div>
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
