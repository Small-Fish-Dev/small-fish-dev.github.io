<script lang="ts">
	import { Members, type Member } from '$lib/types/Member';
	import { panzoom, type Options, type Point, DEFAULT_PIN_SIZE } from '$lib/map/PanZoom';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import MemberCard from '$lib/components/MemberCard.svelte';
	import { onDestroy, onMount } from 'svelte';

	let paths = [
		'/team/flags/pin_hover0.png',
		'/team/flags/pin_hover1.png',
		'/team/flags/pin_hover2.png',
		'/team/flags/pin_hover3.png',
		'/team/flags/pin_hover4.png'
	];
	let images: HTMLImageElement[] = [];
	let currentIndex = 0;
	let timer = 0;

	let ready = false;
	onMount(() => {
		ready = true;

		paths.forEach((path) => {
			let img = new Image();
			img.src = path;
			images[images.length] = img;
		});

		timer = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, 60);
	});

	onDestroy(() => {
		clearInterval(timer);
	});

	let canvas: HTMLCanvasElement;
	let mapImage: HTMLImageElement;
	let ctx: CanvasRenderingContext2D;
	let member: Member | null;

	let activePin: Pin | null;
	let pins: Pin[] = [];

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

		// Create pins.
		let count = 0;
		Members.forEach((member) => {
			let image = new Image();
			image.src = member.country;

			pins[count] = {
				image: image,
				member: member,
				isHovered: false,
				size: DEFAULT_PIN_SIZE
			};

			count++;
		});

		var hash = window.location.hash;
		hash = hash.substring(1, hash.length);
		const member = tryOpenCard(hash);
		const startingPos = member ? { x: member.point.x, y: member.point.y } : undefined;

		let target = pins.find((x) => x.member?.name == member?.name);
		if (target) {
			activePin = target;
		}

		mapImage.onload = () =>
			resolve({
				width: mapImage.width,
				height: mapImage.height,
				render,
				friction: 0.95,
				startingPosition: startingPos
			});

		function render(context: CanvasRenderingContext2D, _t: number, _focus: Point) {
			ctx = context;
			context.imageSmoothingEnabled = false;
			context.drawImage(mapImage, 0, 0);

			pins.forEach((pin) => {
				let target = pin.isHovered ? 1.25 : 1;
				pin.size = lerp(pin.size, DEFAULT_PIN_SIZE * target, 0.3);

				let x = pin.member.point.x + DEFAULT_PIN_SIZE / 2 - pin.size / 2;
				let y = pin.member.point.y + DEFAULT_PIN_SIZE / 2 - pin.size / 2;

				// Show a little gold outline around the pin if selected.
				if (pin == activePin) {
					context.drawImage(
						images[currentIndex],
						x - (pin.size * 0.25) / 2,
						y - (pin.size * 0.25) / 2,
						pin.size * 1.25,
						pin.size * 1.25
					);
				}

				context.drawImage(pin.image, x, y, pin.size, pin.size);
			});
		}
	});

	function tryOpenCard(name?: string) {
		if (name == null) {
			window.location.hash = '';
			member = null;
			activePin = null;
			return undefined;
		}

		const decodedName = decodeURI(name);
		let target = Members.find((m) => m.name.toLowerCase() === decodedName.toLocaleLowerCase());
		if (target == null) return undefined;

		window.location.hash = `#${target.name}`;
		member = target;
		return member;
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

		if (hoveredPin) canvas.classList.add('pointer');
		else canvas.classList.remove('pointer');

		return hoveredPin;
	}

	function isHoveringPin(cursorPosition: Point, pin: Pin) {
		return (
			cursorPosition.x > pin.member.point.x &&
			cursorPosition.x <= pin.member.point.x + DEFAULT_PIN_SIZE &&
			cursorPosition.y > pin.member.point.y &&
			cursorPosition.y <= pin.member.point.y + DEFAULT_PIN_SIZE
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
				transition:fly={{ duration: 900, easing: quintOut, x: -100 }}
				use:panzoom={options}
				class="h-full w-full z-50"
			/>
		{/await}
	</div>

	<!-- This is a bit shit, feel free to improve! -->
	{#if member && ready}
		<div
			in:fly={{ duration: 300, x: '100%', opacity: 0.5, easing: quintOut }}
			out:fly={{ duration: 300, x: '100%', opacity: 0.5 }}
			class="absolute flex h-full pointer-events-none z-20 w-[320px] max-w-[450px] md:w-96 top-0 right-0 p-2 pt-28 md:pt-32 pb-4 pr-4 sm:pr-8 sm:pb-8"
		>
			<MemberCard {member} onClose={() => tryOpenCard()} />
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

	:global(.pointer) {
		cursor: pointer !important;
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
