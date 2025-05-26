import { StatueLocation } from "$lib/Enums/StatueLocation";
import { DoubledPlayers } from "$lib/Enums/DoubledPlayers";
import { Shape } from "$lib/Enums/Shape";

interface AlgorithmState {
	fastStrategy: boolean;
	shapesHeld: Shape[];
	statueLocation: StatueLocation | null;
	statueShape: Shape | null;
	playersDoubled: DoubledPlayers | null;
};

export const algorithmState: AlgorithmState = $state<AlgorithmState>({
	fastStrategy: false,
	shapesHeld: [],
	statueLocation: null,
	statueShape: null,
	playersDoubled: null,
})
