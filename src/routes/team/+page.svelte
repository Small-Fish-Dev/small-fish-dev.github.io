<script lang="ts">
	import { panzoom, type Options, type Point } from 'svelte-pan-zoom';

	const promise = new Promise<Options>((resolve) => {
		const image = new Image();

		image.onload = () =>
			resolve({
				width: image.width,
				height: image.height,
				render
			});
		image.src = 'team/pxmap.png';

		function render(ctx: CanvasRenderingContext2D, _t: number, _focus: Point) {
			ctx.drawImage(image, 0, 0);
			ctx.imageSmoothingEnabled = false;
		}
	});
</script>

<div class="h-screen w-full">
	{#await promise then options}
		<canvas use:panzoom={options} class="bg-[url('/team/pxgrid.png')] h-full w-full" />
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
