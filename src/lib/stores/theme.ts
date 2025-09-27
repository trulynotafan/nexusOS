import { derived } from 'svelte/store';
import { currentWallpaper } from './wallpaper';

export type Theme = {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    border: string;
    text: {
        primary: string;
        secondary: string;
        accent: string;
        link: string;
        linkHover: string;
    };
    gradient: {
        primary: string;
        secondary: string;
        dock: string;
    };
    highlight: string;
    dock: {
        about: string;
        projects: string;
        terminal: string;
        contact: string;
    };
};

const themes: Record<string, Theme> = {
    blue: {
        primary: 'from-blue-950 via-slate-900 to-slate-950',
        secondary: 'bg-slate-900/70',
        accent: 'ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/20',
        bg: 'bg-slate-800/50',
        border: 'border-blue-500/20',
        text: {
            primary: 'text-blue-400',
            secondary: 'text-blue-300',
            accent: 'text-blue-500',
            link: 'text-blue-400',
            linkHover: 'hover:text-blue-300'
        },
        dock: {
            about: 'text-cyan-400 group-hover:text-cyan-300',
            projects: 'text-blue-400 group-hover:text-blue-300',
            terminal: 'text-sky-400 group-hover:text-sky-300',
            contact: 'text-indigo-400 group-hover:text-indigo-300'
        },
        gradient: {
            primary: 'from-blue-400 via-cyan-400 to-sky-400',
            secondary: 'from-blue-500 via-cyan-500 to-sky-500',
            dock: 'from-blue-400 via-cyan-400 to-sky-400'
        },
        highlight: 'bg-blue-500/10'
    },
    purple: {
        primary: 'from-purple-950 via-slate-900 to-slate-950',
        secondary: 'bg-purple-900/70',
        accent: 'ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20',
        bg: 'bg-purple-800/50',
        border: 'border-purple-500/20',
        text: {
            primary: 'text-purple-400',
            secondary: 'text-purple-300',
            accent: 'text-purple-500',
            link: 'text-purple-400',
            linkHover: 'hover:text-purple-300'
        },
        dock: {
            about: 'text-fuchsia-400 group-hover:text-fuchsia-300',
            projects: 'text-purple-400 group-hover:text-purple-300',
            terminal: 'text-pink-400 group-hover:text-pink-300',
            contact: 'text-violet-400 group-hover:text-violet-300'
        },
        gradient: {
            primary: 'from-purple-400 via-fuchsia-400 to-pink-400',
            secondary: 'from-purple-500 via-fuchsia-500 to-pink-500'
        },
        highlight: 'bg-purple-500/10'
    },
    green: {
        primary: 'from-green-950 via-slate-900 to-slate-950',
        secondary: 'bg-green-900/70',
        accent: 'ring-2 ring-green-500/30 shadow-lg shadow-green-500/20',
        bg: 'bg-green-800/50',
        border: 'border-green-500/20',
        text: {
            primary: 'text-green-400',
            secondary: 'text-green-300',
            accent: 'text-green-500',
            link: 'text-green-400',
            linkHover: 'hover:text-green-300'
        },
        dock: {
            about: 'text-emerald-400 group-hover:text-emerald-300',
            projects: 'text-green-400 group-hover:text-green-300',
            terminal: 'text-teal-400 group-hover:text-teal-300',
            contact: 'text-lime-400 group-hover:text-lime-300'
        },
        gradient: {
            primary: 'from-green-400 via-emerald-400 to-teal-400',
            secondary: 'from-green-500 via-emerald-500 to-teal-500'
        },
        highlight: 'bg-green-500/10'
    },
    black: {
        primary: 'from-zinc-950 via-slate-900 to-black',
        secondary: 'bg-zinc-900/70',
        accent: 'ring-2 ring-zinc-500/30 shadow-lg shadow-zinc-500/20',
        bg: 'bg-zinc-800/50',
        border: 'border-zinc-500/20',
        text: {
            primary: 'text-zinc-400',
            secondary: 'text-zinc-300',
            accent: 'text-zinc-500',
            link: 'text-zinc-400',
            linkHover: 'hover:text-zinc-300'
        },
        dock: {
            about: 'text-zinc-400 group-hover:text-zinc-300',
            projects: 'text-slate-400 group-hover:text-slate-300',
            terminal: 'text-neutral-400 group-hover:text-neutral-300',
            contact: 'text-gray-400 group-hover:text-gray-300'
        },
        gradient: {
            primary: 'from-zinc-400 via-slate-400 to-neutral-400',
            secondary: 'from-zinc-500 via-slate-500 to-neutral-500'
        },
        highlight: 'bg-zinc-500/10'
    }
};

export const currentTheme = derived(currentWallpaper, ($wallpaper) => {
    if ($wallpaper.includes('purple')) return themes.purple;
    if ($wallpaper.includes('green')) return themes.green;
    if ($wallpaper.includes('black')) return themes.black;
    return themes.blue; // default theme
}); 