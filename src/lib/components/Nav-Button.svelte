<script lang="ts">
	import Icon from '@iconify/svelte';

	export let href: string;
	export let icon: string;
	export let label: string;
	export let disabled: boolean;
</script>

<a
	{href}
	class="nav-button flex items-center font-poppins font-medium text-white text-3xl px-4 py-2
           hover:text-blue
           hover:bg-white
           hover:scale-105
           transition-all
		   whitespace-nowrap
		   {disabled ? 'opacity-50 pointer-events-none' : ''}"
>
	<Icon {icon} class="text-4xl mr-2" />
	<p>{label}</p>
</a>

<style>
</style>
