<script lang="ts">
	import { Members, type Member } from '$lib/types/Member';
	import { Countries } from '$lib/types/MemberInfo';
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	const flagSize = [10, 10];

	let canvas: any;
	let mapImage: any;
	let pin: any;
	let ctx: any;
	let flags: any;

	let isClicked = false;

	const promise = new Promise<Options>((resolve) => {
		canvas;

		mapImage = new Image();
		mapImage.src = 'team/pxmap.png';

		flags = [];
		for (const key in Countries) {
			const value = Countries[key];
			let image = new Image();
			image.src = value;
			flags[value] = image;
		}

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

			Members.forEach((member) => {
				context.drawImage(
					flags[member.country],
					member.pin[0],
					member.pin[1],
					flagSize[0],
					flagSize[1]
				);
			});
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

		let hit = false;
		Members.forEach((member) => {
			if (
				x < member.pin[0] ||
				y < member.pin[1] ||
				x > member.pin[0] + flagSize[0] ||
				y > member.pin[1] + flagSize[1]
			)
				return;

			console.log(`Clicked on ${member.name}!`);
			hit = true;
		});

		// We didn't click on anyone!!
		if (!hit) console.log(`Didn't click on anyone!`);
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
