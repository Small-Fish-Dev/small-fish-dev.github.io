<script lang="ts">
	import { Members, type Member } from '$lib/types/Member';
	import { Countries } from '$lib/types/MemberInfo';
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	let canvas: any;
	let mapImage: any;
	let pin: any;
	let ctx: any;

	let pins: Pin[] = [];
	const pinSize = [10, 10];

	interface Pin {
		image: any;
		point: Point;
		isActive: boolean;
		isHovered: boolean;
	}

	const promise = new Promise<Options>((resolve) => {
		canvas;

		mapImage = new Image();
		mapImage.src = 'team/pxmap.png';

		// Create pins.
		let count = 0;
		Members.forEach((member) => {
			let image = new Image();
			image.src = member.country;

			pins[count] = {
				image: image,
				point: member.pin,
				isActive: false,
				isHovered: false
			};

			count++;
		});

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

			pins.forEach((pin) => {
				if (pin.isHovered) {
					context.drawImage(
						pin.image,
						pin.point.x,
						pin.point.y,
						pinSize[0] * 1.25,
						pinSize[1] * 1.25
					);
				} else {
					context.drawImage(pin.image, pin.point.x, pin.point.y, pinSize[0], pinSize[1]);
				}
			});
		}
	});

	function getTransformedPoint(x: any, y: any): Point {
		const devicePixelRatio = window.devicePixelRatio || 1;
		const originalPoint = new DOMPoint(x * devicePixelRatio, y * devicePixelRatio);
		return ctx.getTransform().invertSelf().transformPoint(originalPoint);
	}

	function onPointerMove(event: PointerEvent) {
		if (!ctx) return;
		const cursorPosition = getTransformedPoint(event.offsetX, event.offsetY);

		pins.forEach((pin) => {
			pin.isHovered = isHoveringPin(cursorPosition, pin);
		});
	}

	function isHoveringPin(cursorPosition: Point, pin: Pin) {
		return (
			cursorPosition.x > pin.point.x &&
			cursorPosition.x <= pin.point.x + pinSize[0] &&
			cursorPosition.y > pin.point.y &&
			cursorPosition.y <= pin.point.y + pinSize[1]
		);
	}
</script>

<div class="h-screen w-full">
	{#await promise then options}
		<canvas
			bind:this={canvas}
			on:pointermove={onPointerMove}
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
