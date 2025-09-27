import type { Position } from '$lib/types';

interface WindowArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const WINDOW_WIDTH = 380;
export const WINDOW_HEIGHT = 500;
export const STATUS_BAR_HEIGHT = 28;
export const MARGIN = 20;

function isOverlapping(area1: WindowArea, area2: WindowArea): boolean {
    return !(
        area1.x + area1.width + MARGIN < area2.x ||
        area1.x > area2.x + area2.width + MARGIN ||
        area1.y + area1.height < area2.y ||
        area1.y > area2.y + area2.height + MARGIN
    );
}

export function findSafePosition(existingWindows: WindowArea[]): Position {
    const viewportWidth = window.innerWidth - WINDOW_WIDTH;
    const viewportHeight = window.innerHeight - WINDOW_HEIGHT;
    
    // Define grid for potential positions
    const gridSize = 50;
    const positions: Position[] = [];
    
    // Generate grid starting right after status bar
    for (let x = MARGIN; x < viewportWidth - MARGIN; x += gridSize) {
        for (let y = STATUS_BAR_HEIGHT; y < viewportHeight - MARGIN; y += gridSize) {
            positions.push({ x, y });
        }
    }
    
    // Shuffle positions array
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);
    
    // Find first position that doesn't overlap with existing windows
    for (const pos of shuffledPositions) {
        const newArea = {
            x: pos.x,
            y: pos.y,
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT
        };
        
        if (!existingWindows.some(window => isOverlapping(newArea, window))) {
            return pos;
        }
    }
    
    // Fallback: cascade from top-left with offset
    const offset = existingWindows.length * 30;
    return {
        x: MARGIN + offset,
        y: STATUS_BAR_HEIGHT + offset // Remove MARGIN here too
    };
} 