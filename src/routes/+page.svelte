<script lang="ts">
	import { onMount } from 'svelte';
	import { Laptop2, User, Terminal, Settings } from 'lucide-svelte';
	import Window from '$lib/components/Window.svelte';
	import Dock from '$lib/components/Dock.svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import BootScreen from '$lib/components/BootScreen.svelte';
	import { windows } from '$lib/stores/windows';

	let isMobile = false;
	let isBootComplete = false;
	let dockComponent: any;

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	function handleWindowClose(id: string) {
		windows.remove(id);
	}

	function handleWindowFocus(id: string) {
		windows.setActive(id);
	}

	function handleWindowMinimize(id: string) {
		if (isMobile) {
			handleWindowClose(id);
			return;
		}
		windows.minimize(id);
	}

	function handleBootComplete() {
		isBootComplete = true;
		if (dockComponent) {
			dockComponent.startAnimation();
		}
	}
</script>

<div class="relative h-screen w-screen overflow-hidden">
	<!-- Wallpaper -->
	<div class="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-950">
		<div 
			class="absolute inset-0 bg-cover bg-center opacity-50"
			style="background-image: url('/images/wallpaper.jpeg')"
		></div>
		<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
	</div>

	<BootScreen on:bootComplete={handleBootComplete} />
	<StatusBar />

	<!-- Desktop Area -->
	<div class="relative h-full w-full pt-7">
		{#each $windows as window (window.id)}
			<Window
				{...window}
				on:close={() => handleWindowClose(window.id)}
				on:focus={() => handleWindowFocus(window.id)}
				on:minimize={() => handleWindowMinimize(window.id)}
			>
				{#if window.content}
					<div class="prose prose-invert">
						{@html window.content}
					</div>
				{/if}
			</Window>
		{/each}
	</div>

	<Dock bind:this={dockComponent} />
</div>
