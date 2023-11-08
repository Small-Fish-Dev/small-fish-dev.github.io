<script lang="ts">
	import '../app.css';
</script>

<slot />

<footer>
	<div class="bg-gradient-to-b from-white to-darkblue h-6" />
	<div class="bg-darkblue overlay static-background" />
	<div class="overlay moving-background" />
	<div class="absolute font-poppins text-white p-4">
		<p class="text-3xl font-bold">small fish</p>
		<p><span class="font-bold">2021 - 2023</span> All rights are VERY reserved</p>
	</div>
</footer>

<style>
	.overlay {
		position: absolute;
		height: 180px;
		width: 100%;
		background-repeat: repeat-x;
		background-size: 800px 100%;
	}
	.static-background {
		background-image: url('footer/fbg_static.png');
	}

	.moving-background {
		background-image: url('footer/fbg_moving.png');
		animation-name: swim;
		animation-duration: 4s;
		animation-iteration-count: infinite;
		transform: translateX(0px) translateY(0px);
		overflow: hidden;
		height: 170px;
		width: 100%;
	}

	@keyframes swim {
		0% {
			transform: translateX(0px) translateY(0px);
		}
		50% {
			transform: translateX(-5px) translateY(10px);
		}
		100% {
			transform: translateX(0px) translateY(0px);
		}
	}
</style>
