export interface Position {
    x: number;
    y: number;
}

export interface Window {
    id: string;
    title: string;
    content: string;
    icon: string;
    position: Position;
    isActive: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
}

export interface App {
    id: string;
    title: string;
    icon: string;
    content: string | null;
}
