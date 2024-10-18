<script lang="ts">
	import { type NewsPost } from '$lib/types/Backend';
	import SocialButton from './SocialButton.svelte';

	let className: string = '';

	export { className as class };
	export let post: NewsPost | undefined;

	function formatTime(dateString: string): string {
		const date = new Date(dateString);
		const seconds = Math.floor(((new Date() as any) - (date as any)) / 1000);
		let interval = seconds / 31536000;

		if (interval > 1) return Math.floor(interval) + ' year(s)';
		interval = seconds / 2592000;

		if (interval > 1) return Math.floor(interval) + ' month(s)';
		interval = seconds / 86400;

		if (interval > 1) return Math.floor(interval) + ' day(s)';
		interval = seconds / 3600;

		if (interval > 1) return Math.floor(interval) + ' hour(s)';
		interval = seconds / 60;

		if (interval > 1) return Math.floor(interval) + ' minute(s)';

		return Math.floor(seconds) + ' second(s)';
	}
</script>

{#if post}
	<a
		href={`https://sbox.game${post.Url}`}
		class="relative aspect-video transition-all hover:scale-[102%] hover:cursor-pointer {className} flex"
		target="_blank"
	>
		<!-- Background -->
		<img src={post.Media} class="absolute w-full h-full rounded-md" />
		<div
			class="absolute w-full h-full bg-gradient-to-b from-transparentblack0 to-transparentblack1 rounded-md"
		/>

		<!-- Inner content -->
		<div class="relative flex w-full h-full p-5 justify-between flex-col">
			<div class="flex flex-row gap-2">
				<SocialButton href="https://sbox.game/" clickDisabled={true} class="h-full aspect-square" />
				<div class="gap-2 h-full text-white items-center">
					<p class="font-bold text-2xl">sbox.game</p>
					<p class="text-1xl">{formatTime(post.Created)} ago</p>
				</div>
			</div>

			<div class="flex flex-col">
				<p class="font-bold text-1xl text-blue uppercase">
					{post.Package.substring(5)}
				</p>
				<p class="font-bold text-2xl text-white mb-1">{post.Title}</p>
				<p class="text-1xl text-white">{post.Summary}</p>
			</div>
		</div>
	</a>
{/if}
