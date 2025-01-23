import { settings } from '$lib/stores/settings';
import { get } from 'svelte/store';

const sounds = {
    click: new Audio('/sounds/click.mp3'),
    hover: new Audio('/sounds/hover.mp3'),
    open: new Audio('/sounds/open.mp3'),
    close: new Audio('/sounds/close.mp3')
};

export function playSound(sound: keyof typeof sounds) {
    if (get(settings).soundEnabled) {
        sounds[sound].play();
    }
} 