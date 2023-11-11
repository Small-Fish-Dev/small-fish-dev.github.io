<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;
</script>

<article class="font-poppins prose prose-h1:m-0 lg:prose-xl container mx-auto px-4 py-40">
	<h1>{data.frontmatter.title}</h1>
	<div class="flex items-center text-xl">
		<Icon icon="ic:baseline-calendar-today" class="mr-1" />
		{new Date(data.frontmatter.date).toLocaleString('en-us', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})}
	</div>
	<svelte:component this={component} />
</article>
