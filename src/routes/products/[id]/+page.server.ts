// src/routes/products/+page.server.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { PageServerLoad } from './$types';

// src/routes/products/[id]/+page.server.ts
export const load: PageServerLoad = async ({ params }) => {
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	const { data: product, error } = await supabase
		.from('products')
		.select('id, name, price, description, image, categories (id, name)')
		.eq('id', params.id)
		.single();

	if (error) {
		console.error('[product detail] fetch error:', error);
		return { product: null };
	}

	return { product };
};
