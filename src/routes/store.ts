import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type AnimationState = 'forwards' | 'backwards';
export const isAnimationState = (value: unknown): value is AnimationState =>
	value === 'forwards' || value === 'backwards';

const STORAGE_KEY = 'animationState';

const initialState: AnimationState = (() => {
	if (browser) {
		const storedState = sessionStorage.getItem(STORAGE_KEY);
		if (isAnimationState(storedState)) return storedState;
	}
	return 'backwards';
})();

export const animationState = writable<AnimationState>(initialState);

if (browser) {
	animationState.subscribe((value) => sessionStorage.setItem(STORAGE_KEY, value));
}
