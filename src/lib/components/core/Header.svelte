<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu } from 'lucide-svelte';
	import ThemeButton from '../buttons/ThemeButton.svelte';
	import SideMenu from '../buttons/SideMenu.svelte';
	import StrategyToggle from '../buttons/StrategyToggle.svelte';

	let isMobileMenuOpen: boolean = $state(false);
	let windowWidth = $state(0);

	onMount(() => {
		const handleResize = () => {
			windowWidth = window.innerWidth;
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	});

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<header>
	<div class="header-content">
		<div class="logo">
			<a href="/"><span>Verity Inside Helper</span></a>
		</div>
		{#if windowWidth > 768}
			<nav class="desktop-nav">
				<a href="/about">About</a>
				<a
					href="https://github.com/dvillavicencio/verity-inside-helper"
					target="_blank"
					rel="noopener noreferrer"
				>
					Source
				</a>
				<StrategyToggle />
				<ThemeButton />
			</nav>
		{:else}
			<div class="mobile-controls">
				<ThemeButton />
				<button onclick={toggleMobileMenu} class="menu-toggle" aria-label="Toggle menu">
					<Menu />
				</button>
			</div>
		{/if}
	</div>

	<SideMenu bind:menuOpen={isMobileMenuOpen} />
</header>

<style>
	header {
		position: relative;
		z-index: 1000;
		background-color: var(--background-color);
	}

	a {
		text-decoration: none;
	}

	.header-content {
		max-width: 48rem;
		margin: 0 auto;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo span {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--text-color);
	}

	.menu-toggle {
		background-color: var(--background-color);
		border-style: none;
	}

	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.desktop-nav a {
		text-decoration: none;
		color: var(--text-color);
	}

	.mobile-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.desktop-nav {
			display: none;
		}
	}
</style>
