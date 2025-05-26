import { browser } from "$app/environment";

const THEME_KEY_NAME: string = 'theme';

export const Theme = {
	Light: 'lightmode',
	Dark: 'darkmode'
}

let currentTheme = $state<string>(Theme.Light)

export function getTheme(): string | null {
	return currentTheme
}

export function setTheme(newTheme: string): void {
	if (browser) {
		window.localStorage.setItem(THEME_KEY_NAME, currentTheme)
	}
	currentTheme = newTheme == Theme.Light ? Theme.Light : Theme.Dark;
}

if (browser) {
	const saved: string | null = window.localStorage.getItem(THEME_KEY_NAME)
	if (saved === Theme.Light || saved === Theme.Dark) {
		currentTheme = saved
	} else {
		localStorage.setItem(THEME_KEY_NAME, Theme.Light)
	}
}
