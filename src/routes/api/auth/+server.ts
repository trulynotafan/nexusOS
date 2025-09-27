import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
    const { password } = await request.json();
    
    // Compare with hashed password stored in environment variable
    const isValid = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
    
    return json({ 
        success: isValid 
    });
}; 