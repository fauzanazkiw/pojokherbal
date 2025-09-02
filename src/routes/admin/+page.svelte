<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Database } from '$lib/types';
	import { fade, scale } from 'svelte/transition';

	type ProductRow = Database['public']['Tables']['products']['Row'];
	type CategoryRow = Database['public']['Tables']['categories']['Row'];
	type ProductWithCategory = ProductRow & {
		categories?: Pick<CategoryRow, 'id' | 'name'> | null;
	};

	export let data: PageData;

	let products: ProductWithCategory[] = (data.products ?? []) as ProductWithCategory[];
	let categories: Pick<CategoryRow, 'id' | 'name'>[] = (data.categories ?? []) as Pick<
		CategoryRow,
		'id' | 'name'
	>[];
	let { supabase, user } = (data as any) || {};
	let editingProduct: ProductWithCategory | null = null;
	let showForm = false;

	const pickCategory = (category_id: string | null) => {
		if (!category_id) return null;
		const c = categories.find((x) => x.id === category_id);
		return c ? { id: c.id, name: c.name } : null;
	};

	// --- Realtime updates ---
	onMount(() => {
		const channel = supabase
			.channel('products-changes')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'products' },
				(payload: any) => {
					const row = payload.new as ProductRow;
					if (payload.eventType === 'INSERT') {
						products = [...products, { ...row, categories: pickCategory(row.category_id) }];
					} else if (payload.eventType === 'UPDATE') {
						products = products.map((p) =>
							p.id !== row.id
								? p
								: {
										...row,
										categories:
											p.category_id === row.category_id
												? p.categories
												: pickCategory(row.category_id)
									}
						);
					} else if (payload.eventType === 'DELETE') {
						const oldRow = payload.old as ProductRow;
						products = products.filter((p) => p.id !== oldRow.id);
					}
				}
			)
			.subscribe();

		return () => supabase.removeChannel(channel);
	});

	// --- Submit form ---
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		// Pastikan image wajib saat tambah
		if (!editingProduct) {
			const imageFile = formData.get('image') as File;
			if (!imageFile || imageFile.size === 0) {
				alert('Image wajib diisi saat tambah produk');
				return;
			}
		}

		if (editingProduct) formData.append('id', editingProduct.id.toString());

		const method = editingProduct ? 'PUT' : 'POST';
		const res = await fetch('/admin/api', { method, body: formData });
		const result = await res.json();

		if (!res.ok) {
			alert(result.error || 'Gagal simpan produk');
			return;
		}

		form.reset();
		showForm = false;
		editingProduct = null;
	};

	// --- Delete product ---
	const handleDelete = async (id: string) => {
		if (!confirm('Yakin hapus produk ini?')) return;
		const res = await fetch('/admin/api', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});
		if (!res.ok) {
			const result = await res.json();
			alert(result.error || 'Gagal hapus produk');
		}
	};

	// --- Start editing ---
	const startEdit = (product: ProductWithCategory) => {
		editingProduct = product;
		showForm = true;

		setTimeout(() => {
			const form = document.querySelector('form') as HTMLFormElement;
			if (!form) return;
			form.querySelector<HTMLInputElement>('#name')!.value = product.name ?? '';
			form.querySelector<HTMLInputElement>('#price')!.value = product.price?.toString() ?? '';
			form.querySelector<HTMLTextAreaElement>('#description')!.value = product.description ?? '';
			form.querySelector<HTMLInputElement>('#link')!.value = product.link ?? '';
			form.querySelector<HTMLSelectElement>('#category_id')!.value =
				product.category_id?.toString() ?? '';
		}, 0);
	};

	const startAdd = () => {
		editingProduct = null; // reset id lama
		showForm = true;
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		location.href = '/login';
	};
</script>

<div class="min-h-screen bg-gray-900 p-8 text-gray-100">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Product Dashboard</h1>
		<p class="text-gray-400">Welcome, {user?.email}</p>
		<button
			on:click={logout}
			class="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700">Logout</button
		>
	</div>

	<div class="mb-6 flex justify-end">
		<button
			on:click={startAdd}
			class="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
		>
			{showForm ? 'Batal' : 'Tambah Produk'}
		</button>
	</div>

	{#if showForm}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" transition:fade>
			<div
				class="w-full max-w-lg rounded-xl bg-gray-800 p-6 shadow-lg"
				transition:scale={{ duration: 200 }}
			>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
					<button
						on:click={() => (showForm = false)}
						class="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white">✕</button
					>
				</div>
				<form on:submit={handleSubmit} enctype="multipart/form-data" class="space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium">Product Name</label>
						<input
							id="name"
							name="name"
							required
							class="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
						/>
					</div>
					<div>
						<label for="price" class="block text-sm font-medium">Price</label>
						<input
							id="price"
							type="number"
							step="0.01"
							name="price"
							required
							class="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
						/>
					</div>
					<div>
						<label for="description" class="block text-sm font-medium">Description</label>
						<textarea
							id="description"
							name="description"
							class="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
						></textarea>
					</div>
					<div>
						<label for="link" class="block text-sm font-medium">Link</label>
						<input
							id="link"
							type="text"
							name="link"
							class="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
						/>
					</div>
					<div>
						<label for="category_id" class="block text-sm font-medium">Category</label>
						<select
							id="category_id"
							name="category_id"
							required
							class="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
						>
							<option value="">-- Pilih Kategori --</option>
							{#each categories as cat}
								<option value={cat.id}>{cat.name}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="image" class="block text-sm font-medium">Image</label>
						<input
							id="image"
							type="file"
							name="image"
							accept="image/*"
							class="mt-1 w-full text-sm"
						/>
					</div>
					<button
						type="submit"
						class="w-full rounded-lg bg-blue-600 py-2 font-semibold hover:bg-blue-700"
						>Simpan</button
					>
				</form>
			</div>
		</div>
	{/if}

	<div class="rounded-xl bg-gray-800 p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold">Product List (Realtime)</h2>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-gray-700 text-gray-400 uppercase">
					<tr>
						<th class="px-4 py-2">Name</th>
						<th class="px-4 py-2">Category</th>
						<th class="px-4 py-2">Description</th>
						<th class="px-4 py-2">Price</th>
						<th class="px-4 py-2">Image</th>
						<th class="px-4 py-2">Link</th>
						<th class="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each products as product}
						<tr class="border-b border-gray-700 hover:bg-gray-700/40">
							<td class="px-4 py-2">{product.name}</td>
							<td class="px-4 py-2">{product.categories?.name}</td>
							<td class="max-w-xs truncate px-4 py-2">{product.description}</td>
							<td class="px-4 py-2">Rp {product.price}</td>
							<td class="px-4 py-2">
								{#if product.image}
									<img
										src={product.image}
										alt={product.name}
										class="h-16 w-16 rounded object-cover"
									/>
								{/if}
							</td>
							<td class="px-4 py-2">
								{#if product.link}
									<a href={product.link} target="_blank" class="text-blue-400 hover:underline"
										>View</a
									>
								{/if}
							</td>
							<td class="space-x-4 px-4 py-2">
								<button
									on:click={() => startEdit(product)}
									class="rounded bg-yellow-600 px-2 py-1 text-xs hover:bg-yellow-700">Edit</button
								>
								<button
									on:click={() => handleDelete(product.id)}
									class="rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700">Delete</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
