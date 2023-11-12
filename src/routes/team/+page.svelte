<script lang="ts">
	import { onMount } from 'svelte';
	import { panzoom, type Options, type Point } from 'svelte-pan-zoom';

	let canvas: any;
	let mapImage: any;
	let pin: any;

	const promise = new Promise<Options>((resolve) => {
		mapImage = new Image();
		mapImage.src = 'team/pxmap.png';

		pin = new Image();
		pin.src = 'team/pin.png';

		mapImage.onload = () =>
			resolve({
				width: mapImage.width,
				height: mapImage.height,
				render,
				friction: 0.95
			});

		function render(context: CanvasRenderingContext2D, _t: number, _focus: Point) {
			context.imageSmoothingEnabled = false;
			context.drawImage(mapImage, 0, 0);
			context.drawImage(pin, 75, 75);
		}
	});

	function onPointerClick(event: PointerEvent) {}
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
		user-select: none;
		touch-action: none;
		overscroll-behavior: none;
		-webkit-user-select: none;
		-webkit-touch-callout: none;
	}
</style>
