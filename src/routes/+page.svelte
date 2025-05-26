<script lang="ts">
	import StatueLocation from '$lib/components/core/StatueLocation.svelte';
	import StatueShape from '$lib/components/core/StatueShape.svelte';

	$effect(() => {
		let top = document.querySelector('header');
		if (top) {
			top.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
		}
	});
</script>

<div class="main-container">
	<StatueShape />
	<StatueLocation />
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	div:last-of-type {
		margin-top: auto;
	}
</style>
