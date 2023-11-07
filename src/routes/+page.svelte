<script lang="ts">
	interface Location {
		label: String;
		icon: String;
		href: String;
	}

	const locations: Location[] = [{ label: 'Hey', icon: 'Hey', href: 'Hey' }];
</script>

<div>
	<header
		class="relative flex h-[90vh] shrink-0 flex-col items-center justify-center gap-8 p-4 font-display md:gap-12"
	>
		<div class="relative z-30 max-w-3xl">
			<img src="home/header-logo.png" alt="Small Fish Logo" />
			<div></div>
		</div>

		<div class="color-overlay absolute z-20 w-auto w-full h-full max-w-none" />
		<div class="background-fade absolute z-10 w-auto w-full h-full max-w-none" />
		<video autoplay loop muted class="absolute z-5 w-full h-full object-cover"
			><source src="home/bomb-survival.mp4" type="video/mp4" /></video
		>
	</header>
</div>

<style>
	.color-overlay {
		background: url(/home/dumb-css-hack.png);
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
