<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { isAuthenticated } from '$lib/stores/auth';
    import { X } from 'lucide-svelte';

    const dispatch = createEventDispatcher();
    let password = '';
    let error = '';

    function handleLogin() {
        if (isAuthenticated.login(password)) {
            dispatch('close');
        } else {
            error = 'Invalid password';
            password = '';
        }
    }
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="w-96 p-6 rounded-xl bg-slate-900 border border-slate-700/50">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-white">Admin Login</h3>
            <button 
                class="p-1.5 rounded-lg hover:bg-slate-800/50"
                on:click={() => dispatch('close')}
            >
                <X class="w-4 h-4 text-white/70" />
            </button>
        </div>
        
        <form on:submit|preventDefault={handleLogin} class="space-y-4">
            <div>
                <label class="block text-sm text-white/70 mb-1">Password</label>
                <input 
                    type="password" 
                    bind:value={password}
                    class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                    placeholder="Enter admin password"
                >
            </div>
            
            {#if error}
                <div class="text-sm text-red-400">{error}</div>
            {/if}
            
            <button 
                type="submit"
                class="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
                Login
            </button>
        </form>
    </div>
</div> 