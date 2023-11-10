<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data: PageData;
</script>

<div class="flex flex-col gap-10 mx-auto px-4 py-20">
	{#each data.posts as { slug, title, date }}
		<a href="{$page.url.pathname}/{slug}" class="transition-all hover:scale-110 font-poppins">
			<p class="text-4xl font-medium underline">{title}</p>
			<div class="flex items-center text-xl">
				<Icon icon="ic:baseline-calendar-today" class="mr-1" />
				{new Date(date).toLocaleString('en-us', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})}
			</div>
		</a>
	{/each}
</div>
