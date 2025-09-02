import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/login'); // redirect ke halaman login
	}
};
