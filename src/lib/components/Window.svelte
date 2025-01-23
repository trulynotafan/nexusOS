<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import { elasticOut, backOut, quintOut } from 'svelte/easing';
	import type { Position } from '$lib/types';
	import { Maximize2, Minus, X } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import { WINDOW_WIDTH, WINDOW_HEIGHT, STATUS_BAR_HEIGHT, MARGIN } from '$lib/utils/windowPosition';

	// Add isMobile state
	let isMobile = false;
	
	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});
	
	function checkMobile() {
		isMobile = window.innerWidth < 768; // 768px is typical tablet/mobile breakpoint
		if (isMobile) {
			isMaximized = true;
		}
	}

	export let title: string;
	export let position: Position;
	export let isMinimized = false;
	export let isMaximized = false;
	export let isOpening = false;
	// Remove unused icon prop or use it if needed
	// export let icon: string;

	const dispatch = createEventDispatcher();

	let isDragging = false;
	let startPosition: Position;
	let startMousePosition: Position;
	let windowRef: HTMLDivElement;
	let currentPosition = { ...position };
	let transform = '';
	let animationFrameId: number;
	let lastMousePosition = { x: 0, y: 0 };
	let windowWidth = WINDOW_WIDTH;
	let windowHeight = WINDOW_HEIGHT;
	let statusBarHeight = STATUS_BAR_HEIGHT;

	// Add window focus glow effect
	let isGlowing = false;
	let isClosing = false;
	const openAnimationDuration = 800;
	const closeAnimationDuration = 300;

	// Add a mounting animation state
	let isMounting = true;
	
	onMount(() => {
		isMounting = false;
	});

	function handleWindowClick() {
		isGlowing = true;
		setTimeout(() => isGlowing = false, 700);
		dispatch('focus');
	}

	function constrainPosition(pos: Position): Position {
		if (!windowRef) return pos;

		const bounds = {
			top: statusBarHeight,
			right: window.innerWidth - windowWidth - MARGIN,
			bottom: window.innerHeight - windowHeight - MARGIN,
			left: MARGIN
		};

		return {
			x: Math.max(bounds.left, Math.min(bounds.right, pos.x)),
			y: Math.max(bounds.top, Math.min(bounds.bottom, pos.y))
		};
	}

	function updateWindowPosition(mouseX: number, mouseY: number) {
		if (!isDragging) return;

		const dx = mouseX - startMousePosition.x;
		const dy = mouseY - startMousePosition.y;

		const newPosition = constrainPosition({
			x: startPosition.x + dx,
			y: startPosition.y + dy
		});

		transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
		currentPosition = newPosition;
		lastMousePosition = { x: mouseX, y: mouseY };

		animationFrameId = requestAnimationFrame(() => 
			updateWindowPosition(lastMousePosition.x, lastMousePosition.y)
		);
	}

	function handleDragStart(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.closest('button')) return;
		if (isMobile || isMaximized) return;

		isDragging = true;
		startPosition = { ...currentPosition };
		startMousePosition = { x: event.clientX, y: event.clientY };
		lastMousePosition = { x: event.clientX, y: event.clientY };
		
		event.preventDefault();
		window.getSelection()?.removeAllRanges();
		
		// Start the animation loop
		animationFrameId = requestAnimationFrame(() => 
			updateWindowPosition(event.clientX, event.clientY)
		);
		
		dispatch('focus');
	}

	function handleDrag(event: MouseEvent) {
		if (!isDragging) return;
		lastMousePosition = { x: event.clientX, y: event.clientY };
	}

	function handleDragEnd() {
		if (!isDragging) return;
		
		isDragging = false;
		cancelAnimationFrame(animationFrameId);
		
		// Update the actual position
		const matrix = new DOMMatrix(getComputedStyle(windowRef).transform);
		currentPosition = {
			x: matrix.m41,
			y: matrix.m42
		};
		transform = '';
		position = { ...currentPosition };
	}

	$: if (windowRef) {
		currentPosition = constrainPosition(currentPosition);
	}

	function handleClose() {
		isClosing = true;
		// Wait for animation to complete before dispatching close
		setTimeout(() => {
			dispatch('close');
		}, closeAnimationDuration);
	}

	function handleMinimize() {
		dispatch('minimize');
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	// Update mobile close handler
	function handleMobileClose() {
		handleClose();
	}

	// Update window style computation to include CSS variables
	$: windowStyle = isMobile || isMaximized 
		? 'inset-0' 
		: `--window-x: ${currentPosition.x}px; --window-y: ${currentPosition.y}px; transform: ${transform || `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`}`;

	// Add a state to track animation completion
	let hasAnimationCompleted = false;

	onMount(() => {
		// Set animation completed after the duration
		setTimeout(() => {
			hasAnimationCompleted = true;
		}, 400); // Match with animation duration
	});

	// Add cleanup for animation frame
	onDestroy(() => {
		isDragging = false;
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<svelte:window 
	on:mousemove={handleDrag} 
	on:mouseup={handleDragEnd}
	on:mouseleave={handleDragEnd}
	on:keydown={(e) => e.key === 'Escape' && handleClose()} 
/>

{#if !isMinimized && !isClosing}
	<div
		bind:this={windowRef}
		class="absolute flex flex-col rounded-xl border border-blue-500/20 bg-slate-900/85 shadow-lg backdrop-blur-md {isGlowing ? 'window-glow' : ''} 
			{isMobile || isMaximized ? 'fixed w-full h-full rounded-none safe-area-inset' : 'w-[380px] h-[500px]'}
			{isDragging ? 'cursor-grabbing will-change-transform' : 'cursor-grab'}
			{isOpening ? 'scale-up' : ''}"
		style="{windowStyle}"
		on:mousedown={handleWindowClick}
		role="dialog"
		aria-labelledby="window-title"
		in:scale={{
			duration: openAnimationDuration,
			delay: 0,
			opacity: 0,
			start: 0.8,
			easing: backOut
		}}
		out:scale={{
			duration: closeAnimationDuration,
			opacity: 0,
			start: 1,
			end: 0.95,
			easing: quintOut
		}}
	>
		<!-- Window Header -->
		<div
			class="flex h-9 items-center justify-between rounded-t-xl border-b border-blue-500/20 bg-slate-800/50 {isMobile ? 'px-4' : 'px-3'} backdrop-blur-sm"
			on:mousedown={handleDragStart}
			role="toolbar"
			tabindex="0"
		>
			<div class="flex items-center gap-2">
				<div class="flex space-x-2 {isMobile ? 'hidden' : ''}">
					<!-- Close button -->
					<button
						class="group h-4 w-4 rounded-full bg-red-500/90 hover:bg-red-600 transition-all duration-200 flex items-center justify-center"
						on:click|stopPropagation={handleClose}
						aria-label="Close window"
					>
						<span class="opacity-0 group-hover:opacity-100 inline-flex items-center justify-center text-[10px] text-red-100 h-full w-full">×</span>
					</button>
					<!-- Minimize button -->
					<button
						class="group h-4 w-4 rounded-full bg-yellow-500/90 hover:bg-yellow-600 transition-all duration-200 flex items-center justify-center"
						on:click|stopPropagation={() => dispatch('minimize')}
						aria-label="Minimize window"
					>
						<span class="opacity-0 group-hover:opacity-100 inline-flex items-center justify-center text-[10px] text-yellow-100 h-full w-full">-</span>
					</button>
					<!-- Maximize button -->
					<button
						class="group h-4 w-4 rounded-full bg-green-500/30 cursor-not-allowed transition-all duration-200 flex items-center justify-center"
						on:click|stopPropagation|preventDefault={() => {}}
						aria-label="Maximize window (not available)"
						disabled
					>
						<span class="opacity-0 group-hover:opacity-100 inline-flex items-center justify-center text-[10px] text-green-100/50 h-full w-full">+</span>
					</button>
				</div>
				<span id="window-title" class="ml-2 text-sm font-medium text-white/90">{title}</span>
			</div>
			{#if isMobile}
				<button
					class="flex items-center justify-center w-10 h-8 -mr-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 transition-all duration-200"
					on:click={handleMobileClose}
					aria-label="Close window"
				>
					<X class="w-5 h-5 text-red-100" strokeWidth={2.5} />
				</button>
			{/if}
		</div>

		<!-- Window Content -->
		<div 
			class="flex-1 overflow-y-auto overflow-x-hidden {isMobile ? 'p-5 sm:p-4' : 'p-4'} prose prose-invert relative"
			in:fly={{ y: 40, duration: 500, delay: 100, easing: backOut }}
			out:fly={{ y: 20, duration: 250, easing: quintOut }}
		>
			<div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
			<slot></slot>
		</div>
	</div>
{:else}
	<div
		out:scale={{
			duration: 300,
			start: 1,
			opacity: 0,
			easing: quintOut
		}}
	></div>
{/if}

<style>
	/* Window controls */
	button {
		transition: all 0.2s;
		position: relative;
	}
	button:hover {
		transform: scale(1.15);
	}
	button::after {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 9999px;
		background: radial-gradient(circle at center, currentColor 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.2s;
	}
	button:hover::after {
		opacity: 0.2;
	}

	/* Scrollbar styling */
	.prose {
		scrollbar-width: thin;
		scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
	}
	.prose::-webkit-scrollbar {
		width: 6px;
	}
	.prose::-webkit-scrollbar-track {
		background: transparent;
	}
	.prose::-webkit-scrollbar-thumb {
		background-color: rgba(59, 130, 246, 0.3);
		border-radius: 3px;
		transition: background-color 0.2s;
	}
	.prose::-webkit-scrollbar-thumb:hover {
		background-color: rgba(59, 130, 246, 0.5);
	}

	/* Add fade effect at the bottom of scrollable content */
	.prose::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9));
		pointer-events: none;
	}

	/* Window glow effect */
	.window-glow {
		box-shadow: 0 0 15px 2px rgba(59, 130, 246, 0.3),
					0 4px 6px -1px rgba(0, 0, 0, 0.1),
					0 2px 4px -1px rgba(0, 0, 0, 0.06);
		border-color: rgba(59, 130, 246, 0.4);
	}

	/* Glass morphism base */
	div[role="dialog"] {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
					0 2px 4px -1px rgba(0, 0, 0, 0.06),
					inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
		transform: none;
	}

	/* Hover effect on window */
	div[role="dialog"]:hover {
		border-color: rgba(59, 130, 246, 0.3);
		box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.2),
					0 4px 6px -1px rgba(0, 0, 0, 0.12),
					inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
	}

	/* Easter egg animation */
	@keyframes rainbow {
		0% { border-color: rgba(59, 130, 246, 0.3); }
		33% { border-color: rgba(139, 92, 246, 0.3); }
		66% { border-color: rgba(236, 72, 153, 0.3); }
		100% { border-color: rgba(59, 130, 246, 0.3); }
	}

	div[role="dialog"]:active {
		animation: rainbow 2s linear;
	}

	/* Mobile optimizations */
	.safe-area-inset {
		padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
	}

	@media (max-width: 768px) {
		.prose {
			font-size: 0.95rem;
			line-height: 1.6;
		}

		.prose h1 {
			font-size: 1.75rem;
		}

		.prose h2 {
			font-size: 1.5rem;
		}
	}

	/* Update dragging styles */
	div[role="dialog"] {
		touch-action: none;
		user-select: none;
		will-change: transform;
		transform-origin: center center;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		/* Only apply transition to transform property */
		transition: transform 0.05s cubic-bezier(0.17, 0.93, 0.38, 1);
	}

	.cursor-grabbing {
		cursor: grabbing !important;
	}

	.will-change-transform {
		will-change: transform;
		/* Remove transition during drag */
		transition: none !important;
	}

	/* Add this new style for better touch targets */
	@media (hover: none) {
		button {
			min-height: 20px;
			min-width: 20px;
		}
	}

	/* Update transition styles */
	div[role="dialog"] {
		/* Remove transition-all duration-300 from class */
	}

	@keyframes scaleUp {
		0% {
			transform: translate3d(var(--window-x), var(--window-y), 0) scale(0.9);
			opacity: 0;
		}
		100% {
			transform: translate3d(var(--window-x), var(--window-y), 0) scale(1);
			opacity: 1;
		}
	}

	.scale-up {
		animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	/* Position the window using absolute positioning */
	div[role="dialog"] {
		position: absolute;
		will-change: transform;
		transform-origin: center center;
	}
</style> 