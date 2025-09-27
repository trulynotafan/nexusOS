import { writable } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set } = writable(false);

    return {
        subscribe,
        login: async (password: string) => {
            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                
                const data = await response.json();
                if (data.success) {
                    set(true);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Auth error:', error);
                return false;
            }
        },
        logout: () => set(false)
    };
}

export const isAuthenticated = createAuthStore(); 