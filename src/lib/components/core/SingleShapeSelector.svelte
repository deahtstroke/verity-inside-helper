<script lang="ts">
	import { Shape } from '../../Enums/Shape';
	import { Circle, Square, Triangle, type Icon as IconType } from 'lucide-svelte';
	import { algorithmState } from '../state/algorithmState.svelte';

	type Selection = {
		shape: Shape;
		label: string;
		icon: typeof IconType;
		clicked: boolean;
	};

	const shapes: Selection[] = $state([
		{ shape: Shape.Square, label: 'Square', icon: Square, clicked: false },
		{ shape: Shape.Circle, label: 'Circle', icon: Circle, clicked: false },
		{ shape: Shape.Triangle, label: 'Triangle', icon: Triangle, clicked: false }
	]);

	function selectShape(shape: Shape): void {
		if (algorithmState.statueShape !== null && shape === algorithmState.statueShape) {
			algorithmState.statueShape = null;
			shapes.forEach((s) => {
				if (s.shape === shape) {
					s.clicked = false;
				}
			});
			return;
		}

		shapes.forEach((s) => {
			if (s.shape === shape) {
				s.clicked = true;
			} else {
				s.clicked = false;
			}
		});
		algorithmState.statueShape = shape;
	}
</script>

<div class="shape-container">
	{#each shapes as shape}
		{@const Icon = shape.icon}
		<div class="shape-option" aria-label="Statue shape options">
			<button
				aria-label={shape.label}
				class="card {shape.clicked ? 'clicked' : ''}"
				onclick={() => selectShape(shape.shape)}
			>
				<span class="item-wrapper"><Icon size="30" /></span>
				<span class="label-wrapper">{shape.label}</span>
			</button>
		</div>
	{/each}
</div>

<style>
	.shape-container {
		display: flex;
		gap: clamp(1rem, 1.5rem, 2rem);
	}

	.shape-option {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.item-wrapper {
		display: flex;
		color: var(--text-color);
		margin-bottom: 0.5rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0.5rem;
		justify-content: center;
		width: 6rem;
		height: 6rem;
		border: 2px solid var(--outline-color);
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

	.label-wrapper {
		font-size: 1rem;
		color: var(--text-color);
	}

	@media (hover: hover) and (pointer: fine) {
		.card:hover {
			background-color: var(--hover-background-color);
		}
	}
</style>
