<script lang="ts">
	import { Members, type Member } from '$lib/types/Member';
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';

	let canvas: HTMLCanvasElement;
	let mapImage: HTMLImageElement;
	let ctx: CanvasRenderingContext2D;
	let member: Member | null;

	let pinGlow: HTMLImageElement;
	let activePin: Pin | null;
	let pins: Pin[] = [];
	const defaultPinSize = 10;

	interface Pin {
		image: HTMLImageElement;
		member: Member;
		isHovered: boolean;
		size: number;
	}

	const promise = new Promise<Options>((resolve) => {
		canvas;

		mapImage = new Image();
		mapImage.src = '/team/pxmap.png';

		pinGlow = new Image();
		pinGlow.src = '/team/flags/pin_hover.png';

		// Create pins.
		let count = 0;
		Members.forEach((member) => {
			let image = new Image();
			image.src = member.country;

			pins[count] = {
				image: image,
				member: member,
				isHovered: false,
				size: defaultPinSize
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
				let target = pin.isHovered ? 1.25 : 1;
				pin.size = lerp(pin.size, defaultPinSize * target, 0.3);

				let x = pin.member.point.x + defaultPinSize / 2 - pin.size / 2;
				let y = pin.member.point.y + defaultPinSize / 2 - pin.size / 2;

				// Show a little gold outline around the pin if selected.
				if (pin == activePin)
					context.drawImage(
						pinGlow,
						x - (pin.size * 0.1) / 2,
						y - (pin.size * 0.1) / 2,
						pin.size * 1.1,
						pin.size * 1.1
					);

				context.drawImage(pin.image, x, y, pin.size, pin.size);
			});

			// Force a render on each frame.
			return true;
		}

		var hash = window.location.hash;
		hash = hash.substring(1, hash.length);
		tryOpenCard(hash);
	});

	function tryOpenCard(name?: string) {
		if (name == null) {
			window.location.hash = '';
			member = null;

			return;
		}

		var target = Members.find((m) => m.name.toLowerCase() == name?.toLocaleLowerCase());
		if (target == null) return;

		console.log(`should open ${target.name}'s card!'`);
		window.location.hash = `#${target.name}`;
		member = target;
	}

	function getTransformedPoint(x: any, y: any): Point {
		const devicePixelRatio = window.devicePixelRatio || 1;
		const originalPoint = new DOMPoint(x * devicePixelRatio, y * devicePixelRatio);
		return ctx.getTransform().invertSelf().transformPoint(originalPoint);
	}

	function onPointerClick(_: PointerEvent) {
		activePin = null;
		for (let pin of pins) if (pin.isHovered) activePin = pin;

		if (activePin) {
			tryOpenCard(activePin.member.name);
			// Bit scuffed, we let the main rendering loop lerp this back to its proper value.
			activePin.size *= 0.75;
		} else {
			tryOpenCard();
		}
	}

	function onPointerMove(event: PointerEvent) {
		if (!ctx) return;
		const cursorPosition = getTransformedPoint(event.offsetX, event.offsetY);

		for (let pin of pins) {
			pin.isHovered = isHoveringPin(cursorPosition, pin);
		}
	}

	function isHoveringPin(cursorPosition: Point, pin: Pin) {
		return (
			cursorPosition.x > pin.member.point.x &&
			cursorPosition.x <= pin.member.point.x + defaultPinSize &&
			cursorPosition.y > pin.member.point.y &&
			cursorPosition.y <= pin.member.point.y + defaultPinSize
		);
	}

	function lerp(start: number, end: number, t: number): number {
		t = Math.max(0, Math.min(1, t));
		return start + t * (end - start);
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

	{#if member}
		<div class="absolute w-full h-full pointer-events-none right-[0px] top-[0px]">
			<h1>{member.name}</h1>
		</div>
	{/if}
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
