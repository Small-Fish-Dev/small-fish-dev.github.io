<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	export let href: string;
	let className: string = '';
	export { className as class };

	let url: URL;

	const icons: Record<string, string> = {
		none: '/socials/none.png',
		steamcommunity: '/socials/steam.png',
		twitter: '/socials/twitter.png',
		x: '/socials/twitter.png',
		github: '/socials/github.png',
		youtube: '/socials/youtube.png',
		artstation: '/socials/artstation.png',
		paypal: '/socials/paypal.png',
		itch: '/socials/itch.png'
	};

	function getHost(url: URL) {
		let split = url.hostname.split('.');
		return split[Math.max(split.length - 2, 0)];
	}

	function tryGetIcon(link: string) {
		try {
			url = new URL(link);
		} catch {
			console.log('Invalid link on SocialButton icon.');
			return icons['none'];
		}

		let domain = getHost(url).toLocaleLowerCase();
		let key = Object.keys(icons).find((key) => key == domain);
		if (key == null) return icons['none'];

		return icons[key];
	}
</script>

<a {href} class="{className} transition-all hover:scale-110 social" target="_blank">
	<div class="uppercase poppins text-sm" host={getHost(url)}>
		<img class="image w-full bg-cover" src={tryGetIcon(href)} alt="social" />
	</div>
</a>

<style>
	.image {
		image-rendering: pixelated;
		background-size: 100%;
		z-index: 5;
	}

	.social img:hover {
		filter: drop-shadow(0px 2px rgba(0, 0, 0, 0.5));
		transform: translate(0, -2px);
	}

	.social div:hover::before {
		transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
		opacity: 1;
	}

	.social div::before {
		transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
		position: absolute;
		opacity: 0;
		left: 50%;
		bottom: 100%;
		margin-bottom: 5px;
		transform: translateX(-50%);
		color: white;
		background: black;
		padding: 0px 4px;
		content: attr(host);
	}
</style>
