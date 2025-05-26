<script lang="ts">
	import SingleShapeSelector from './SingleShapeSelector.svelte';
</script>

<div class="container">
	<h3>What shape is your statue holding?</h3>
	<SingleShapeSelector />
</div>

<style>
	.container {
		max-width: 20rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	h3 {
		color: var(--text-color);
	}
</style>
