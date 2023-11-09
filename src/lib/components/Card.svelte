<script lang="ts">
	export let title: string;
	export let description: string;
	export let imagePath: string = '';
	export let imageLeft: boolean = false;
</script>

<section class="font-poppins">
	<div
		class="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center"
		class:md:flex-row-reverse={imageLeft}
	>
		<div
			class="flex lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center"
		>
			<h1 class="shadow-md font-medium text-white bg-blue p-4 sm:text-4xl text-3xl mb-4">
				{title}
			</h1>
			<p class="text-xl mb-8 leading-relaxed">{description}</p>
		</div>
		{#if imagePath}
			<div class=" lg:p-12 md:p-8" />
			<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
				<img class="object-cover object-center rounded" alt="hero" src={imagePath} />
			</div>
		{/if}
	</div>
</section>

<style>
	img {
		transform: rotate3d(0, 1, 0, 15deg);
	}
</style>
