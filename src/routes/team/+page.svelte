<script lang="ts">
	import { Members, type Member } from '$lib/types/Member';
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';
	import { fly, scale } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import MemberCard from '$lib/components/MemberCard.svelte';

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

		let target = pins.find((x) => x.member?.name == hash);
		if (target) activePin = target;
	});

	function tryOpenCard(name?: string) {
		if (name == null) {
			window.location.hash = '';
			member = null;
			activePin = null;

			return;
		}

		let target = Members.find((m) => m.name.toLowerCase() == name?.toLocaleLowerCase());
		if (target == null) return;

		window.location.hash = `#${target.name}`;
		member = target;
	}

	function onPointerClick(event: PointerEvent) {
		// If not left click, or not using a touch screen bail out.
		if (event.button !== 0 && event.pointerType !== 'touch') return;

		let hovered = getHoveringPin(getTransformedPoint(event.offsetX, event.offsetY));
		activePin =
			!hovered && activePin
				? activePin
				: getHoveringPin(getTransformedPoint(event.offsetX, event.offsetY));

		if (activePin && hovered) {
			tryOpenCard(activePin.member.name);
			// Bit scuffed, we let the main rendering loop lerp this back to its proper value.
			activePin.size *= 0.75;
		}
	}

	function onPointerMove(event: PointerEvent) {
		getHoveringPin(getTransformedPoint(event.offsetX, event.offsetY));
	}

	function getHoveringPin(point: Point) {
		let hoveredPin = null;

		for (let pin of pins) {
			pin.isHovered = isHoveringPin(point, pin);
			if (pin.isHovered) hoveredPin = pin;
		}

		return hoveredPin;
	}

	function isHoveringPin(cursorPosition: Point, pin: Pin) {
		return (
			cursorPosition.x > pin.member.point.x &&
			cursorPosition.x <= pin.member.point.x + defaultPinSize &&
			cursorPosition.y > pin.member.point.y &&
			cursorPosition.y <= pin.member.point.y + defaultPinSize
		);
	}

	function getTransformedPoint(x: any, y: any): Point {
		if (!ctx) return { x: 0, y: 0 };
		const devicePixelRatio = window.devicePixelRatio || 1;
		const originalPoint = new DOMPoint(x * devicePixelRatio, y * devicePixelRatio);
		return ctx.getTransform().invertSelf().transformPoint(originalPoint);
	}

	function lerp(start: number, end: number, t: number): number {
		t = Math.max(0, Math.min(1, t));
		return start + t * (end - start);
	}
</script>

<div class="h-screen w-full overflow-hidden">
	<div class="bg-[url('/team/pxgrid.png')] h-full w-full scroll">
		{#await promise then options}
			<canvas
				bind:this={canvas}
				on:pointerdown={onPointerClick}
				on:pointermove={onPointerMove}
				in:scale={{ duration: 1500, easing: quadInOut, opacity: 0.5 }}
				use:panzoom={options}
				class="h-full w-full z-50"
			/>
		{/await}
	</div>

	<!-- This is a bit shit, feel free to improve! -->
	{#if member}
		<div
			in:fly={{ duration: 300, x: '100%', opacity: 0.5, easing: quadInOut }}
			out:fly={{ duration: 300, x: '100%', opacity: 0.5 }}
			class="absolute z-50 top-[70px] right-[25px] w-[375px] h-full p-[25px] pr-[0px] pb-[95px]"
		>
			<MemberCard class="w-full h-full" {member} onClose={() => tryOpenCard()} />
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

	:global(html, body) {
		overflow-x: hidden;
	}

	canvas {
		box-sizing: border-box;
	}

	.scroll {
		animation: scroll;
		animation-duration: 60s;
		animation-iteration-count: infinite;
	}
</style>
