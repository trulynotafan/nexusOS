<script lang="ts">
	import { onMount } from 'svelte';
	import { Laptop2, User, Terminal, Mail, Github, Code2 } from 'lucide-svelte';
	import { windows, activeWindowsByApp } from '$lib/stores/windows';
	import { translations } from '$lib/stores/translations';
	import { content } from '$lib/stores/translations';
	import { hasPlayedWelcomeAnimation } from '$lib/stores/animation';

	let isMobile = false;
	let hasOpenWindows = false;
	let isBooted = false;
	let hasAnimated = false;

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	// Add state for animation completion
	let isAnimating = false;

	// Export a function to be called from parent
	export function startAnimation() {
		if ($hasPlayedWelcomeAnimation) {
			isBooted = true;
			return;
		}

		isBooted = true;
		isAnimating = true;
		// Set animation duration based on the last icon's animation
		const totalAnimationDuration = 1000 + (apps.length * 100) + 800;
		setTimeout(() => {
			isAnimating = false;
			hasPlayedWelcomeAnimation.set(true);
		}, totalAnimationDuration);
	}

	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	// Subscribe to windows store to check if any windows are open
	$: hasOpenWindows = $windows.length > 0;

	const apps = [
		{ 
			id: 'about', 
			icon: User, 
			title: 'About Me',
			iconClass: 'text-cyan-400 group-hover:text-cyan-300',
			content: `
				<link href="https://fonts.googleapis.com/css2?family=Cal+Sans:wght@600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

				<div class="space-y-6 p-2">
					<div class="space-y-3 relative">
						<div class="absolute -top-6 -right-4 text-4xl rotate-12 opacity-50">🚀</div>
						<h2 class="text-3xl font-bold text-white" style="font-family: 'Space Grotesk', sans-serif;">
							Hi, I'm <span class="text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">Afaan</span>
						</h2>
						<h3 class="text-xl font-medium" style="font-family: 'Space Grotesk', sans-serif;">
							A developer from <span class="font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent animate-pulse">Pakistan</span>
						</h3>
						<div class="absolute -left-4 top-12 text-2xl -rotate-12 opacity-50">💻</div>
					</div>

					<div class="space-y-4 text-white/90 relative">
						<div class="absolute -right-2 bottom-0 text-3xl rotate-6 opacity-50">⚡</div>
						<p class="leading-relaxed slide-in-left">
							I'm <span class="text-cyan-400 font-semibold">18 years old</span> and currently in college. 
							I'm really passionate about programming and always looking to take on small jobs to build more experience and grow my skills.
						</p>
						
						<p class="leading-relaxed slide-in-right">
							I love learning about new technologies and enjoy exploring different programming languages, tools, and practices.
						</p>
						
						<p class="leading-relaxed slide-in-left">
							To me, being a good developer means continuously learning and adapting to new things.
						</p>
					</div>

					<div class="flex gap-4 pt-4 border-t border-white/10 slide-in-bottom">
						<div class="flex items-center gap-2 text-sm">
							<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
							<span class="text-white/70">Available for work</span>
						</div>
						<div class="flex items-center gap-2 text-sm">
							<div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
							<span class="text-white/70">Open to collaborate</span>
						</div>
					</div>

					<div class="slide-in-bottom" style="animation-delay: 0.6s;">
						<a 
							href="#" 
							onclick="
								event.preventDefault();
								const messages = [
									'🏗️ Resume still under construction... like my life!',
									'📝 Resume loading... just like my career!',
									'🚧 Resume.exe has stopped working... please try again later',
									'🎮 Resume DLC coming soon™',
									'🌟 Resume is in beta... like everything else I do',
									'🔄 Still compiling my achievements... might take a while'
								];
								const randomMessage = messages[Math.floor(Math.random() * messages.length)];
								const toast = document.createElement('div');
								toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium shadow-lg border border-slate-700/50 z-[1000] fade-out';
								toast.textContent = randomMessage;
								document.body.appendChild(toast);
								setTimeout(() => toast.remove(), 3000);
							"
							class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 no-underline"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Download Resume
						</a>
					</div>
				</div>

				<style>
					@keyframes slide-in-left {
						from { transform: translateX(-20px); opacity: 0; }
						to { transform: translateX(0); opacity: 1; }
					}
					@keyframes slide-in-right {
						from { transform: translateX(20px); opacity: 0; }
						to { transform: translateX(0); opacity: 1; }
					}
					@keyframes slide-in-bottom {
						from { transform: translateY(20px); opacity: 0; }
						to { transform: translateY(0); opacity: 1; }
					}
					.slide-in-left {
						animation: slide-in-left 0.5s ease-out forwards;
					}
					.slide-in-right {
						animation: slide-in-right 0.5s ease-out forwards;
						animation-delay: 0.2s;
						opacity: 0;
					}
					.slide-in-bottom {
						animation: slide-in-bottom 0.5s ease-out forwards;
						animation-delay: 0.4s;
						opacity: 0;
					}
					.text-gradient {
						background: linear-gradient(to right, #60A5FA, #22D3EE);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						background-clip: text;
					}

					.fade-out {
						animation: fadeOut 0.3s ease-out 2.7s forwards;
					}

					@keyframes fadeOut {
						from { opacity: 1; transform: translate(-50%, 0); }
						to { opacity: 0; transform: translate(-50%, -20px); }
					}
				</style>
			`
		},
		{ 
			id: 'skills', 
			icon: Code2, 
			title: 'Skills',
			iconClass: 'text-emerald-400 group-hover:text-emerald-300',
			content: `
				<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
				
				<div class="space-y-4 p-2">
					<h2 class="text-xl font-bold text-white" style="font-family: 'Space+Grotesk', sans-serif;">
						My Skills
					</h2>

					<div class="flex gap-2 mb-4">
						<button 
							class="tab-button px-3 py-1.5 rounded-lg bg-slate-800/50 text-white text-sm font-medium hover:bg-slate-700/50 transition-colors duration-200 active-tab"
							onclick="
								document.querySelectorAll('.skill-section').forEach(s => s.style.display = 'none');
								document.getElementById('languages').style.display = 'grid';
								document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active-tab'));
								this.classList.add('active-tab');
							"
						>
							Languages
						</button>
						<button 
							class="px-3 py-1.5 rounded-lg bg-slate-800/50 text-white text-sm font-medium hover:bg-slate-700/50 transition-all duration-200 tab-button"
							onclick="
								document.querySelectorAll('.skill-section').forEach(s => s.style.display = 'none');
								document.getElementById('databases').style.display = 'grid';
								document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active-tab'));
								this.classList.add('active-tab');
							"
						>
							Databases
						</button>
						<button 
							class="px-3 py-1.5 rounded-lg bg-slate-800/50 text-white text-sm font-medium hover:bg-slate-700/50 transition-all duration-200 tab-button"
							onclick="
								document.querySelectorAll('.skill-section').forEach(s => s.style.display = 'none');
								document.getElementById('tools').style.display = 'grid';
								document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active-tab'));
								this.classList.add('active-tab');
							"
						>
							Tools
						</button>
					</div>

					<style>
						.tab-button {
							position: relative;
							overflow: hidden;
							border: 1px solid transparent;
							transition: background-color 0.2s ease, border-color 0.2s ease;
						}
						.active-tab {
							background-color: rgb(30 41 59 / 0.7) !important;
							border-color: rgba(59, 130, 246, 0.2);
						}
						.skill-section:not(#languages) {
							display: none;
						}
						.skill-section {
							animation: fadeIn 0.3s ease-out;
						}
						@keyframes fadeIn {
							from { opacity: 0; transform: translateY(10px); }
							to { opacity: 1; transform: translateY(0); }
						}
					</style>

					<div id="languages" class="skill-section grid grid-cols-2 gap-3">
						<div class="group relative">
							<div class="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" class="w-6 h-6" />
								<div class="flex-1">
									<div class="font-medium text-sm text-white">JavaScript</div>
									<div class="text-[10px] text-emerald-400">Intermediate</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">TypeScript</div>
									<div class="text-xs text-blue-400">Intermediate</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">Node.js</div>
									<div class="text-xs text-green-400">Advanced</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">PHP</div>
									<div class="text-xs text-purple-400">Beginner</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">HTML/CSS</div>
									<div class="text-xs text-orange-400">Master</div>
								</div>
							</div>
						</div>
					</div>

					<div id="databases" class="skill-section hidden grid grid-cols-2 gap-4">
						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">MongoDB</div>
									<div class="text-xs text-green-400">Advanced</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">MySQL</div>
									<div class="text-xs text-blue-400">Intermediate</div>
								</div>
							</div>
						</div>
					</div>

					<div id="tools" class="skill-section hidden grid grid-cols-2 gap-4">
						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">GitHub</div>
									<div class="text-xs text-slate-400">Advanced</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">VS Code</div>
									<div class="text-xs text-blue-400">Master</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://www.cursor.so/favicon.ico" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">Cursor</div>
									<div class="text-xs text-purple-400">Advanced</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://citadel.org/favicon.ico" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">Citadel</div>
									<div class="text-xs text-cyan-400">Intermediate</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">Docker</div>
									<div class="text-xs text-blue-400">Intermediate</div>
								</div>
							</div>
						</div>

						<div class="group relative">
							<div class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200">
								<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" class="w-8 h-8" />
								<div class="flex-1">
									<div class="font-medium text-white">Nginx</div>
									<div class="text-xs text-green-400">Advanced</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
		},
		{ 
			id: 'projects', 
			icon: Laptop2, 
			title: 'Projects',
			iconClass: 'text-purple-400 group-hover:text-purple-300',
			content: `
				<div class="h-full flex flex-col overflow-hidden">
					<h2 class="text-2xl font-bold text-white p-2" style="font-family: 'Space Grotesk', sans-serif;">
						My Projects
					</h2>

					<!-- Single scrollable container for all projects -->
					<div class="flex-1 overflow-y-auto px-2">
						<div class="space-y-4">
							<!-- All your project cards here -->
							<!-- Project 1 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">Nexus OS</h3>
										<p class="text-sm text-blue-400">Personal Project</p>
									</div>
									<div class="flex gap-2">
										<a href="#" class="text-white/60 hover:text-white transition-colors">
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
											</svg>
										</a>
										<a href="#" class="text-white/60 hover:text-white transition-colors">
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
											</svg>
										</a>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									A modern OS-like portfolio website built with SvelteKit and TailwindCSS. Features window management, dock animations, and system-like UI components.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">TypeScript</span>
									<span class="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">SvelteKit</span>
									<span class="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">TailwindCSS</span>
								</div>
							</div>

							<!-- ForgeWEB Project (moved up) -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">ForgeWEB</h3>
										<p class="text-sm text-indigo-400">Personal Website</p>
									</div>
									<div class="flex gap-2">
										<a href="https://forgeweb.uk" target="_blank" class="text-white/60 hover:text-white transition-colors">
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
											</svg>
										</a>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									My personal web development website showcasing services, portfolio, and web development expertise.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">React</span>
									<span class="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">HTML/CSS</span>
									<span class="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">JavaScript</span>
								</div>
							</div>

							<!-- Project 2 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">TaskFlow Hub</h3>
										<p class="text-sm text-green-400">Backend Project</p>
									</div>
									<div class="flex gap-2">
										<a href="#" class="text-white/60 hover:text-white transition-colors">
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
											</svg>
										</a>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									RESTful API for task management with authentication, task scheduling, and team collaboration features.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">Node.js</span>
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">TypeScript</span>
									<span class="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">MongoDB</span>
								</div>
							</div>

							<!-- Project 3 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">PixelMart</h3>
										<p class="text-sm text-purple-400">Full Stack Project</p>
									</div>
									<div class="flex gap-2">
										<a href="#" class="text-white/60 hover:text-white transition-colors">
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
											</svg>
										</a>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									Modern e-commerce platform with real-time inventory, payment processing, and admin dashboard.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">TypeScript</span>
									<span class="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">PHP</span>
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">MySQL</span>
								</div>
							</div>

							<!-- Project 4 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">CloudForge CI</h3>
										<p class="text-sm text-cyan-400">Infrastructure Project</p>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									Automated CI/CD pipeline with containerization, load balancing, and monitoring setup.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">Docker</span>
									<span class="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">Nginx</span>
									<span class="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-400">GitHub Actions</span>
								</div>
							</div>

							<!-- Project 5 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">ChatterSync</h3>
										<p class="text-sm text-emerald-400">Web Application</p>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									Real-time messaging application with rooms, file sharing, and user presence indicators.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">JavaScript</span>
									<span class="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">Node.js</span>
									<span class="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">MongoDB</span>
								</div>
							</div>

							<!-- Project 6 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">ContentFlow CMS</h3>
										<p class="text-sm text-orange-400">Backend Project</p>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									Headless CMS with API endpoints, media management, and user roles/permissions.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">PHP</span>
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">MySQL</span>
									<span class="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">HTML/CSS</span>
								</div>
							</div>

							<!-- Project 7 -->
							<div class="group rounded-xl border border-blue-500/20 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold text-white">SkyPulse</h3>
										<p class="text-sm text-blue-400">Frontend Project</p>
									</div>
								</div>
								<p class="mt-3 text-sm text-white/80">
									Interactive weather dashboard with location tracking, forecasts, and weather alerts.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">TypeScript</span>
									<span class="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">HTML/CSS</span>
									<span class="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">JavaScript</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<style>
					.overflow-y-auto {
						scrollbar-width: thin;
						scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
					}
					.overflow-y-auto::-webkit-scrollbar {
						width: 6px;
					}
					.overflow-y-auto::-webkit-scrollbar-track {
						background: transparent;
					}
					.overflow-y-auto::-webkit-scrollbar-thumb {
						background-color: rgba(59, 130, 246, 0.3);
						border-radius: 3px;
					}
					.overflow-y-auto::-webkit-scrollbar-thumb:hover {
						background-color: rgba(59, 130, 246, 0.5);
					}

					/* Add these styles for GitHub links */
					a {
						text-decoration: none !important;
					}
					a:hover {
						text-decoration: none !important;
					}
					.prose a {
						text-decoration: none !important;
						border-bottom: none !important;
					}
					svg {
						text-decoration: none !important;
					}
				</style>
			`
		},
		{ 
			id: 'terminal', 
			icon: Terminal, 
			title: 'Terminal',
			iconClass: 'text-violet-400 group-hover:text-violet-300',
			content: `
				<div class="font-mono text-sm">
					<div class="mb-4 space-y-1">
						<div class="flex items-center gap-2">
							<span class="text-blue-400">Nexus</span>
							<span class="text-white/50">OS</span>
							<span class="text-xs text-white/30">v1.0.0</span>
						</div>
						<div class="text-white/50 text-xs">Made by Afaan</div>
						<div class="text-white/60 text-xs">Type 'help' to see available commands</div>
					</div>

					<div id="terminal-output" class="space-y-2 h-[300px] overflow-y-auto mb-4">
						<!-- Terminal output will appear here -->
					</div>

					<div class="flex items-center gap-2 mt-2 sticky bottom-0 bg-slate-900/95 backdrop-blur py-2">
						<span class="text-blue-400/90">guest@nexus</span>
						<span class="text-white/50">~</span>
						<span class="text-blue-400/90">$</span>
						<input 
							type="text" 
							class="flex-1 bg-transparent border-none outline-none text-white/90 focus:ring-0 p-0 text-sm"
							placeholder="Type a command..."
							onkeydown="
								if(event.key === 'Enter') {
									const cmd = this.value.trim().toLowerCase();
									const output = document.getElementById('terminal-output');
									
									const cmdLine = document.createElement('div');
									cmdLine.className = 'flex items-center gap-2 text-sm';
									cmdLine.innerHTML = '<span class=\\'text-blue-400/90\\'>guest@nexus</span><span class=\\'text-white/50\\'>~</span><span class=\\'text-blue-400/90\\'>$</span><span class=\\'text-white/90\\'>' + this.value + '</span>';
									output.appendChild(cmdLine);

									const response = document.createElement('div');
									response.className = 'pl-4 text-sm';

									if (cmd === 'help') {
										response.innerHTML = '<div class=\\'text-blue-300 font-medium mb-1\\'>Available Commands:</div><div class=\\'space-y-1 text-white/80\\'><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>help</span><span class=\\'text-white/60\\'>Display this help message</span></div><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>getcat</span><span class=\\'text-white/60\\'>Fetch a random cute cat picture</span></div><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>clear</span><span class=\\'text-white/60\\'>Clear the terminal</span></div><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>happy</span><span class=\\'text-white/60\\'>Spread some happiness!</span></div><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>matrix</span><span class=\\'text-white/60\\'>Enter the Matrix</span></div><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>destruct</span><span class=\\'text-white/60\\'>Initiate self-destruct sequence</span></div><div class=\\'flex items-start\\'><span class=\\'w-16 text-blue-400\\'>aboutme</span><span class=\\'text-white/60\\'>Who am I?</span></div><div class=\\'text-white/40 text-xs\\'>More commands coming soon...</div></div>';
									} else if (cmd === 'aboutme') {
										response.innerHTML = '<div class=\\'space-y-4 font-mono\\'><pre class=\\'text-blue-400\\'>    ______________\\n   /              \\\\\\n  /   ⚡  \\\\__/  ⚡   \\\\\\n |    (◕‿◕)         |\\n |     [👓]         |  < Hey there!\\n  \\\\     ▽          /\\n   \\\\______________/</pre><div class=\\'space-y-2 text-sm\\'><div class=\\'text-green-400 font-bold\\'>$ whoami</div><div class=\\'pl-4 text-white/90\\'>→ Just your friendly neighborhood 18-year-old dev from Pakistan 🇵🇰</div><div class=\\'text-green-400 font-bold\\'>$ cat personality.txt</div><div class=\\'pl-4 text-white/90\\'>→ Goofy kid with cool glasses 👓<br>→ Passionate about coding 💻<br>→ Always learning new things 📚<br>→ Love building stuff that works ⚡</div><div class=\\'text-green-400 font-bold\\'>$ ls ./hobbies</div><div class=\\'pl-4 text-white/90\\'>→ Coding (obviously!) 🚀<br>→ Learning new technologies 💡<br>→ Breaking and fixing things 🔧<br>→ Building cool projects ✨</div></div><div class=\\'text-xs text-blue-400/70 mt-4\\'>Type \\'help\\' to see what else I can do!</div></div>';
									} else if (cmd === 'matrix') {
										response.innerHTML = '<div class=\\'text-green-400 mb-2\\'>Entering the Matrix...</div>';
										output.appendChild(response);
										
										const matrix = document.createElement('div');
										matrix.className = 'matrix-rain';
										matrix.style.cssText = 'height: 200px; overflow: hidden; font-family: monospace;';
										output.appendChild(matrix);
										
										const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
										const columns = 35;
										
										for (let i = 0; i < columns; i++) {
											const drop = document.createElement('div');
											drop.className = 'matrix-drop';
											drop.style.cssText = 'position: relative; display: inline-block; width: ' + (100/columns) + '%; text-align: center; animation: matrix-fall ' + (Math.random() * 2 + 1) + 's linear infinite; animation-delay: ' + (Math.random() * 2) + 's;';
											
											const updateDrop = () => {
												let text = '';
												for (let j = 0; j < 10; j++) {
													text += chars[Math.floor(Math.random() * chars.length)];
												}
												drop.innerHTML = text.split('').map((char, index) => 
													'<span style=\\'color: rgba(74, 222, 128, ' + (1 - index * 0.1) + ');\\' >' + char + '</span>'
												).join('');
											};
											
											updateDrop();
											setInterval(updateDrop, 100);
											matrix.appendChild(drop);
										}
										
										const style = document.createElement('style');
										style.textContent = '@keyframes matrix-fall { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } } .matrix-rain { display: flex; justify-content: space-between; background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; } .matrix-drop { font-size: 12px; line-height: 1; }';
										document.head.appendChild(style);
										
										setTimeout(() => {
											matrix.innerHTML = '<div class=\\'text-green-400 text-center\\'>Connection terminated.</div>';
											setTimeout(() => matrix.remove(), 1000);
										}, 30000);
										
										return;
									} else if (cmd === 'getcat') {
										const catWindow = document.createElement('div');
										catWindow.innerHTML = '<div class=\\'text-blue-300 mb-2\\'>🐱 Fetching a cute cat...</div>';
										output.appendChild(catWindow);
										
										try {
											const cats = ['cat.png', 'cat1.png', 'cat2.png', 'cat3.png'];
											const randomCat = cats[Math.floor(Math.random() * cats.length)];
											
											catWindow.innerHTML = '<div class=\\'space-y-2\\'>' +
												'<div class=\\'text-green-400\\'>✨ Here\\'s your cute cat!</div>' +
												'<div class=\\'rounded-lg overflow-hidden max-w-[300px] border border-blue-500/20\\'>' +
												'<img src=\\'/images/' + randomCat + '\\' alt=\\'Random cat\\' class=\\'w-full h-auto\\' />' +
												'</div>' +
												'<div class=\\'text-xs text-white/60\\'>🎉 Meow! Type getcat again for another cat!</div>' +
												'</div>';
										} catch (error) {
											catWindow.innerHTML = '<div class=\\'text-red-400 mb-2\\'>😿 Failed to fetch cat. They must be napping!</div>';
										}
									} else if (cmd === 'happy') {
										response.innerHTML = '<div class=\\'space-y-2\\'>' +
											'<pre class=\\'text-yellow-400 font-mono\\'>   \\\\  ^__^   //' + 
											'\\n     \\\\ (ᵔᴥᵔ) //' + 
											'\\n       \\\\__/</pre>' +
											'<div class=\\'text-green-400 font-medium\\'>✨ Keep smiling! You\\'re doing great! ✨</div>' +
											'<div class=\\'text-xs text-white/60\\'>Remember: Every small step forward is progress! 🌟</div>' +
											'</div>';
									} else if (cmd === 'clear') {
										output.innerHTML = '';
										return; // Skip adding command to history
									} else if (cmd === 'destruct') {
										response.innerHTML = '<div class=\\'text-red-400 font-bold\\'>⚠️ INITIATING SELF-DESTRUCT SEQUENCE ⚠️</div>';
										output.appendChild(response);
										
										let countdown = 5;
										const countdownDiv = document.createElement('div');
										countdownDiv.className = 'text-red-400 text-xl font-bold text-center my-4 animate-pulse';
										output.appendChild(countdownDiv);
										
										const interval = setInterval(() => {
											if (countdown > 0) {
												countdownDiv.innerHTML = countdown + ' seconds remaining...';
												countdown--;
											} else {
												clearInterval(interval);
												countdownDiv.className = 'text-green-400 text-xl font-bold text-center my-4';
												countdownDiv.innerHTML = '😅 Just kidding! This computer will self-destruct... never! 🎉';
											}
										}, 1000);
										return;
									} else if (cmd) {
										response.innerHTML = '<div class=\\'text-red-400\\'>Error: The command \\'' + this.value + '\\' has not been invented yet. Wanna code it? 🚀</div><div class=\\'text-white/40 text-xs\\'>Meanwhile, try \\'help\\' to see what we\\'ve got!</div>';
									}

									if (cmd) {
										output.appendChild(response);
										setTimeout(() => {
											output.scrollTo({
												top: output.scrollHeight,
												behavior: 'smooth'
											});
										}, 100);
									}

									this.value = '';
								}
							"
						>
					</div>
				</div>

				<style>
					input::placeholder {
						color: rgba(255, 255, 255, 0.2);
					}
					#terminal-output {
						scrollbar-width: thin;
						scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
						scroll-behavior: smooth;
						overflow-y: auto;
					}
					#terminal-output::-webkit-scrollbar {
						width: 6px;
					}
					#terminal-output::-webkit-scrollbar-track {
						background: transparent;
					}
					#terminal-output::-webkit-scrollbar-thumb {
						background-color: rgba(59, 130, 246, 0.3);
						border-radius: 3px;
					}
					#terminal-output::-webkit-scrollbar-thumb:hover {
						background-color: rgba(59, 130, 246, 0.5);
					}
					.sticky {
						position: sticky;
						bottom: 0;
						z-index: 10;
						border-top: 1px solid rgba(59, 130, 246, 0.1);
					}
				</style>
			`
		},
		{ 
			id: 'github', 
			icon: Github, 
			title: 'GitHub',
			iconClass: 'text-slate-400 group-hover:text-slate-300',
			content: `
				<div class="space-y-6 p-4">
					<div class="flex items-center gap-4">
						<div class="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center">
							<svg class="w-10 h-10 text-white/80" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
							</svg>
						</div>
						<div>
							<h2 class="text-2xl font-bold text-white">Find me on GitHub</h2>
							<p class="text-white/60">Check out my latest projects and contributions</p>
						</div>
					</div>

					<div class="rounded-xl border border-blue-500/20 bg-slate-800/50 p-4">
						<div class="flex items-center justify-between mb-3">
							<div class="flex items-center gap-2">
								<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
								</svg>
								<span class="font-medium text-white">Quick Stats</span>
							</div>
						</div>
						<div class="grid grid-cols-2 gap-4 text-sm">
							<div class="flex items-center gap-2">
								<div class="w-2 h-2 rounded-full bg-green-400"></div>
								<span class="text-white/60">Active Projects</span>
							</div>
							<div class="flex items-center gap-2">
								<div class="w-2 h-2 rounded-full bg-blue-400"></div>
								<span class="text-white/60">Open Source Contributor</span>
							</div>
						</div>
					</div>

					<a 
						href="https://github.com/trulynotafan" 
						target="_blank" 
						class="group flex items-center justify-between p-4 rounded-xl border border-blue-500/20 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 no-underline"
					>
						<div class="flex items-center gap-3">
							<svg class="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
							</svg>
							<div>
								<div class="font-medium text-white">github.com/trulynotafan</div>
								<div class="text-sm text-white/60">View my GitHub profile</div>
							</div>
						</div>
					</a>

					<div class="text-xs text-white/40 text-center">
						🚀 Always coding, always learning!
					</div>
				</div>
			`
		},
		{ 
			id: 'contact', 
			icon: Mail, 
			title: 'Contact Me',
			iconClass: 'text-indigo-400 group-hover:text-indigo-300',
			content: `
				<div class="space-y-6 p-2">
					<style>
						a {
							text-decoration: none !important;
						}
						.prose a {
							text-decoration: none !important;
							border-bottom: none !important;
						}
						.contact-link {
							text-decoration: none !important;
							border-bottom: none !important;
						}
						.github-link {
							text-decoration: none !important;
							border-bottom: none !important;
						}
					</style>

					<div class="flex items-center gap-4">
						<div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
							<svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
							</svg>
						</div>
						<div>
							<h2 class="text-2xl font-bold text-white">Let's Connect!</h2>
							<p class="text-white/60">Choose your preferred way to reach out</p>
						</div>
					</div>

					<div class="grid gap-4">
						<a href="mailto:trulynotafan@gmail.com" class="contact-link group flex items-center justify-between p-4 rounded-xl border border-blue-500/20 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
									<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
									</svg>
								</div>
								<div>
									<div class="font-medium text-white">Email</div>
									<div class="text-sm text-white/60">trulynotafan@gmail.com</div>
								</div>
							</div>
							<span class="text-white/30 group-hover:text-white/60 transition-colors text-sm">Send an email →</span>
						</a>

						<a href="https://discord.com/users/wpje" target="_blank" class="contact-link group flex items-center justify-between p-4 rounded-xl border border-indigo-500/20 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
									<svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
										<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
									</svg>
								</div>
								<div>
									<div class="font-medium text-white">Discord</div>
									<div class="text-sm text-white/60">wpje</div>
								</div>
							</div>
							<span class="text-white/30 group-hover:text-white/60 transition-colors text-sm">Message on Discord →</span>
						</a>

						<a href="https://forgeweb.uk" target="_blank" class="contact-link group flex items-center justify-between p-4 rounded-xl border border-purple-500/20 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
									<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9"/>
									</svg>
								</div>
								<div>
									<div class="font-medium text-white">Website</div>
									<div class="text-sm text-white/60">forgeweb.uk</div>
								</div>
							</div>
							<span class="text-white/30 group-hover:text-white/60 transition-colors text-sm">Visit Website →</span>
						</a>
					</div>

					<div class="text-center space-y-2">
						<div class="text-white/40 text-sm">Response Time</div>
						<div class="flex justify-center gap-2">
							<span class="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">Email: < 24h</span>
							<span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">Discord: < 12h</span>
						</div>
					</div>
				</div>
			`
		}
	];

	// Function to chunk array into groups
	function chunkArray<T>(array: T[], size: number): T[][] {
		const chunks = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	}

	// Get chunked apps for mobile grid view
	$: appRows = isMobile ? chunkArray(apps, 3) : [apps];

	function handleAppClick(app: typeof apps[number]) {
		if (isAnimating) return; // Prevent clicks during animation
		
		// Check if there's a minimized window for this app
		let existingWindow = $windows.find(w => w.id.startsWith(app.id) && w.isMinimized);
		
		if (existingWindow) {
			// If there's a minimized window, restore it
			windows.minimize(existingWindow.id); // This will toggle isMinimized back to false
			windows.setActive(existingWindow.id);
		} else {
			// Only create a new window if there isn't a minimized one
			let windowContent = app.content;
			
			// Update content based on language
			if ($translations === 'UR') {
				windowContent = windowContent
					// About section
					.replace(/About Me/g, content.UR.about.title)
					.replace(/Hi, I'm/g, content.UR.about.greeting)
					.replace(/A developer from/g, content.UR.about.subtitle)
					.replace(/Available for work/g, content.UR.about.status[0])
					.replace(/Open to collaborate/g, content.UR.about.status[1])
					.replace(/Languages/g, content.UR.about.skills.languages)
					.replace(/Databases/g, content.UR.about.skills.databases)
					.replace(/Tools/g, content.UR.about.skills.tools)
					.replace(/Beginner/g, content.UR.about.skills.levels.beginner)
					.replace(/Intermediate/g, content.UR.about.skills.levels.intermediate)
					.replace(/Advanced/g, content.UR.about.skills.levels.advanced)
					.replace(/Master/g, content.UR.about.skills.levels.master)
					
					// Projects section
					.replace(/My Projects/g, content.UR.projects.title)
					.replace(/Personal Project/g, content.UR.projects.projectTypes.personal)
					.replace(/Backend Project/g, content.UR.projects.projectTypes.backend)
					.replace(/Frontend Project/g, content.UR.projects.projectTypes.frontend)
					.replace(/Full Stack Project/g, content.UR.projects.projectTypes.fullstack)
					.replace(/Infrastructure Project/g, content.UR.projects.projectTypes.infrastructure)
					.replace(/View on GitHub/g, content.UR.projects.viewGithub)
					.replace(/Visit Site/g, content.UR.projects.visitSite)
					
					// Terminal section
					.replace(/Type 'help' to see available commands/g, content.UR.terminal.welcome)
					.replace(/guest@nexus/g, content.UR.terminal.prompt)
					
					// Contact section
					.replace(/Let's Connect!/g, content.UR.contact.title)
					.replace(/Choose your preferred way to reach out/g, content.UR.contact.subtitle)
					.replace(/Send an email/g, content.UR.contact.email.action)
					.replace(/Message on Discord/g, content.UR.contact.discord.action)
					.replace(/Visit Website/g, content.UR.contact.website.action)
					.replace(/Email: < 24h/g, content.UR.contact.email.response)
					.replace(/Discord: < 12h/g, content.UR.contact.discord.response);
			}

			windows.add({
				id: `${app.id}-${Date.now()}`,
				title: app.title,
				icon: app.id,
				content: windowContent,
				isMaximized: false
			});
		}
	}

	// Helper function to determine label position based on grid position
	function getLabelPosition(index: number) {
		if (isMobile) {
			// For first row (indices 0-2), show labels above
			return index < 3 ? 'bottom-full mb-2' : 'top-full mt-2';
		}
		return 'bottom-full mb-2';
	}

	// Add function to handle mouse movement
	function handleMouseMove(e: MouseEvent, index: number) {
		const icons = document.querySelectorAll('.dock-icon');
		const icon = icons[index] as HTMLElement;
		
		icons.forEach((otherIcon, i) => {
			const distance = Math.abs(index - i);
			if (distance <= 2) {
				// Only scale the container, not the icon itself
				const scale = Math.max(1, 1.2 - (distance * 0.15));
				const translateY = Math.max(0, 6 - (distance * 3));
				(otherIcon as HTMLElement).style.transform = `scale(${scale}) translateY(-${translateY}px)`;
			} else {
				(otherIcon as HTMLElement).style.transform = '';
			}
		});
	}

	function handleMouseLeave() {
		const icons = document.querySelectorAll('.dock-icon');
		icons.forEach(icon => {
			(icon as HTMLElement).style.transform = '';
		});
	}

	// Add these at the top of your script
	let showMobileWarning = true;
	let shouldShowWarning = true; // New state to control entire warning visibility

	function handleWarningClose(event: MouseEvent) {
		// Don't close if clicking the info button itself
		if ((event.target as HTMLElement).closest('.info-button')) return;
		
		showMobileWarning = false;
	}

	function toggleWarning() {
		showMobileWarning = !showMobileWarning;
	}

	onMount(() => {
		if (isMobile) {
			// Auto-hide warning after 4 seconds
			setTimeout(() => {
				showMobileWarning = false;
			}, 4000);

			// Completely remove warning after 5 seconds
			setTimeout(() => {
				shouldShowWarning = false;
			}, 5000);
		}
	});
</script>

{#if isMobile && shouldShowWarning}
    {#if showMobileWarning}
        <div class="fixed top-0 left-0 right-0 z-[1000] bg-yellow-500/90 backdrop-blur-sm p-3 text-center text-sm font-medium text-yellow-950 shadow-lg animate-slideDown">
            <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>This portfolio is optimized for desktop viewing</span>
            </div>
        </div>
    {:else}
        <div class="animate-fadeOut">
            <button
                class="info-button fixed top-4 right-4 z-[1000] w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500/90 text-yellow-950 shadow-lg hover:bg-yellow-500 transition-all duration-200 animate-scaleIn"
                on:click={() => showMobileWarning = true}
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </button>
        </div>
    {/if}
{/if}

<style>
    /* Add these to your existing styles */
    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }

    @keyframes slideUp {
        from { transform: translateY(0); }
        to { transform: translateY(-100%); }
    }

    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    .animate-slideDown {
        animation: slideDown 0.5s ease-out forwards;
    }

    .animate-slideUp {
        animation: slideUp 0.3s ease-out forwards;
    }

    .animate-scaleIn {
        animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes dock-reveal {
        0% {
            transform: translate(-50%, 80px);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }

    @keyframes dock-item-reveal {
        0% {
            transform: translateY(40px) scale(0.8);
            opacity: 0;
            filter: blur(2px);
        }
        60% {
            transform: translateY(-10px) scale(1.1);
            opacity: 0.8;
            filter: blur(0px);
        }
        80% {
            transform: translateY(5px) scale(0.95);
            opacity: 0.9;
        }
        100% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }

    .dock-reveal {
        animation: dock-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        perspective: 1000px;
    }

    .dock-item-reveal {
        animation: dock-item-reveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        will-change: transform, opacity, filter;
        transform-origin: bottom;
    }
</style>

{#if !isMobile || (!hasOpenWindows && !$windows.some(w => w.id.startsWith(app.id)))}
<div 
	class="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-slate-900/70 {isMobile ? 'p-8' : 'p-3'} backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 border border-slate-700/20 
	{!$hasPlayedWelcomeAnimation && isBooted ? 'dock-reveal' : $hasPlayedWelcomeAnimation ? '' : 'opacity-0 translate-y-20'} 
	{isAnimating ? 'animation-in-progress' : ''}"
	on:mouseleave={handleMouseLeave}
>
	<div class="{isMobile ? 'grid grid-cols-2 sm:grid-cols-3 gap-8' : 'flex gap-3'}">
		{#each isMobile ? apps : apps as app, index (app.id)}
			<div 
				class="flex flex-col items-center {!$hasPlayedWelcomeAnimation && isBooted ? 'dock-item-reveal' : ''}"
				style={!$hasPlayedWelcomeAnimation ? `animation-delay: ${1000 + (index * 100)}ms` : ''}
			>
				<button
					data-app-id={app.id}
					class="dock-icon group relative flex {isMobile ? 'h-[55px] w-[55px] sm:h-[65px] sm:w-[65px]' : 'h-14 w-14'} items-center justify-center rounded-xl bg-slate-800/50 transition-all duration-75 hover:bg-slate-800/80 {$activeWindowsByApp.has(app.id) ? 'ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/20' : ''}"
					on:click={() => handleAppClick(app)}
					on:mousemove={(e) => handleMouseMove(e, index)}
				>
					<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-white/0"></div>
					<!-- Icon wrapper to prevent blur -->
					<div class="icon-wrapper flex items-center justify-center">
						<svelte:component 
							this={app.icon} 
							class="{isMobile ? 'h-8 w-8' : 'h-7 w-7'} transition-inherit {app.iconClass}" 
							strokeWidth={1.5} 
						/>
					</div>
					<div 
						class="pointer-events-none absolute {getLabelPosition(index)} rounded-lg bg-slate-800/90 px-4 py-2 text-sm font-medium text-white opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 border border-slate-700/50 z-10"
					>
						{app.title}
					</div>
				</button>
				
				{#if $activeWindowsByApp.has(app.id)}
					<div class="mt-3 h-1.5 w-1.5 rounded-full bg-blue-400/70 shadow-lg shadow-blue-400/20"></div>
				{/if}
			</div>
		{/each}
	</div>
</div>
{/if}

<div class="fixed bottom-2 left-2 text-xs text-white/40">© 2025 Afaan</div>