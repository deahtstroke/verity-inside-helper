import { browser } from "$app/environment";

const STRATEGY_KEY_NAME: string = 'fastStrat';

let currentStrat = $state<boolean>(false)

export function getStrategy(): boolean {
	return currentStrat
}

export function changeStrategy(): void {
	if (browser) {
		window.localStorage.setItem(STRATEGY_KEY_NAME, currentStrat.toString())
	}
	currentStrat = !currentStrat;
}

if (browser) {
	const saved: string | null = window.localStorage.getItem(STRATEGY_KEY_NAME)
	if (saved) {
		const value = JSON.parse(saved)
		currentStrat = value;
	}
}
