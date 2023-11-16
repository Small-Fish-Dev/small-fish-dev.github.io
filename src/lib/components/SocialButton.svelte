<script lang="ts">
	export let href: string;
	let className: string = '';
	export { className as class };

	const icons: Record<string, string> = {
		none: '',
		'steamcommunity.com': '/socials/steam.png',
		'twitter.com': '/socials/twitter.png',
		'x.com': '/socials/twitter.png',
		'github.com': '/socials/github.png',
		'youtube.com': '/socials/youtube.png',
		'artstation.com': '/socials/artstation.png',
		'paypal.com': '/socials/paypal.png',
		'paypal.me': '/socials/paypal.png'
	};

	function tryGetIcon(link: string) {
		let url;
		try {
			url = new URL(link);
		} catch {
			console.log('Invalid link on SocialButton icon.');
			return icons['none'];
		}

		let domain = url.hostname.toLocaleLowerCase();
		let key = Object.keys(icons).find((key) => key == domain);
		if (key == null) return icons['none'];

		return icons[key];
	}
</script>

<a {href} target="_blank" class="{className} transition-all hover:scale-110">
	<img class="image w-full bg-cover" src={tryGetIcon(href)} alt="social" />
</a>

<style>
	.image {
		image-rendering: pixelated;
	}
</style>
