<script lang="ts">
	export let imagePath: string;
	export let description: string;
	export let buttonText: string;
	export let buttonLink: string;
	export let assetPartyLink: string = '';
</script>

<section class="flex flex-col px-2 text-center font-poppins text-white text-shadow">
	<img src={imagePath} alt={imagePath} class="w-[500px] self-center hover:animate-wiggle" />
	<div class="flex justify-center">
		<p class="text-lg font-light md:h-[50px] md:w-[500px]">{description}</p>
	</div>
	<a
		href={buttonLink}
		class="m-8 rounded-lg bg-gradient-to-r from-blue to-lightblue p-4 text-xl font-bold drop-shadow-md transition-all hover:-translate-y-2 hover:drop-shadow-hover md:p-6"
	>
		{buttonText}
	</a>
	{#if assetPartyLink}
		<p>TODO</p>
	{/if}
</section>
