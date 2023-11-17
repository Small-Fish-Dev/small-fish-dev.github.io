<script lang="ts">
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { Members, type Member } from '$lib/types/Member';
	import { panzoom, type Options, type Point } from '$lib/map/PanZoom';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

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
	{#await promise then options}
		<canvas
			bind:this={canvas}
			on:pointerdown={onPointerClick}
			on:pointermove={onPointerMove}
			use:panzoom={options}
			class="bg-[url('/team/pxgrid.png')] h-full w-full z-50"
		/>
	{/await}

	<!-- This is a bit shit, feel free to improve! -->
	{#if member}
		<div
			in:fly={{ duration: 300, x: '100%', opacity: 0.5, easing: quadInOut }}
			out:fly={{ duration: 300, x: '100%', opacity: 0.5 }}
			class="absolute z-50 top-[70px] right-[25px] w-[375px] h-full p-[25px] pr-[0px] pb-[95px] font-poppins"
		>
			<div class="bg-white w-full h-full box overflow-y-scroll">
				<!-- Close Button -->
				<div class="absolute z-20 m-[10px]">
					<button
						class="w-[24px] aspect-square hover:invert hover:scale-110"
						on:click={() => tryOpenCard()}
					>
						<img class="bg-cover w-full pixelate" src="/team/close_button.png" alt="close" />
					</button>
				</div>

				<!-- Avatar -->
				<div class="relative flex flex-col justify-between w-full aspect-square">
					{#if member.avatar}
						<img class="bg-cover absolute w-full aspect-square" src={member.avatar} alt="avatar" />
					{/if}

					<!-- Name -->
					<div class="flex top-[0px] w-full justify-center">
						<h1
							class="bg-black w-fit p-[5px] pr-[10px] pl-[10px] text-white font-medium text-3xl z-10"
						>
							{member.name}
						</h1>
					</div>

					<!-- Socials -->
					{#if member.socials}
						<div
							class="w-full flex p-[10px] flex-row gap-2 justify-center flex-wrap-reverse opacity-60 hover:opacity-90"
						>
							{#each member.socials as social}
								<SocialButton href={social} class="w-[48px] aspect-square" />
							{/each}
						</div>
					{/if}
				</div>

				<!-- About -->
				{#if member.description}
					<h1 class="w-full p-[10px] text-sm font-medium bg-blue text-white">ABOUT</h1>
					<div class="p-[10px] text-sm">
						<p>{member.description}</p>
					</div>
				{/if}

				<!-- Skills -->
				{#if member.skills}
					<h1 class="w-full p-[10px] text-sm font-medium bg-blue text-white">SUBFAMILIES</h1>
					<div class="p-[10px] flex flex-row justify-center gap-2">
						{#each member.skills as skill}
							<img
								src={skill}
								class="transition-all w-[32px] aspect-square pixelate drop-shadow"
								alt="skill"
							/>
						{/each}
					</div>
				{/if}

				<!-- Scientific Classification -->
				<h1 class="w-full p-[10px] text-sm font-medium bg-blue text-white">
					SCIENTIFIC CLASSIFICATION
				</h1>
				<div class="p-[10px]">
					<p>WIP</p>
				</div>
			</div>
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
		animation: scroll;
		animation-duration: 60s;
		animation-iteration-count: infinite;
	}

	.drop-shadow:hover {
		filter: drop-shadow(0px 2px rgba(0, 0, 0, 0.75));
		transform: translate(0, -2px);
	}

	.box {
		box-shadow:
			0px 0px 8px black,
			8px 8px 0px black;
	}

	.pixelate {
		image-rendering: pixelated;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: white;
	}

	::-webkit-scrollbar-thumb {
		background-color: #2446f7;
	}
</style>
