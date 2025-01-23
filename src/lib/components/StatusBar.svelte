<script lang="ts">
	import { 
		Wifi, 
		Volume2, 
		Globe, 
		WifiOff,
		Command,
		Hexagon,
		Code2,
		Braces,
		Layers,
		Palette,
		Sparkles,
		Github
	} from 'lucide-svelte';
	import { scale, fade, fly } from 'svelte/transition';
	import { quintOut, elasticOut } from 'svelte/easing';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { onMount, onDestroy } from 'svelte';
	import { translations } from '$lib/stores/translations';
	import { hasMaximizedWindow, windows } from '$lib/stores/windows';
	import { currentTheme } from '$lib/stores/theme';

	let showNexusInfo = false;
	let showWifiMenu = false;
	let showSoundMenu = false;
	let showLanguageMenu = false;
	let isWifiEnabled = true;
	let volume = 75;
	let currentLanguage = 'EN';
	let currentTime = '';
	let isMobile = false;

	let timeInterval: ReturnType<typeof setInterval>;

	const technologies = [
		{ name: 'SvelteKit', icon: Sparkles, color: 'text-orange-400' },
		{ name: 'TypeScript', icon: Braces, color: 'text-blue-400' },
		{ name: 'TailwindCSS', icon: Palette, color: 'text-cyan-400' },
		{ name: 'Lucide Icons', icon: Layers, color: 'text-green-400' }
	];

	function updateTime() {
		const now = new Date();
		const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
		currentTime = utcTime.toLocaleTimeString('en-US', { 
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: 'UTC'
		});
	}

	onMount(() => {
		updateTime(); // Initial update
		timeInterval = setInterval(updateTime, 1000); // Update every second
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => {
			window.removeEventListener('resize', checkMobile);
			if (timeInterval) clearInterval(timeInterval);
		};
	});

	onDestroy(() => {
		if (timeInterval) clearInterval(timeInterval);
	});

	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	function toggleWifi() {
		isWifiEnabled = !isWifiEnabled;
	}

	function handleVolumeChange(event: Event) {
		const input = event.target as HTMLInputElement;
		volume = parseInt(input.value);
	}

	function setLanguage(name: string, code: string) {
		currentLanguage = code;
		translations.set(code);
		showLanguageMenu = false;
	}

	function toggleWifiMenu() {
		showWifiMenu = !showWifiMenu;
		if (showWifiMenu) {
			showSoundMenu = false;
			showLanguageMenu = false;
		}
	}

	function toggleSoundMenu() {
		showSoundMenu = !showSoundMenu;
		if (showSoundMenu) {
			showWifiMenu = false;
			showLanguageMenu = false;
		}
	}

	function toggleLanguageMenu() {
		showLanguageMenu = !showLanguageMenu;
		if (showLanguageMenu) {
			showWifiMenu = false;
			showSoundMenu = false;
		}
	}

	function handleClickOutside() {
		showWifiMenu = false;
		showSoundMenu = false;
		showLanguageMenu = false;
		showNexusInfo = false;
	}

	function toggleNexusInfo() {
		showNexusInfo = !showNexusInfo;
		// Close other menus when Nexus info is opened
		if (showNexusInfo) {
			showWifiMenu = false;
			showSoundMenu = false;
			showLanguageMenu = false;
		}
	}

	// Add the contribute window content
	const contributeContent = `
		<div class="space-y-6 p-2">
			<div class="flex items-center gap-4">
				<div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
					<svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/>
					</svg>
				</div>
				<div>
					<h2 class="text-2xl font-bold text-white">Contribute to NexusOS</h2>
					<p class="text-white/60">Help make this project even better!</p>
				</div>
			</div>

			<div class="prose prose-invert">
				<p class="leading-relaxed">
					NexusOS is an open-source project, and any contributions are greatly appreciated. Whether you're fixing bugs, improving the design, adding new features, or just giving feedback - every contribution helps!
				</p>

				<div class="grid gap-4 mt-6">
					<a href="https://github.com/trulynotafan/nexusOS" target="_blank" class="group flex items-center justify-between p-4 rounded-xl border border-blue-500/20 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 no-underline">
						<div class="flex items-center gap-3">
							<svg class="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
							</svg>
							<div>
								<div class="font-medium text-white">View Source Code</div>
								<div class="text-sm text-white/60">Check out the project on GitHub</div>
							</div>
						</div>
						<svg class="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</a>

					<div class="bg-slate-800/50 rounded-xl p-4 border border-emerald-500/20">
						<h3 class="text-lg font-medium text-white mb-2">Ways to Contribute</h3>
						<ul class="space-y-2 text-white/80 list-none p-0 m-0">
							<li class="flex items-center gap-2">
								<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								Report bugs and issues
							</li>
							<li class="flex items-center gap-2">
								<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								Suggest new features
							</li>
							<li class="flex items-center gap-2">
								<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								Submit pull requests
							</li>
							<li class="flex items-center gap-2">
								<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								Improve documentation
							</li>
						</ul>
					</div>
				</div>

				<div class="mt-6 text-center text-white/60">
					Thank you for considering contributing to NexusOS! 🚀
				</div>
			</div>
		</div>
	`;

	function openContributeWindow() {
		windows.add({
			id: `contribute-${Date.now()}`,
			title: 'Contribute',
			icon: 'github',
			content: contributeContent,
			isMaximized: false
		});
	}
