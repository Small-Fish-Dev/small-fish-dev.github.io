<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="scroll flex h-screen w-full flex-col items-center justify-center bg-[url('/error/pxgrid_red.png')] font-poppins text-4xl font-bold text-white"
>
	<img class="pixelated w-[300px] bg-cover" src="/error/pxerror.png" alt="error" />

	{#if $page.status == 404}
		<p>sorry, page not found!</p>
	{:else}
		<p>{$page.status}: {$page.error?.message}</p>
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

	.scroll {
		animation: scroll 120s infinite linear;
	}

	p {
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	}

	.pixelated {
		image-rendering: pixelated;
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
	}
</style>
