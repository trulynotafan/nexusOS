<script lang="ts">
    import { Image, Info, Settings } from 'lucide-svelte';
    import { windows } from '$lib/stores/windows';
    import { currentWallpaper } from '$lib/stores/wallpaper';
    import { currentTheme } from '$lib/stores/theme';
    import { fade } from 'svelte/transition';
    import { settings } from '$lib/stores/settings';
    import AdminPanel from '$lib/components/AdminPanel.svelte';
    import { isAuthenticated } from '$lib/stores/auth';
    import LoginModal from './LoginModal.svelte';
    
    export let x = 0;
    export let y = 0;
    export let show = false;

    function changeWallpaper(wallpaperPath: string) {
        currentWallpaper.set(wallpaperPath);
    }

    // Get theme values for HTML template
    $: themeValues = $currentTheme;

    function handleSettingChange(setting: string, value: any) {
        settings.update(s => ({ ...s, [setting]: value }));
    }

    const menuItems = [
        {
            id: 'theme',
            label: 'Change Theme',
            icon: Image,
            action: () => {
                windows.add({
                    id: `theme-${Date.now()}`,
                    title: 'Theme Settings',
                    icon: 'settings',
                    content: `
                        <div class="p-4 space-y-4">
                            <h2 class="text-lg font-medium text-white">Choose Theme</h2>
                            <div class="grid grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <button onclick="window.changeWallpaper('/images/purple.jpeg')" class="aspect-video w-full rounded-lg border-2 border-transparent hover:border-purple-500 transition-all">
                                        <img src="/images/purple.jpeg" class="rounded-lg w-full h-full object-cover" alt="Purple">
                                    </button>
                                    <div class="text-center text-sm text-purple-400">Purple Theme</div>
                                </div>

                                <div class="space-y-2">
                                    <button onclick="window.changeWallpaper('/images/green.jpg')" class="aspect-video w-full rounded-lg border-2 border-transparent hover:border-green-500 transition-all">
                                        <img src="/images/green.jpg" class="rounded-lg w-full h-full object-cover" alt="Green">
                                    </button>
                                    <div class="text-center text-sm text-green-400">Green Theme</div>
                                </div>

                                <div class="space-y-2">
                                    <button onclick="window.changeWallpaper('/images/black.jpg')" class="aspect-video w-full rounded-lg border-2 border-transparent hover:border-zinc-500 transition-all">
                                        <img src="/images/black.jpg" class="rounded-lg w-full h-full object-cover" alt="Black">
                                    </button>
                                    <div class="text-center text-sm text-zinc-400">Dark Theme</div>
                                </div>

                                <div class="space-y-2">
                                    <button onclick="window.changeWallpaper('/images/wallpaper.jpeg')" class="aspect-video w-full rounded-lg border-2 border-transparent hover:border-blue-500 transition-all">
                                        <img src="/images/wallpaper.jpeg" class="rounded-lg w-full h-full object-cover" alt="Default">
                                    </button>
                                    <div class="text-center text-sm text-blue-400">Blue Theme</div>
                                </div>
                            </div>
                        </div>
                    `,
                    isMaximized: false
                });
            }
        },
        {
            id: 'about',
            label: 'About NexusOS',
            icon: Info,
            action: () => {
                windows.add({
                    id: `about-nexus-${Date.now()}`,
                    title: 'About NexusOS',
                    icon: 'info',
                    content: `
                        <div class="p-4 space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                    <svg class="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M21 16.5v-9L12 3L3 7.5v9L12 21l9-4.5z" stroke-width="1.5"/>
                                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" stroke-width="2.5"/>
                                    </svg>
                                </div>
                                <div>
                                    <h2 class="text-2xl font-bold text-white">NexusOS v1.0.0</h2>
                                    <p class="text-white/60">A web-based operating system experience</p>
                                </div>
                            </div>
                            <div class="prose prose-invert">
                                <p>Built with SvelteKit, TypeScript, and TailwindCSS</p>
                                <p>Created by Afaan</p>
                                <div class="flex gap-4 mt-4">
                                    <a href="https://github.com/trulynotafan/nexusOS" target="_blank" class="text-blue-400 hover:text-blue-300">GitHub</a>
                                    <a href="https://forgeweb.uk" target="_blank" class="text-blue-400 hover:text-blue-300">Website</a>
                                </div>
                            </div>
                        </div>
                    `,
                    isMaximized: false
                });
            }
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            action: () => {
                windows.add({
                    id: `settings-${Date.now()}`,
                    title: 'System Settings',
                    icon: 'settings',
                    content: `
                        <div class="p-4 space-y-6">
                            <h2 class="text-lg font-medium text-white">System Settings</h2>
                            <div class="space-y-4">
                                <!-- Dock Size -->
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-white/80">Dock Size</span>
                                        <p class="text-xs text-white/50">Adjust the size of dock icons</p>
                                    </div>
                                    <select 
                                        class="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-white/80"
                                        onchange="window.handleSettingChange('dockSize', this.value)"
                                    >
                                        <option value="small">Small</option>
                                        <option value="medium" selected>Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>

                                <!-- Window Transparency -->
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-white/80">Window Transparency</span>
                                        <p class="text-xs text-white/50">Adjust window background blur</p>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value="70"
                                        class="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        oninput="window.handleSettingChange('windowTransparency', Number(this.value))"
                                    >
                                </div>

                                <!-- Animation Speed -->
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-white/80">Animation Speed</span>
                                        <p class="text-xs text-white/50">Control UI animation speed</p>
                                    </div>
                                    <select 
                                        class="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-white/80"
                                        onchange="window.handleSettingChange('animationSpeed', this.value)"
                                    >
                                        <option value="fast">Fast</option>
                                        <option value="normal" selected>Normal</option>
                                        <option value="slow">Slow</option>
                                    </select>
                                </div>

                                <!-- Dock Position -->
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-white/80">Dock Position</span>
                                        <p class="text-xs text-white/50">Choose dock location</p>
                                    </div>
                                    <select 
                                        class="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-white/80"
                                        onchange="window.handleSettingChange('dockPosition', this.value)"
                                    >
                                        <option value="bottom" selected>Bottom</option>
                                        <option value="left">Left</option>
                                        <option value="right">Right</option>
                                    </select>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-700/50">
                                <p class="text-xs text-white/40 text-center">
                                    Some settings may require a system restart
                                </p>
                            </div>
                        </div>
                    `,
                    isMaximized: false
                });
            }
        },
        {
            id: 'admin',
            label: 'Admin Panel',
            icon: Settings,
            action: handleAdminClick
        }
    ];

    let showLoginModal = false;

    function handleAdminClick() {
        if ($isAuthenticated) {
            // Open admin panel
            windows.add({
                id: `admin-${Date.now()}`,
                title: 'Admin Panel',
                icon: 'settings',
                content: AdminPanel,
                isMaximized: false
            });
        } else {
            showLoginModal = true;
        }
        show = false;
    }

    function handleClick(action: () => void) {
        action();
        show = false;
    }

    // Expose the changeWallpaper and handleSettingChange functions to window for HTML onclick handlers
    if (typeof window !== 'undefined') {
        window.changeWallpaper = changeWallpaper;
        window.handleSettingChange = handleSettingChange;
    }
</script>

{#if show}
    <div
        class="fixed z-[1000]"
        style="left: {x}px; top: {y}px;"
        transition:fade={{ duration: 100 }}
    >
        <div class="w-64 rounded-lg border border-slate-700/50 bg-slate-900/95 shadow-lg backdrop-blur overflow-hidden">
            <div class="p-1">
                {#each menuItems as item}
                    <button
                        class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-white hover:bg-slate-700/30 transition-colors"
                        on:click={() => handleClick(item.action)}
                    >
                        <svelte:component this={item.icon} class="w-4 h-4 text-white/70" />
                        {item.label}
                    </button>
                {/each}
            </div>
        </div>
    </div>
{/if}

{#if showLoginModal}
    <LoginModal 
        on:close={() => showLoginModal = false} 
    />
{/if} 