import { writable } from 'svelte/store';

export type Skill = {
    id: string;
    name: string;
    icon: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
    category: 'Languages' | 'Databases' | 'Tools';
};

export type Project = {
    id: string;
    title: string;
    description: string;
    type: string;
    githubUrl?: string;
    liveUrl?: string;
    technologies: string[];
};

function createAdminStore() {
    const { subscribe, set, update } = writable<{
        skills: Skill[];
        projects: Project[];
    }>({ skills: [], projects: [] });

    return {
        subscribe,
        init: async () => {
            const response = await fetch('/api/admin');
            const data = await response.json();
            set(data);
        },
        saveSkill: async (skill: Skill) => {
            update(state => {
                const skills = state.skills.map(s => 
                    s.id === skill.id ? skill : s
                );
                return { ...state, skills };
            });
            await saveToServer();
        },
        addSkill: async (skill: Skill) => {
            update(state => ({
                ...state,
                skills: [...state.skills, skill]
            }));
            await saveToServer();
        },
        deleteSkill: async (id: string) => {
            update(state => ({
                ...state,
                skills: state.skills.filter(s => s.id !== id)
            }));
            await saveToServer();
        },
        saveProject: async (project: Project) => {
            update(state => {
                const projects = state.projects.map(p => 
                    p.id === project.id ? project : p
                );
                return { ...state, projects };
            });
            await saveToServer();
        },
        addProject: async (project: Project) => {
            update(state => ({
                ...state,
                projects: [...state.projects, project]
            }));
            await saveToServer();
        },
        deleteProject: async (id: string) => {
            update(state => ({
                ...state,
                projects: state.projects.filter(p => p.id !== id)
            }));
            await saveToServer();
        }
    };

    async function saveToServer() {
        let state;
        subscribe(s => state = s)();
        await fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        });
    }
}

export const adminStore = createAdminStore(); 