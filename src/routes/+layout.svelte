<script lang="ts">
	import '../app.css';
</script>

<slot />

<footer>
	<div class="bg-gradient-to-b from-white to-darkblue h-6" />
	<div class="overlay static-background" />
	<div class="overlay moving-background" />
	<div class="bg-darkblue overflow-hidden h-48" />
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
		transform: translateY(0px);
		overflow: hidden;
	}

	@keyframes swim {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(10px);
		}
		100% {
			transform: translateY(0px);
		}
	}
</style>
