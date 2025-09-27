import { writable } from 'svelte/store';

export const translations = writable('EN');

export const content = {
    EN: {
        about: {
            title: "About Me",
            intro: "I'm an 18-year-old developer passionate about coding and building things.",
            description: "Always learning new technologies and exploring different programming languages, tools, and practices.",
            status: [
                "Available for work",
                "Open to collaborate"
            ]
        },
        projects: {
            title: "My Projects",
            viewGithub: "View on GitHub",
            visitSite: "Visit Site"
        },
        terminal: {
            welcome: "Type 'help' to see available commands",
            commands: {
                help: "Display this help message",
                aboutme: "Who am I?",
                clear: "Clear the terminal"
            }
        },
        contact: {
            title: "Let's Connect!",
            subtitle: "Choose your preferred way to reach out",
            email: "Email",
            discord: "Discord",
            website: "Website"
        }
    },
    UR: {
        about: {
            title: "Mere Baare Mein",
            greeting: "Salam, Mein Hoon",
            subtitle: "Pakistan Se Aik Developer",
            intro: "Main 18 saal ka hoon aur is waqt college mein hoon. Mujhe programming ka bohot shauq hai aur main hamesha naye chhote projects aur jobs dhoondta hoon takay apna tajurba barha sakoon.",
            description: "Mujhe naye technologies seekhna aur alag alag programming languages, tools aur practices explore karna pasand hai. Mere liye acha developer banne ka matlab hai hamesha naye cheezein seekhna aur unke saath adapt karna.",
            status: [
                "Kaam ke liye available",
                "Collaboration ke liye tayyar"
            ],
            skills: {
                languages: "Programming Languages",
                databases: "Databases",
                tools: "Tools",
                levels: {
                    beginner: "Naya Seekh Raha",
                    intermediate: "Theek Thak",
                    advanced: "Mahir",
                    master: "Expert"
                }
            }
        },
        projects: {
            title: "Mere Projects",
            description: "Mere Projects Jo Maine Banaye Hain",
            viewGithub: "GitHub par dekhein",
            visitSite: "Website visit karein",
            projectTypes: {
                personal: "Personal Project",
                backend: "Backend Project",
                frontend: "Frontend Project",
                fullstack: "Full Stack Project",
                infrastructure: "Infrastructure Project"
            },
            viewMore: "Aur Projects Dekhein"
        },
        terminal: {
            welcome: "Commands dekhne ke liye 'help' type karein",
            prompt: "mehman@nexus",
            commands: {
                help: "Saari commands dikhaein",
                aboutme: "Main Kon Hoon?",
                clear: "Terminal saaf karein",
                getcat: "Billi ki tasveer dekhein",
                matrix: "Matrix mode chalayein",
                happy: "Khushi phailayein",
                destruct: "System ko tabah karein"
            },
            responses: {
                notFound: "Ye command nahi mili. 'help' type karein commands dekhne ke liye",
                matrix: "Matrix mode shuru ho raha hai...",
                destruct: "SYSTEM TABAHI KA AMAL SHURU...",
                happy: "Muskurate rahein! Ap bohot acha kar rahe hain!"
            }
        },
        contact: {
            title: "Rabta Karein!",
            subtitle: "Apni pasand ka zariya chunein",
            email: {
                title: "Email",
                action: "Email bhejein",
                response: "Email ka jawab: < 24 ghante"
            },
            discord: {
                title: "Discord",
                action: "Discord pe message karein",
                response: "Discord ka jawab: < 12 ghante"
            },
            website: {
                title: "Website",
                action: "Website visit karein"
            }
        }
    }
}; 