<script lang="ts">
	export let src: string;
	export let alt: string = '';
</script>

<img class="flex mx-auto justify-center" {src} alt={alt ? alt : src} />
