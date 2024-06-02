<script lang="ts">
	import { page } from '$app/stores';
	import { Members, type Member } from '$lib/types/Member';

	function getMemberFromSlug() {
		let slug = $page.params.slug;
		const decodedName = decodeURI(slug);

		let target = Members.find((m) => m.name.toLowerCase() === decodedName.toLocaleLowerCase());
		if (target == null) return false;

		initialMember = target;
		return true;
	}

	let initialMember: Member;
</script>

<svelte:head>
	{#if getMemberFromSlug()}
		<meta property="og:title" content="Small Fish - {initialMember.name}" />
		{#if initialMember.description}
			<meta property="og:description" content={initialMember.description} />
		{/if}
		<meta property="og:image" content="https://smallfi.sh/{initialMember.avatar}" />
	{/if}
</svelte:head>
