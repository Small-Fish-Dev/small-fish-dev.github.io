<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	export let href: string;
	export let icon: string;
	export let label: string;
	export let disabled: boolean = false;

	const isCurrent = function (): boolean {
		return $page.url.pathname.startsWith(href);
	};
</script>

<a
	{href}
	class="nav-button flex h-full items-center whitespace-nowrap px-7 py-1
		   font-poppins
		   text-[18px]
		   font-bold
		   transition-all
		   hover:scale-110
		   {isCurrent() ? 'bg-white text-blue' : 'text-white'}
		   {disabled ? 'pointer-events-none' : 'pointer-events-auto'}"
>
	<Icon {icon} class="mr-5" />
	<p>{label}</p>
</a>
