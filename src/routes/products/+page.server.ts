// src/routes/products/+page.server.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
		console.error('[products] Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY env var');
		return { products: [] };
	}

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	const { data: products, error } = await supabase
		.from('products')
		.select('id, name, price, description, link, image, category_id, categories (id, name)')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('[products] fetch error:', error);
		return { products: [] };
	}

	return { products };
};
