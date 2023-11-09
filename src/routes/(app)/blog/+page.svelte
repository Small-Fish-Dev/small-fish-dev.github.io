<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.posts as { slug, title, author, description, date }}
	<div class="mb-20">
		<p>{slug} {title}</p>
		<p>{author} {date}</p>
		<p>{description} {slug}</p>
	</div>
{/each}
