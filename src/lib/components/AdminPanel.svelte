<script lang="ts">
    import { onMount } from 'svelte';
    import { adminStore } from '$lib/stores/admin';
    import type { Skill, Project } from '$lib/stores/admin';
    import { Plus, Trash2, Edit, Save, X, Link } from 'lucide-svelte';
    import { isAuthenticated } from '$lib/stores/auth';
    import { LogOut } from 'lucide-svelte';

    let activeTab = 'skills';
    let editingSkill: Skill | null = null;
    let editingProject: Project | null = null;
    let loading = true;
    let searchTerm = '';
    
    // Subscribe to the store
    $: data = $adminStore;
    
    onMount(async () => {
        await adminStore.init();
        loading = false;
    });

    // Skill template with icon search
    async function searchIcon(name: string) {
        try {
            const response = await fetch(`https://api.iconify.design/search?query=${name}&limit=5`);
            const data = await response.json();
            if (data.icons && data.icons.length > 0) {
                return `https://api.iconify.design/logos/${data.icons[0]}.svg`;
            }
            return '';
        } catch (error) {
            console.error('Error searching icon:', error);
            return '';
        }
    }

    async function handleSkillNameChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (editingSkill) {
            editingSkill.name = input.value;
            const icon = await searchIcon(input.value);
            if (icon) editingSkill.icon = icon;
        }
    }

    async function addSkill() {
        const newSkill: Skill = {
            id: Date.now().toString(),
            name: '',
            icon: '',
            level: 'Beginner',
            category: 'Languages'
        };
        await adminStore.addSkill(newSkill);
        editingSkill = newSkill;
    }

    async function saveSkill() {
        if (editingSkill) {
            await adminStore.saveSkill(editingSkill);
            editingSkill = null;
        }
    }

    async function deleteSkill(id: string) {
        await adminStore.deleteSkill(id);
    }

    function editSkill(skill: Skill) {
        editingSkill = { ...skill };
    }

    function addProject() {
        adminStore.addProject({
            id: Date.now().toString(),
            title: '',
            description: '',
            type: '',
            technologies: []
        });
    }

    function deleteProject(id: string) {
        adminStore.deleteProject(id);
    }

    function editProject(project: Project) {
        editingProject = { ...project };
    }

    function saveProject() {
        if (editingProject) {
            adminStore.saveProject(editingProject);
            editingProject = null;
        }
    }

    function handleLogout() {
        isAuthenticated.logout();
        // Close the admin window
        windows.remove(`admin-${Date.now()}`);
    }
</script>

<div class="space-y-6">
    <!-- Add this at the top -->
    <div class="flex justify-between items-center">
        <div class="flex gap-4 border-b border-slate-700/50">
            <button 
                class="px-4 py-2 text-sm font-medium {activeTab === 'skills' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/70'}"
                on:click={() => activeTab = 'skills'}
            >
                Skills
            </button>
            <button 
                class="px-4 py-2 text-sm font-medium {activeTab === 'projects' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/70'}"
                on:click={() => activeTab = 'projects'}
            >
                Projects
            </button>
        </div>
        <button 
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
            on:click={handleLogout}
        >
            <LogOut class="w-4 h-4" />
            Logout
        </button>
    </div>

    <!-- Skills Tab -->
    {#if activeTab === 'skills'}
        <div class="space-y-4">
            <div class="flex justify-between">
                <h3 class="text-lg font-medium text-white">Manage Skills</h3>
                <button 
                    class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    on:click={addSkill}
                >
                    <Plus class="w-4 h-4" />
                    Add Skill
                </button>
            </div>

            <div class="grid gap-4">
                {#each data.skills as skill}
                    <div class="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div class="flex items-center gap-3">
                            <img src={skill.icon} alt={skill.name} class="w-8 h-8" />
                            <div>
                                <div class="font-medium text-white">{skill.name}</div>
                                <div class="text-sm text-white/60">{skill.level} • {skill.category}</div>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button 
                                class="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                on:click={() => editSkill(skill)}
                            >
                                <Edit class="w-4 h-4" />
                            </button>
                            <button 
                                class="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                on:click={() => deleteSkill(skill.id)}
                            >
                                <Trash2 class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Projects Tab -->
    {#if activeTab === 'projects'}
        <div class="space-y-4">
            <div class="flex justify-between">
                <h3 class="text-lg font-medium text-white">Manage Projects</h3>
                <button 
                    class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    on:click={addProject}
                >
                    <Plus class="w-4 h-4" />
                    Add Project
                </button>
            </div>

            <div class="grid gap-4">
                {#each data.projects as project}
                    <div class="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div>
                            <div class="font-medium text-white">{project.title}</div>
                            <div class="text-sm text-white/60">{project.type}</div>
                            <div class="mt-2 flex gap-2">
                                {#each project.technologies as tech}
                                    <span class="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button 
                                class="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                on:click={() => editProject(project)}
                            >
                                <Edit class="w-4 h-4" />
                            </button>
                            <button 
                                class="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                on:click={() => deleteProject(project.id)}
                            >
                                <Trash2 class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Edit Skill Modal -->
    {#if editingSkill}
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="w-96 p-6 rounded-xl bg-slate-900 border border-slate-700/50">
                <h3 class="text-lg font-medium text-white mb-4">Edit Skill</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Name</label>
                        <input 
                            type="text" 
                            bind:value={editingSkill.name}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                            on:input={handleSkillNameChange}
                        >
                    </div>
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Icon URL</label>
                        <input 
                            type="text" 
                            bind:value={editingSkill.icon}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                        >
                    </div>
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Level</label>
                        <select 
                            bind:value={editingSkill.level}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Master">Master</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Category</label>
                        <select 
                            bind:value={editingSkill.category}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                        >
                            <option value="Languages">Languages</option>
                            <option value="Databases">Databases</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </div>
                    <div class="flex justify-end gap-3 mt-6">
                        <button 
                            class="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                            on:click={() => editingSkill = null}
                        >
                            Cancel
                        </button>
                        <button 
                            class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                            on:click={saveSkill}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <!-- Edit Project Modal -->
    {#if editingProject}
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="w-96 p-6 rounded-xl bg-slate-900 border border-slate-700/50">
                <h3 class="text-lg font-medium text-white mb-4">Edit Project</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Title</label>
                        <input 
                            type="text" 
                            bind:value={editingProject.title}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                        >
                    </div>
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Description</label>
                        <textarea 
                            bind:value={editingProject.description}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Type</label>
                        <input 
                            type="text" 
                            bind:value={editingProject.type}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                        >
                    </div>
                    <div>
                        <label class="block text-sm text-white/70 mb-1">Technologies (comma-separated)</label>
                        <input 
                            type="text" 
                            value={editingProject.technologies.join(', ')}
                            on:input={(e) => editingProject.technologies = e.target.value.split(',').map(t => t.trim())}
                            class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-white"
                        >
                    </div>
                    <div class="flex justify-end gap-3 mt-6">
                        <button 
                            class="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                            on:click={() => editingProject = null}
                        >
                            Cancel
                        </button>
                        <button 
                            class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                            on:click={saveProject}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div> 