<script lang="ts">
	import Draggable from '$lib/components/Draggable.svelte';
</script>

<div class="bg-[url('/team/pxgrid.png')] h-screen">
	<Draggable>
		<div class="map" />
	</Draggable>
</div>

<style>
	.map {
		image-rendering: pixelated;
		background-image: url('/team/pxmap.png');
		height: 500px;
		width: 500px;
	}
</style>
