<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import SocialButton from '$lib/components/SocialButton.svelte';

	let ready = false;
	onMount(() => (ready = true));

	const socials = [
		'https://twitter.com/SmallFishDev',
		'https://www.youtube.com/@SmallFishDev',
		'https://asset.party/fish',
		'https://discord.gg/rx2qqTqv36'
	];
</script>

<div>
	<header
		class="font-display relative flex h-[90vh] shrink-0 flex-col items-center justify-center gap-8 p-4 md:gap-12"
	>
		{#if ready}
			<div transition:fly={{ y: 100, duration: 1000 }} class="relative z-30 max-w-3xl">
				<img src="home/header-logo.png" alt="Small Fish Logo" />
				<div class="flex flex-wrap justify-center gap-2 p-4">
					<p class="text-center font-poppins text-2xl font-medium text-white">
						We make waves, not just games!
					</p>
				</div>
				<div class="flex justify-center gap-4">
					{#each socials as social}
						<SocialButton href={social} showHoverTop={false} class="w-12" />
					{/each}
				</div>
			</div>
		{/if}

		<div
			class="bg-pixel animate-scroll absolute z-20 h-full w-auto w-full max-w-none mix-blend-multiply"
		/>
		<div class="background-fade absolute z-10 h-full w-auto w-full max-w-none" />
		<video autoplay loop muted class="z-5 absolute h-full w-full object-cover"
			><source src="home/smallfishtrailer.mp4" type="video/mp4" /></video
		>
	</header>
	<body>
		<Card
			title={'We make awesome games'}
			description={"I can write any sort of random bullshit here and never be responsible for all the horrible jokes I could write here, because this text is just a placeholder. I am filling up some space to see if it's display correctly. Are you seriously reading this? There is no real benefit by reading this, you spend precious seconds of your life on reading this empty text."}
			imagePath="home/fish-school.png"
			imageLeft={true}
		/>
		<Card
			title={'We teach people!'}
			description={'Did you know that all viewers of our special project, fish school, are statistically smarter than 95% of all people on this planet? well, now you do. and now you can join us, if you are new into game development for s&box, then feel free to watch our vidjas!'}
			imagePath="home/fish-school.png"
		/>
	</body>
</div>

<style>
	.background-fade {
		background: linear-gradient(0deg, #0e1233 0%, transparent 50%);
	}
</style>
