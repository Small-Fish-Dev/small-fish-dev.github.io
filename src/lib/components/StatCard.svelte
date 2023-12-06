<script lang="ts">
	export let count: string;
	export let countType: string;
	export let description: string;
	export let link: string;
</script>

<a
	href={link}
	class="flex h-[250px] w-[250px] flex-col items-center rounded-lg bg-gradient-to-r from-blue to-lightblue p-8 text-center font-poppins text-white drop-shadow-md transition-all text-shadow hover:-translate-y-2 hover:drop-shadow-hover md:h-[300px] md:w-[300px]"
>
	<div class="flex h-full flex-col justify-between">
		<div />
		<div>
			<p class="text-5xl font-bold">{count}</p>
			<p class="text-xl font-medium">{countType}</p>
		</div>
		<div>
			<p>{description}</p>
		</div>
	</div>
</a>
