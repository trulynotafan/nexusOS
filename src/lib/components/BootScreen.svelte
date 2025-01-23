<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Command, Hexagon } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	let loading = 0;
	let showLogo = false;
	let isBooting = true;
	const dispatch = createEventDispatcher();

	onMount(() => {
		// Show logo first
		setTimeout(() => {
			showLogo = true;
		}, 500);

		// Start loading after logo appears
		setTimeout(() => {
			const interval = setInterval(() => {
				loading += 1;
				if (loading >= 100) {
					clearInterval(interval);
					setTimeout(() => {
						isBooting = false;
						dispatch('bootComplete');
					}, 500);
				}
			}, 20);
		}, 1500);
	});
</script>

{#if isBooting}
	<div 
		class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
		out:fade={{ duration: 1000 }}
	>
		{#if showLogo}
			<div 
				class="relative mb-8"
				in:scale={{ duration: 800, start: 0.7 }}
			>
				<Hexagon class="h-24 w-24 text-blue-400" strokeWidth={1.5}></Hexagon>
				<Command 
					class="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white" 
					strokeWidth={2}
				></Command>
			</div>

			<div 
				class="w-64 overflow-hidden rounded-full bg-purple-900/30"
				in:scale={{ duration: 500, delay: 300 }}
			>
				<div 
					class="h-1 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-200"
					style="width: {loading}%"
				></div>
			</div>

			<div 
				class="mt-4 text-sm text-purple-300/70"
				in:fade={{ duration: 200, delay: 300 }}
			>
				{#if loading < 30}
					Initializing system...
				{:else if loading < 60}
					Loading components...
				{:else if loading < 90}
					Almost there...
				{:else}
					Welcome to Nexus OS
				{/if}
			</div>
		{/if}
	</div>
{/if}

<div
	out:scale={{
		duration: 300,
		start: 1,
		opacity: 0,
		easing: quintOut,
		y: 100
	}}
></div> 