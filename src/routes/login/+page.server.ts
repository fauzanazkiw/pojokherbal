import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });
		if (error) return { error: error.message };

		throw redirect(303, '/admin');
	}
};
