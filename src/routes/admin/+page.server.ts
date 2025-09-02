import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:products');

	// ambil produk beserta kategori
	const { data: products, error: prodError } = await supabase
		.from('products')
		.select(
			`
			id,
			name,
			price,
			description,
			link,
			image,
			category_id,
			categories:categories (id, name)
		`
		)
		.order('id');

	if (prodError) {
		console.error('Product error:', prodError.message);
	}

	// ambil kategori untuk form
	const { data: categories, error: catError } = await supabase
		.from('categories')
		.select('id, name')
		.order('name');

	if (catError) {
		console.error('Category error:', catError.message);
	}

	return {
		products: products ?? [],
		categories: categories ?? []
	};
};
