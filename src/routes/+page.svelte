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
		class="relative flex h-[90vh] shrink-0 flex-col items-center justify-center gap-8 p-4 font-display md:gap-12"
	>
		{#if ready}
			<div transition:fly={{ y: 100, duration: 1000 }} class="relative z-30 max-w-3xl">
				<img src="home/header-logo.png" alt="Small Fish Logo" />
				<div class="flex justify-center flex-wrap gap-2 pt-4 pb-8">
					<p class="font-poppins text-2xl text-center text-white font-medium">
						We make waves, not just games!
					</p>
				</div>
				<div class="flex justify-center gap-4">
					{#each socials as social}
						<SocialButton href={social} class="w-12" />
					{/each}
				</div>
			</div>
		{/if}

		<div class="color-overlay absolute z-20 w-auto w-full h-full max-w-none" />
		<div class="background-fade absolute z-10 w-auto w-full h-full max-w-none" />
		<video autoplay loop muted class="absolute z-5 w-full h-full object-cover"
			><source src="home/bomb-survival.mp4" type="video/mp4" /></video
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
	.color-overlay {
		background: url(/home/pixel-overlay.png);
		background-size: 7px;
		mix-blend-mode: multiply;
		opacity: 1;
		animation: color-overlay-scroll 120s infinite linear;
	}

	.background-fade {
		background: linear-gradient(0deg, #0e1233 0%, transparent 50%);
	}

	@keyframes color-overlay-scroll {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 50% 50%;
		}
		100% {
			background-position: 100% 100%;
		}
	}
</style>
