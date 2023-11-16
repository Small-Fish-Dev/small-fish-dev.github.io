<script lang="ts">
	import { Members, type Member } from '$lib/types/Member';
	import { Countries } from '$lib/types/MemberInfo';
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	let canvas: any;
	let mapImage: any;
	let ctx: any;

	let activePin: Pin | null;
	let pins: Pin[] = [];
	const pinSize = [10, 10];

	interface Pin {
		image: any;
		point: Point;
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
						pin.point.x - (pinSize[0] * 0.25) / 2,
						pin.point.y - (pinSize[0] * 0.25) / 2,
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

	function onPointerClick(event: PointerEvent) {
		const cursorPosition = getTransformedPoint(event.offsetX, event.offsetY);
		checkActive(cursorPosition);
		if (activePin) console.log('We clicked', activePin);
	}

	function onPointerMove(event: PointerEvent) {
		if (!ctx) return;
		const cursorPosition = getTransformedPoint(event.offsetX, event.offsetY);
		checkActive(cursorPosition);
	}

	function checkActive(cursorPosition: Point) {
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
			on:pointerdown={onPointerClick}
			on:pointermove={onPointerMove}
			use:panzoom={options}
			class="bg-[url('/team/pxgrid.png')] h-full w-full z-50"
		/>
	{/await}
</div>

<style>
	@keyframes scroll {
		0% {
			background-position-x: 0%;
			background-position-y: 0%;
		}
		100% {
			background-position-x: 100%;
			background-position-y: 100%;
		}
	}

	canvas {
		box-sizing: border-box;
		animation: scroll;
		animation-duration: 60s;
		animation-iteration-count: infinite;
	}
</style>