</script>

{#if !$hasMaximizedWindow}
<div class="fixed top-0 left-0 right-0 z-50 h-7 {$currentTheme.secondary} backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 border-b {$currentTheme.border}">
	<div class="flex h-7 w-full items-center justify-between bg-slate-900/70 px-4">
		<div class="relative" use:clickOutside on:outclick={handleClickOutside}>
			<button
				class="flex items-center gap-2 text-sm font-medium text-white hover:opacity-80"
				on:click={toggleNexusInfo}
			>
				<div class="relative flex items-center">
					<Hexagon class="h-5 w-5 text-blue-400" strokeWidth={1.5} />
					<Command 
						class="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white" 
						strokeWidth={2.5}
					/>
				</div>
				<span class="font-semibold tracking-wide">Nexus</span>
			</button>

			{#if showNexusInfo}
				<div
					class="absolute left-0 top-7 w-96 rounded-lg border border-slate-700/50 bg-slate-900/95 p-4 shadow-lg backdrop-blur"
					transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: elasticOut }}
				>
					<div class="flex flex-col gap-4">
						<!-- Logo and Title Section -->
						<div class="flex items-start gap-3">
							<div class="mt-1 rounded-lg bg-blue-500/10 p-2">
								<Code2 class="h-5 w-5 text-blue-400" />
							</div>
							<div class="space-y-1">
								<h3 class="font-semibold tracking-wide text-white">Nexus</h3>
								<p class="text-sm font-medium text-white/90">
									A web operating system
									<span 
										class="inline-block" 
										in:fly={{ y: 5, duration: 300, delay: 200 }}
									>
										made with ❤️
									</span>
									<span 
										class="inline-block" 
										in:fly={{ y: 5, duration: 300, delay: 400 }}
									>
										by
									</span>
									<span 
										class="inline-block font-medium text-white" 
										in:fly={{ y: 5, duration: 300, delay: 600 }}
									>
										Afaan
									</span>
								</p>
							</div>
						</div>

						<!-- Technologies Section -->
						<div 
							class="space-y-2"
							in:fly={{ y: 10, duration: 300, delay: 700 }}
						>
							<h4 class="text-xs font-medium uppercase tracking-wider text-white/50">Built with</h4>
							<div class="grid grid-cols-2 gap-2">
								{#each technologies as tech, i}
									<div 
										class="flex items-center gap-2 rounded bg-slate-800/50 p-2"
										in:fly={{ 
											x: i % 2 === 0 ? -10 : 10, 
											y: 10,
											duration: 300, 
											delay: 800 + (i * 100) 
										}}
									>
										<div class="rounded bg-slate-800/50 p-1.5">
											<svelte:component 
												this={tech.icon} 
												class="h-4 w-4 {tech.color}" 
											/>
										</div>
										<span class="text-sm font-medium text-white">
											{tech.name}
										</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Version Info -->
						<div 
							class="text-xs text-white/50"
							in:fly={{ y: 5, duration: 300, delay: 1200 }}
						>
							Version 1.0.0
						</div>
					</div>
				</div>
			{/if}
		</div>
		
		<div 
			class="flex items-center gap-4" 
			use:clickOutside 
			on:outclick={handleClickOutside}
		>
			<!-- WiFi -->
			<div class="relative">
				<button
					class="flex items-center gap-1 rounded px-1 py-0.5 font-medium text-white hover:bg-slate-700/30 {showWifiMenu ? 'bg-slate-700/30' : ''}"
					on:click={toggleWifiMenu}
				>
					{#if isWifiEnabled}
						<Wifi class="h-4 w-4" />
					{:else}
						<WifiOff class="h-4 w-4" />
					{/if}
				</button>
				
				{#if showWifiMenu}
					<div
						class="{isMobile ? 'fixed inset-x-0 top-7 border-t' : 'absolute right-0 top-7 w-80 rounded-lg border'} 
							border-slate-700/50 bg-slate-900/95 shadow-lg backdrop-blur"
						transition:fly={{ 
							y: isMobile ? -5 : 5,
							duration: 200,
							opacity: 0,
							easing: quintOut 
						}}
					>
						<div class="p-4 {isMobile ? 'space-y-4' : ''}">
							<div class="mb-4 flex items-center justify-between">
								<span class="text-sm font-medium text-white">Wi-Fi</span>
								<label class="relative inline-flex cursor-pointer items-center">
									<input 
										type="checkbox" 
										class="peer sr-only" 
										checked={isWifiEnabled}
										on:change={toggleWifi}
									>
									<div class="h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-700 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
								</label>
							</div>
							{#if isWifiEnabled}
								<div class="{isMobile ? 'grid gap-2' : ''}">
									<div class="flex items-center justify-between rounded px-2 py-1 hover:bg-slate-700/30">
										<div class="flex flex-col">
											<span class="text-sm text-white">SigmaNet (6Ghz)</span>
											<span class="text-xs text-white/70">Connected</span>
										</div>
										<Wifi class="h-4 w-4 text-white" />
									</div>
								</div>
							{:else}
								<div class="text-center text-sm text-white/70">
									You are offline :(
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- Add Contribute button here -->
			<div class="relative">
				<button
					on:click={openContributeWindow}
					class="flex items-center gap-1 rounded px-1 py-0.5 font-medium text-white hover:bg-slate-700/30"
				>
					<Github class="h-4 w-4" />
				</button>
			</div>

			<!-- Sound -->
			<div class="relative">
				<button
					class="flex items-center gap-1 rounded px-1 py-0.5 font-medium text-white hover:bg-slate-700/30 {showSoundMenu ? 'bg-slate-700/30' : ''}"
					on:click={toggleSoundMenu}
				>
					<Volume2 class="h-4 w-4" />
				</button>
				
				{#if showSoundMenu}
					<div
						class="{isMobile ? 'fixed inset-x-0 top-7 border-t' : 'absolute right-0 top-7 w-80 rounded-lg border'} 
							border-slate-700/50 bg-slate-900/95 shadow-lg backdrop-blur"
						transition:fly={{ 
							y: isMobile ? -5 : 5,
							duration: 200,
							opacity: 0,
							easing: quintOut 
						}}
					>
						<div class="p-4">
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<span class="text-sm font-medium text-white">Volume</span>
									<span class="text-sm text-white">{volume}%</span>
								</div>
								<input
									type="range"
									class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
									min="0"
									max="100"
									value={volume}
									on:input={handleVolumeChange}
								>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Language -->
			<div class="relative">
				<button
					class="flex items-center gap-1 rounded px-1 py-0.5 font-medium text-white hover:bg-slate-700/30 {showLanguageMenu ? 'bg-slate-700/30' : ''}"
					on:click={toggleLanguageMenu}
				>
					<Globe class="h-4 w-4" />
					<span class="text-xs">{currentLanguage}</span>
				</button>
				
				{#if showLanguageMenu}
					<div
						class="absolute right-0 top-7 w-48 rounded-lg border border-slate-700/50 bg-slate-900/95 shadow-lg backdrop-blur"
						transition:scale={{ duration: 200, start: 0.95, opacity: 0, easing: quintOut }}
					>
						<div class="p-1">
							<button 
								class="flex w-full items-center rounded px-2 py-1 text-left text-sm text-white hover:bg-slate-700/30"
								on:click={() => setLanguage('English', 'EN')}
							>
								English
							</button>
							<button 
								class="flex w-full items-center rounded px-2 py-1 text-left text-sm text-white hover:bg-slate-700/30"
								on:click={() => setLanguage('اردو', 'UR')}
							>
								اردو
							</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Time -->
			<div class="flex items-center gap-2">
				<div class="h-2 w-2 rounded-full bg-green-400"></div>
				<span class="text-xs text-white">UTC</span>
				<span class="text-xs text-white">{currentTime}</span>
			</div>
		</div>
	</div>
</div>
{/if} 

<style>
	/* Mobile optimizations */
	@media (max-width: 768px) {
		input[type="range"] {
			height: 36px;
			padding: 0 8px;
		}
		
		input[type="range"]::-webkit-slider-thumb {
			width: 24px;
			height: 24px;
		}
	}
</style> 