<script lang="ts">
	import { shrimplifyPath, type Member } from '$lib/types/Member';
	import { Projects } from '$lib/types/Project';
	import { swipeable } from '@react2svelte/swipeable';
	import type { SwipeEventData } from '@react2svelte/swipeable';
	import SocialButton from './SocialButton.svelte';
	import HoverIcon from './HoverIcon.svelte';

	export let member: Member;
	export let onClose: any | null;
	let className: string = '';
	export { className as class };

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};

	function swipeHandler(event: CustomEvent<SwipeEventData>) {
		if (event.detail.dir === 'Right') onClose();
	}
</script>

<div use:swipeable on:swiped={swipeHandler} class="w-full font-poppins text-sm {className}">
	<div
		class="pointer-events-auto max-h-full overflow-x-hidden overflow-y-scroll border-2 border-black bg-white shadow-md"
	>
		<!-- Close Button -->
		<div class="absolute z-20 m-2">
			<button
				class="aspect-square w-[24px] hover:scale-110 hover:invert"
				on:click={() => onClose()}
			>
				<img class="pixelate w-full bg-cover" src="/team/close_button.png" alt="close" />
			</button>
		</div>

		<!-- Avatar -->
		<div class="relative flex aspect-square w-full flex-col justify-between">
			{#if member.avatar}
				<img
					class="absolute aspect-square w-full bg-cover"
					src={member.avatar}
					alt="avatar"
					on:error={imageFallback}
				/>
			{:else}
				<img
					class="absolute aspect-square w-full bg-cover"
					src="/team/profiles/none.jpg"
					alt="avatar"
				/>
			{/if}

			<!-- Name -->
			<div class="mt-4 flex w-full justify-end">
				<h1
					class="z-10 bg-blue p-[5px] pl-[10px] pr-[10px] text-2xl font-medium text-white text-shadow-heavy"
				>
					{member.name}
				</h1>
			</div>

			<!-- Socials -->
			{#if member.socials}
				<div
					class="flex w-full flex-row flex-wrap-reverse justify-center gap-2 p-[10px] opacity-60 hover:opacity-90"
				>
					{#each member.socials.sort() as social}
						<SocialButton href={social} class="aspect-square w-[48px]" />
					{/each}
				</div>
			{/if}
		</div>

		<!-- About -->
		{#if member.description}
			<h1 class="w-full bg-blue p-[10px] font-medium text-white">ABOUT</h1>
			<div class="p-[10px]">
				<p>{member.description}</p>
			</div>
		{/if}

		<!-- Scientific Classification -->
		{#if member.classification}
			<h1 class="w-full bg-blue p-[10px] font-medium text-white">SCIENTIFIC CLASSIFICATION</h1>
			<div class="flex flex-col p-[10px]">
				{#each Object.keys(member.classification) as type}
					<div class="flex w-full flex-row justify-between pl-[25px] pr-[25px]">
						<p class="font-bold uppercase">{type}:</p>
						<a class="text-blue underline" href={member.classification[type][1]} target="_blank"
							>{member.classification[type][0]}</a
						>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Skills -->
		{#if member.roles}
			<h1 class="w-full bg-blue p-[10px] font-medium text-white">SUBFAMILIES</h1>
			<div class="flex flex-col gap-2 p-[10px]">
				{#each Object.keys(member.roles) as role}
					<div class="flex flex-row">
						<p class="mr-[50px] whitespace-nowrap">{role}</p>
						<div class="flex flex-grow flex-row flex-wrap-reverse justify-center gap-1">
							{#each member.roles[role].sort() as skill}
								<HoverIcon
									src={skill}
									class="pixelate aspect-square w-[32px] drop-shadow transition-all"
									text={shrimplifyPath(skill)}
								/>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Spotted in -->
		<h1 class="w-full bg-blue p-[10px] font-medium text-white">SPOTTED IN</h1>
		<div class="p-[10px]">
			<ul class="ml-5 flex list-disc flex-col justify-center">
				{#each Projects.filter((proj) => proj.contributors == null || proj.contributors?.find((m) => m.toLowerCase() == member.name.toLocaleLowerCase())).sort() as project}
					<li>{project.title}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.drop-shadow:hover {
		filter: drop-shadow(0px 2px rgba(0, 0, 0, 0.75));
		transform: translate(0, -2px);
	}

	.pixelate {
		image-rendering: pixelated;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar:disabled {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		background: white;
	}

	::-webkit-scrollbar-thumb {
		background-color: #2446f7;
	}
</style>
