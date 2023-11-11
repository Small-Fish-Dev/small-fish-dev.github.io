<script lang="ts">
	export let left = 100;
	export let top = 100;
	export let zoom = 700;

	let moving = false;
	let canScroll = false;

	function onMouseClick() {
		moving = true;
	}

	function onMouseRelease() {
		moving = false;
	}

	function onMouseScroll(e: WheelEvent) {
		zoom += e.deltaY;
	}

	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onMouseEnter() {
		canScroll = true;
	}

	function onMouseLeave() {
		canScroll = true;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	on:mousedown={onMouseClick}
	style="
    left: {left}px; top: {top}px;
    width: {zoom}px !important;
    heigth: {zoom}px !important;
    "
	class="draggable"
>
	<slot />
</section>

<svelte:window on:wheel={onMouseScroll} on:mouseup={onMouseRelease} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		position: absolute;
	}
</style>
