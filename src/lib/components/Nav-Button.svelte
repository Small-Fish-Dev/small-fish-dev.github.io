<script lang="ts">
	import Icon from '@iconify/svelte';

	export let href: string;
	export let icon: string;
	export let label: string;
	export let disabled: boolean = false;
</script>

<a
	{href}
	class="nav-button flex items-center whitespace-nowrap px-2 py-1 font-poppins
		   text-xl
		   font-medium
		   text-white
		   transition-all
		   hover:scale-110
		   {disabled ? 'pointer-events-none opacity-75' : 'pointer-events-auto'}"
>
	<Icon {icon} class="mr-2" />
	<p>{label}</p>
</a>
