<script lang="ts">
	import { StatueLocation } from '../../Enums/StatueLocation';
	import { ArrowLeft, ArrowRight, Dot, type Icon as IconType } from 'lucide-svelte';
	import { algorithmState } from '../state/algorithmState.svelte';

	type Selection = {
		location: StatueLocation;
		label: string;
		icon: typeof IconType;
		clicked: boolean;
	};

	const locations: Selection[] = $state([
		{ location: StatueLocation.Left, label: 'Left', icon: ArrowLeft, clicked: false },
		{ location: StatueLocation.Mid, label: 'Mid', icon: Dot, clicked: false },
		{ location: StatueLocation.Right, label: 'Right', icon: ArrowRight, clicked: false }
	]);

	function selectLocation(location: StatueLocation): void {
		if (algorithmState.statueLocation !== null && location === algorithmState.statueLocation) {
			algorithmState.statueLocation = null;
			locations.forEach((l) => {
				if (l.location === location) {
					l.clicked = false;
				}
			});
			return;
		}

		locations.forEach((l) => {
			if (l.location === location) {
				l.clicked = true;
			} else {
				l.clicked = false;
			}
			algorithmState.statueLocation = location;
		});
	}
</script>

<div class="location-container">
	{#each locations as location}
		{@const Icon = location.icon}
		<div class="location-option" aria-label="Statue location options">
			<button
				aria-label={location.label}
				class="card {location.clicked ? 'clicked' : ''}"
				onclick={() => selectLocation(location.location)}
			>
				<span class="item-wrapper"><Icon size="30" /></span>
				<span class="label-wrapper">{location.label}</span>
			</button>
		</div>
	{/each}
</div>

<style>
	.location-container {
		display: flex;
		gap: clamp(1rem, 1.5rem, 2rem);
	}

	.location-option {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.item-wrapper {
		display: flex;
		color: var(--text-color);
		margin-bottom: center;
		margin-bottom: 0.5rem;
	}

	.label-wrapper {
		font-size: 1rem;
		color: var(--text-color);
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0.5rem;
		justify-content: center;
		width: 6rem;
		height: 6rem;
		border: 2px solid var(-outline-color);
		border-radius: 0.5rem;
		background-color: var(--background-color);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.card:hover {
		background-color: var(--hover-background-color);
		transform: scale(1.05);
		box-shadow: var(--box-shadow-hover);
	}

	.card:active {
		transform: scale(0.95);
		background-color: var(--active-color);
		box-shadow: var(--box-shadow-active);
	}

	.card.clicked {
		border-color: var(--selected-color);
		background-color: var(--hover-background-color);
		box-shadow: var(--box-shadow-selected);
	}
</style>
