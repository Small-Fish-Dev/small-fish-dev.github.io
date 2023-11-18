<script lang="ts">
	let className: string = '';
	export { className as class };
	export let src: string;
	export let text: string;
	export let showTop: boolean = true;
</script>

<div
	class="{className} {showTop
		? 'top'
		: 'bottom'} uppercase poppins text-sm transition-all hover:scale-110 icon"
	{text}
>
	<img class="image w-full bg-cover" {src} alt={text} />
</div>

<style>
	.image {
		image-rendering: pixelated;
	}

	.icon {
		z-index: 1;
	}

	.icon:hover {
		filter: drop-shadow(0px 2px rgba(0, 0, 0, 0.5));
		transform: translate(0, -2px);
		z-index: 99;
	}

	.icon:hover::before {
		transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
		opacity: 1;
		filter: none;
	}

	.icon::before {
		position: absolute;
		pointer-events: none;
		transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
		opacity: 0;
		left: 50%;
		margin-top: 5px;
		margin-bottom: 5px;
		transform: translateX(-50%);
		color: white;
		background: black;
		padding: 0px 4px;
		content: attr(text);
		filter: none;
	}

	.top.icon::before {
		bottom: 100% !important;
	}

	.bottom.icon::before {
		top: 100% !important;
	}
</style>
