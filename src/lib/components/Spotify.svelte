<script lang="ts">
	import GeneralObserver from '$lib/components/GeneralObserver.svelte';

	export let src: string = '';
	export let width: string = '100%';
	export let height: string = '152px';
	export let disable_observer: boolean = false;
	export let iframe_styles: string = `
		border-radius: 0.8rem;
		height: ${height};
		width: ${width};
	`;
</script>

<GeneralObserver {disable_observer}>
	<iframe
		data-testid="spotify"
		title={`spotify-${src}`}
		class="spotify-sveltekit-embed"
		src={`https://open.spotify.com/embed/${src}`}
		frameBorder="0"
		allow="encrypted-media"
		style={iframe_styles}
	/>
</GeneralObserver>
