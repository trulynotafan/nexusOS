import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import type { RequestHandler } from './$types';

const DATA_FILE = 'src/lib/data/portfolio.json';

// Helper to read data
function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        return { skills: [], projects: [] };
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Helper to write data
function writeData(data: any) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET handler
export const GET: RequestHandler = async () => {
    const data = readData();
    return json(data);
};

// POST handler for updating data
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    writeData(data);
    return json({ success: true });
}; 