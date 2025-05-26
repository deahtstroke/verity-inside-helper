<script lang="ts">
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import * as state from '../state/theme.svelte';

	let theme: string = state.getTheme() ?? state.Theme.Light;

	let localStorageTheme = state.getTheme();
	if (localStorageTheme !== null) {
		state.setTheme(localStorageTheme);
	}

	onMount(() => {
		document.documentElement.setAttribute('theme', theme);
		state.setTheme(theme);
	});

	function themeToggle() {
		theme = theme === state.Theme.Light ? state.Theme.Dark : state.Theme.Light;
		state.setTheme(theme);
		document.documentElement.setAttribute('theme', theme);
	}
</script>

<button onclick={themeToggle} class="theme-toggle" aria-label="Toggle dark mode">
	{#if theme == state.Theme.Light}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}
</style>
