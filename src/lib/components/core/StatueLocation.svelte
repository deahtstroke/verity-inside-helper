<script lang="ts">
	import LocationSelector from './LocationSelector.svelte';
</script>

<div class="container">
	<h3>Where is your statue?</h3>
	<LocationSelector />
</div>

<style>
	.container {
		max-width: 20rem;
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: column;
	}

	h3 {
		color: var(--text-color);
	}
</style>
