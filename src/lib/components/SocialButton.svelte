<script lang="ts">
	import HoverIcon from './HoverIcon.svelte';

	export let href: string;
	export let showHoverTop: boolean = true;
	let className: string = '';
	export { className as class };

	let url: URL;
	let host: string;

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
			host = getHost(url);
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

<a {href} class="{className} transition-all hover:scale-110" target="_blank">
	<HoverIcon
		src={tryGetIcon(href)}
		showTop={showHoverTop}
		class="transition-all uppercase poppins text-sm"
		text={host}
	/>
</a>

<style>
</style>
