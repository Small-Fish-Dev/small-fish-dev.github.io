<script lang="ts">
	import type { Member } from '$lib/types/Member';
	import { Projects } from '$lib/types/Project';
	import SocialButton from './SocialButton.svelte';

	export let member: Member;
	export let onClose: any | null;
	let className: string = '';
	export { className as class };
</script>

<div class="text-sm font-poppins {className}">
	<div class="bg-white w-full h-full box overflow-y-scroll">
		<!-- Close Button -->
		<div class="absolute z-20 m-[10px]">
			<button
				class="w-[24px] aspect-square hover:invert hover:scale-110"
				on:click={() => onClose()}
			>
				<img class="bg-cover w-full pixelate" src="/team/close_button.png" alt="close" />
			</button>
		</div>

		<!-- Avatar -->
		<div class="relative flex flex-col justify-between w-full aspect-square">
			{#if member.avatar}
				<img class="bg-cover absolute w-full aspect-square" src={member.avatar} alt="avatar" />
			{/if}

			<!-- Name -->
			<div class="flex top-[0px] w-full justify-center">
				<h1 class="bg-black w-fit p-[5px] pr-[10px] pl-[10px] text-white font-medium text-3xl z-10">
					{member.name}
				</h1>
			</div>

			<!-- Socials -->
			{#if member.socials}
				<div
					class="w-full flex p-[10px] flex-row gap-2 justify-center flex-wrap-reverse opacity-60 hover:opacity-90"
				>
					{#each member.socials as social}
						<SocialButton href={social} class="w-[48px] aspect-square" />
					{/each}
				</div>
			{/if}
		</div>

		<!-- About -->
		{#if member.description}
			<h1 class="w-full p-[10px] font-medium bg-blue text-white">ABOUT</h1>
			<div class="p-[10px]">
				<p>{member.description}</p>
			</div>
		{/if}

		<!-- Scientific Classification -->
		{#if member.classification}
			<h1 class="w-full p-[10px] font-medium bg-blue text-white">SCIENTIFIC CLASSIFICATION</h1>
			<div class="p-[10px] flex flex-col">
				{#each Object.keys(member.classification) as type}
					<div class="flex flex-row w-full justify-between pr-[25px] pl-[25px]">
						<p class="font-bold uppercase">{type}:</p>
						<a class="underline text-blue" href={member.classification[type][1]} target="_blank"
							>{member.classification[type][0]}</a
						>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Skills -->
		{#if member.roles}
			<h1 class="w-full p-[10px] font-medium bg-blue text-white">SUBFAMILIES</h1>
			<div class="p-[10px] flex flex-col gap-2">
				{#each Object.keys(member.roles) as role}
					<div class="flex flex-row">
						<p class="mr-[50px] whitespace-nowrap">{role}</p>
						<div class="flex flex-row gap-1 flex-wrap-reverse justify-center flex-grow">
							{#each member.roles[role] as skill}
								<img
									src={skill}
									class="transition-all w-[32px] aspect-square pixelate drop-shadow"
									alt="skill"
								/>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Spotted in -->
		<!-- todo @ceitine: filter by contributors!! -->
		<h1 class="w-full p-[10px] font-medium bg-blue text-white">SPOTTED IN</h1>
		<div class="p-[10px]">
			<ul class="list-disc">
				{#each Projects as project}
					<li><b>*</b> {project.title}</li>
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

	.box {
		box-shadow:
			0px 0px 8px black,
			8px 8px 0px black;
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
