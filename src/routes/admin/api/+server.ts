import type { RequestHandler } from './$types';

async function uploadImage(supabase: any, file: File | null) {
	if (!file || file.size === 0) return null;
	const fileName = `${Date.now()}-${file.name}`;
	const { error: uploadError } = await supabase.storage
		.from('product-images')
		.upload(fileName, file);
	if (uploadError) throw new Error(uploadError.message);
	const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(fileName);
	return publicUrl.publicUrl;
}

function parseUuid(value: FormDataEntryValue | null): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed ? trimmed : undefined;
}

// === POST ===
export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	try {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const priceRaw = formData.get('price');
		const price = priceRaw == null ? NaN : Number(String(priceRaw));
		const description = String(formData.get('description') ?? '');
		const link = String(formData.get('link') ?? '');
		const category_id = parseUuid(formData.get('category_id'));
		const imageFile = formData.get('image') as File | null;

		// validasi: image wajib saat tambah
		if (!name || Number.isNaN(price) || !category_id || !imageFile || imageFile.size === 0) {
			return new Response(
				JSON.stringify({ error: 'Name, Price, Category, dan Image wajib diisi' }),
				{ status: 400 }
			);
		}

		const imageUrl = await uploadImage(supabase, imageFile);

		const { error } = await supabase.from('products').insert({
			name,
			price,
			description,
			link,
			image: imageUrl,
			category_id
		});

		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};

// === PUT ===
export const PUT: RequestHandler = async ({ request, locals: { supabase } }) => {
	try {
		const formData = await request.formData();

		const id = parseUuid(formData.get('id'));
		if (!id)
			return new Response(JSON.stringify({ error: 'ID wajib ada untuk update' }), { status: 400 });

		const name = String(formData.get('name') ?? '').trim();
		const priceRaw = formData.get('price');
		const price = priceRaw == null ? NaN : Number(String(priceRaw));
		const description = String(formData.get('description') ?? '');
		const link = String(formData.get('link') ?? '');
		const category_id = parseUuid(formData.get('category_id'));
		const imageFile = formData.get('image') as File | null;

		// ambil data lama
		const { data: oldData, error: selErr } = await supabase
			.from('products')
			.select('image')
			.eq('id', id)
			.single();
		if (selErr) {
			return new Response(JSON.stringify({ error: selErr.message }), { status: 500 });
		}
		let imageUrl = oldData?.image || '';

		// jika upload image baru
		if (imageFile && imageFile.size > 0) {
			imageUrl = await uploadImage(supabase, imageFile);
		}

		const { error } = await supabase
			.from('products')
			.update({ name, price, description, link, category_id, image: imageUrl })
			.eq('id', id);

		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};

// === DELETE ===
export const DELETE: RequestHandler = async ({ request, locals: { supabase } }) => {
	try {
		const body = await request.json();
		const id = body?.id ? String(body.id) : null;
		if (!id)
			return new Response(JSON.stringify({ error: 'ID wajib ada untuk delete' }), { status: 400 });

		const { error } = await supabase.from('products').delete().eq('id', id);
		if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
