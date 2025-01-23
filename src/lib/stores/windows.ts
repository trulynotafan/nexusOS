import { writable, derived } from 'svelte/store';
import type { Window } from '$lib/types';
import { findSafePosition, WINDOW_WIDTH, WINDOW_HEIGHT } from '$lib/utils/windowPosition';

function createWindowStore() {
	const { subscribe, update } = writable<Window[]>([]);

	return {
		subscribe,
		add: (window: Omit<Window, 'position' | 'isActive' | 'isMinimized'>) => {
			update((windows) => {
				// Only check for minimized windows of the same app
				const minimizedWindow = windows.find(w => 
					w.id.startsWith(window.id.split('-')[0]) && w.isMinimized
				);

				if (minimizedWindow) {
					// If there's a minimized window, restore it
					return windows.map(w => ({
						...w,
						isActive: w.id === minimizedWindow.id,
						isMinimized: w.id === minimizedWindow.id ? false : w.isMinimized
					}));
				}

				// Create array of existing window areas
				const existingWindows = windows
					.filter(w => !w.isMinimized)
					.map(w => ({
						x: w.position.x,
						y: w.position.y,
						width: WINDOW_WIDTH,
						height: WINDOW_HEIGHT
					}));

				// Find safe position for new window
				const position = findSafePosition(existingWindows);

				// Add new window with isOpening flag for animation
				return [
					...windows,
					{
						...window,
						position,
						isActive: true,
						isMinimized: false,
						isOpening: true // Add this flag for new windows
					}
				];
			});

			// Remove isOpening flag after animation completes
			setTimeout(() => {
				update(windows => 
					windows.map(w => ({
						...w,
						isOpening: false
					}))
				);
			}, 400); // Match this with your animation duration
		},
		remove: (id: string) => {
			update((windows) => windows.filter((w) => w.id !== id));
		},
		minimize: (id: string) => {
			update((windows) =>
				windows.map((w) => ({
					...w,
					isMinimized: w.id === id ? !w.isMinimized : w.isMinimized,
					isActive: w.id === id ? !w.isMinimized : w.isActive
				}))
			);
		},
		setActive: (id: string) => {
			update((windows) =>
				windows.map((w) => ({
					...w,
					isActive: w.id === id
				}))
			);
		}
	};
}

export const windows = createWindowStore();

// Update activeWindowsByApp to include minimized windows
export const activeWindowsByApp = derived(windows, ($windows) => {
	const activeWindows = new Set();
	$windows.forEach((window) => {
		// Include window in active set regardless of minimized state
		activeWindows.add(window.id.split('-')[0]);
	});
	return activeWindows;
});

// Add a store for maximized state
export const hasMaximizedWindow = derived(windows, ($windows) => {
	return $windows.some(window => window.isMaximized);
}); 