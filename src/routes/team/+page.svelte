<script lang="ts">
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	let canvas: any;
	let mapImage: any;
	let ctx: any;

	let activePin: Pin | null;
	let pins: Pin[] = [];
	const pinWidth = 10;
	const pinHeight = 10;

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

		for (let i = 0; i < 10; ++i) {
			let newPin = new Image();
			newPin.src = 'team/pin.png';
			pins.push({
				image: newPin,
				point: { x: i * 15, y: i * 15 },
				isActive: false,
				isHovered: false
			});
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

			pins.forEach((pin) => {
				if (pin.isHovered) {
					context.drawImage(pin.image, pin.point.x, pin.point.y, pinWidth * 1.25, pinHeight * 1.25);
				} else {
					context.drawImage(pin.image, pin.point.x, pin.point.y, pinWidth, pinHeight);
				}
			});
		}
	});

	function getTransformedPoint(x: any, y: any): Point {
		const devicePixelRatio = window.devicePixelRatio || 1;
		const originalPoint = new DOMPoint(x * devicePixelRatio, y * devicePixelRatio);
		return ctx.getTransform().invertSelf().transformPoint(originalPoint);
	}

	function onPointerClick(event: PointerEvent) {
		if (activePin) console.log('We clicked', activePin);
	}

	function onPointerMove(event: PointerEvent) {
		if (!ctx) return;
		const cursorPosition = getTransformedPoint(event.offsetX, event.offsetY);

		for (let pin of pins) {
			pin.isHovered = isHoveringPin(cursorPosition, pin);
			if (pin.isHovered) {
				activePin = pin;
				break; // We can leave early once we found a pin.
			}
			activePin = null;
		}
	}

	function isHoveringPin(cursorPosition: Point, pin: Pin) {
		return (
			cursorPosition.x > pin.point.x &&
			cursorPosition.x <= pin.point.x + pinWidth &&
			cursorPosition.y > pin.point.y &&
			cursorPosition.y <= pin.point.y + pinHeight
		);
	}
</script>

<div class="h-screen w-full">
	{#await promise then options}
		<canvas
			bind:this={canvas}
			on:pointerdown={onPointerClick}
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
