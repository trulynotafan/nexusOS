import { writable } from 'svelte/store';

export type Settings = {
    dockSize: 'small' | 'medium' | 'large';
    windowTransparency: number;
    animationSpeed: 'fast' | 'normal' | 'slow';
    dockPosition: 'bottom' | 'left' | 'right';
};

const defaultSettings: Settings = {
    dockSize: 'medium',
    windowTransparency: 70,
    animationSpeed: 'normal',
    dockPosition: 'bottom'
};

export const settings = writable<Settings>(defaultSettings);

// Animation duration mapping
export const getAnimationDuration = (speed: string) => {
    switch (speed) {
        case 'fast': return 0.5;
        case 'slow': return 2;
        default: return 1;
    }
}; 