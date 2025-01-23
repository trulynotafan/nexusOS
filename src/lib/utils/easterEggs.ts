export const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

export function setupEasterEggs() {
	document.addEventListener('keydown', (e) => {
		if (e.key === konami[konamiIndex]) {
			konamiIndex++;
			if (konamiIndex === konami.length) {
				// Trigger matrix effect
				document.documentElement.classList.add('matrix-mode');
				setTimeout(() => {
					document.documentElement.classList.remove('matrix-mode');
				}, 5000);
				konamiIndex = 0;
			}
		} else {
			konamiIndex = 0;
		}
	});
} 