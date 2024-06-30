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
		'steamcommunity.com': '/socials/steam.png',
		'twitter.com': '/socials/twitter.png',
		'x.com': '/socials/twitter.png',
		'github.com': '/socials/github.png',
		'youtube.com': '/socials/youtube.png',
		'artstation.com': '/socials/artstation.png',
		'paypal.com': '/socials/paypal.png',
		'paypal.me': '/socials/paypal.png',
		'itch.io': '/socials/itch.png',
		'discord.gg': '/socials/discord.png',
		'sbox.game': '/socials/sbox_game.png',
		'soundcloud.com': '/socials/soundcloud.png',
		email: '/socials/gmail.png'
	};

	function getHost(url: URL) {
		const isEmail = url.href.includes('mailto:');
		const hostname = isEmail ? 'email' : url.hostname;
		const split = hostname.split('.');
		const name = split[Math.max(split.length - 2, 0)];
		if (split.length > 1) return `${name}.${split[split.length - 1]}`;

		return name;
	}

	function tryGetIcon(link: string) {
		try {
			url = new URL(link);
			host = getHost(url).replace(/\.com$/, '');
		} catch {
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
		class="font-poppins text-sm uppercase transition-all"
		text={host}
	/>
</a>

<style>
</style>
