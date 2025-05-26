<script lang="ts">
	import { run } from 'svelte/legacy';

	import StatueLocationSelector from './StatueLocationSelector.svelte';
	import StatueShapeSelector from './StatueShapeSelector.svelte';
	import ShapeSelector from './ShapeSelector.svelte';
	import RefreshButton from '../buttons/RefreshButton.svelte';
	import PlayersDoubleShapesSelector from './PlayersDoubleShapesSelector.svelte';
	import FloatingNotification from './FloatingNotification.svelte';
	import ChecklistStepGuide from './ChecklistStepGuide.svelte';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Shape } from '../../Enums/Shape';
	import { StatueLocation } from '../../Enums/StatueLocation';
	import { DoubledPlayers } from '../../Enums/DoubledPlayers';
	import * as strategyState from '../state/strategyState.svelte';
	import * as shapeUtils from '../../utils/ShapeUtils';
	import * as solutions from '../../utils/SolutionUtils';

	const RESET_EVENT: string = 'reset';

	let { onReset: boolean } = $props();

	interface MainState {
		fastStrategy: boolean;
		currentStep: number;
		completedSteps: number;
		totalSteps: number;
		resetEnabled: boolean;
		outputVisible: boolean;
		shapesHeld: Shape[];
		statueLocation: StatueLocation | null;
		statueShape: Shape | null;
		playersDoubled: DoubledPlayers | null;
	}

	interface ErrorState {
		validShapes: boolean;
		inputErrorPresent: boolean;
		errorMessageVisible: boolean;
	}

	const dispatch = createEventDispatcher();

	let mainState = $state<MainState>({
		fastStrategy: false,
		currentStep: 0,
		completedSteps: 0,
		totalSteps: 0,
		resetEnabled: false,
		outputVisible: false,
		shapesHeld: [],
		statueLocation: null,
		statueShape: null,
		playersDoubled: null
	});

	let errorState = $state<ErrorState>({
		validShapes: true,
		inputErrorPresent: false,
		errorMessageVisible: false
	});

	let outputContainer: HTMLElement = $state();

	let inputElements: HTMLElement[] = $state([]);

	function scrollToStep(step: number) {
		if (inputElements[step] && inputElements[step].scrollIntoView) {
			inputElements[step].scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
	}

	function validateShapes(statueShape: Shape, shapesHeld: Shape[]): boolean {
		let valid = shapesHeld.filter((item) => item === statueShape);
		return statueShape !== null && shapesHeld.length > 0 && valid.length != 0;
	}

	function reset() {
		mainState.resetEnabled = false;
		mainState.outputVisible = false;
		mainState.statueLocation = null;
		mainState.statueShape = null;
		mainState.shapesHeld = [];
		mainState.playersDoubled = null;
		inputElements = [];

		dispatch(RESET_EVENT);
	}

	function scrollToOutput() {
		if (outputContainer) {
			outputContainer.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function errorMessageDescription(shapes: Shape[]): string {
		if (shapes[0] === shapes[1]) {
			return `If your statue is holding a ${mainState.statueShape}, you can never start with double ${shapes[0]}s on your wall`;
		} else if (mainState.statueShape) {
			let otherShapes: Shape[] = shapeUtils.getOtherShapes(mainState.statueShape);
			return `If your statue is holding a ${mainState.statueShape}, you can never start with ${otherShapes[0]} and ${otherShapes[1]} on your wall`;
		} else {
			return 'There was an unexpected error. You need to pick the shape of your statue and your shapes in the wall.';
		}
	}

	function closeErrorMessage() {
		errorState.errorMessageVisible = false;
	}

	mainState.fastStrategy = strategyState.getStrategy();

	run(() => {
		if (mainState.currentStep > 0 && mainState.currentStep < inputElements.length) {
			scrollToStep(mainState.currentStep);
		}
	});

	run(() => {
		if (outputContainer) {
			scrollToOutput();
		}
	});

	run(() => {
		if (mainState.currentStep >= 1) {
			mainState.resetEnabled = true;
		}
	});

	let normalModeParams = $derived(
		mainState.statueLocation &&
			mainState.statueShape &&
			mainState.shapesHeld &&
			mainState.shapesHeld.length == 2 &&
			validateShapes(mainState.statueShape, mainState.shapesHeld)
	);
	let fastModeParams = $derived(normalModeParams && mainState.playersDoubled);

	run(() => {
		if (mainState.fastStrategy) {
			mainState.outputVisible = fastModeParams && mainState.currentStep >= 4;
		} else {
			mainState.outputVisible = normalModeParams && mainState.currentStep >= 3;
		}
	});

	run(() => {
		errorState.inputErrorPresent =
			mainState.statueShape &&
			mainState.shapesHeld.length == 2 &&
			!validateShapes(mainState.statueShape, mainState.shapesHeld);
	});

	run(() => {
		errorState.errorMessageVisible =
			mainState.statueShape &&
			mainState.shapesHeld.length &&
			!validateShapes(mainState.statueShape, mainState.shapesHeld);
	});
</script>

<main>
	<div class="input-container">
		{#if mainState.currentStep >= 0}
			<div transition:fly={{ y: 50, duration: 300 }} bind:this={inputElements[0]}>
				<StatueLocationSelector
					on:statueSelect={(event) => {
						mainState.statueLocation = event.detail;
						mainState.currentStep = 1;
					}}
					{resetEnabled}
				/>
			</div>
		{/if}

		{#if currentStep >= 1}
			<div transition:fly={{ y: 50, duration: 300 }} bind:this={inputElements[1]}>
				<StatueShapeSelector
					on:selectShape={(event) => {
						statueShape = event.detail;
						currentStep = 2;
					}}
					{mainState.resetEnabled}
				/>
			</div>
		{/if}

		{#if currentStep >= 2}
			<div transition:fly={{ y: 50, duration: 300 }} bind:this={inputElements[2]}>
				<ShapeSelector
					on:shapes={(event) => {
						shapes = event.detail;
						currentStep = fastStrategy ? 3 : 4;
					}}
					{resetEnabled}
				/>
			</div>
		{/if}
		{#if fastStrategy && currentStep >= 3 && !inputErrorPresent}
			<div transition:fly={{ y: 50, duration: 300 }} bind:this={inputElements[3]}>
				<PlayersDoubleShapesSelector
					on:doubledPlayers={(event) => {
						playersDoubled = event.detail;
						currentStep = 4;
					}}
					{shapes}
					{resetEnabled}
				/>
			</div>
		{/if}
	</div>
	{#if outputVisible}
		<div
			class="output-container"
			bind:this={outputContainer}
			transition:fly={{ y: -50, duration: 500 }}
		>
			<ChecklistStepGuide
				solution={fastStrategy
					? solutions.fastStrategy(statueLocation, statueShape, shapes, playersDoubled)
					: solutions.normalStrategy(statueLocation, statueShape, shapes)}
				strategy={fastStrategy ? 'Fast Strategy' : 'Normal/LFG Strategy'}
				on:progress={(e) => {
					completedSteps = e.detail.completed;
					totalSteps = e.detail.total;
				}}
			/>
		</div>
	{/if}
</main>
{#if resetEnabled}
	<RefreshButton onReset={reset} />
{/if}
<FloatingNotification
	message={errorMessageDescription(shapes)}
	visible={errorMessageVisible}
	onClose={closeErrorMessage}
/>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--background-color);
		gap: 0.5rem;
	}

	.input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 0.5rem;
	}

	.output-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: start;
		align-content: start;
		justify-content: flex-start;
		flex-wrap: wrap;
		max-width: 32rem;
		background-color: var(--background-color);
		padding: 0 1.25rem;
	}
</style>
