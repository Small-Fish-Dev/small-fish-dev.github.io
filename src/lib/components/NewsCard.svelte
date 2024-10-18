<script lang="ts">
	import { type NewsEntry } from '$lib/types/News';
	import SocialButton from './SocialButton.svelte';

	let className: string = '';

	export { className as class };
	export let post: NewsEntry;

	function formatTime(date: Date): string {
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
		href={post.url}
		class="relative aspect-video transition-all hover:scale-[102%] hover:cursor-pointer {className} flex"
		target="_blank"
	>
		<!-- Background -->
		<img src={post.thumbnail} class="absolute w-full h-full rounded-md" alt="thumbnail" />
		<div
			class="absolute w-full h-full bg-gradient-to-b from-transparentblack0 to-transparentblack1 rounded-md"
		/>

		<!-- Inner content -->
		<div class="relative flex w-full h-full p-5 justify-between flex-col">
			<div class="flex flex-row items-center gap-2">
				<SocialButton href={post.url} clickDisabled={true} class="w-12 aspect-square" />
				<div class="gap-2 h-full text-white items-center">
					<p class="font-bold text-2xl">{post.source}</p>
					<p class="text-1xl">{formatTime(post.date)} ago</p>
				</div>
			</div>

			<div class="flex flex-col">
				{#if post.package}
					<p class="font-bold text-1xl text-blue uppercase">
						{post.package}
					</p>
				{/if}

				<p class="font-bold text-2xl text-white mb-1">{post.title}</p>
				<p class="text-1xl text-white">{post.summary}</p>
			</div>
		</div>
	</a>
{/if}
