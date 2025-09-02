<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const product = (data as any)?.product;
</script>

<Navbar />

<div class="relative flex-1 bg-white pt-[95px] text-gray-800">
	<div class="mx-auto max-w-6xl px-4 py-6">
		<!-- Breadcrumb -->
		<div class="mb-6 text-sm text-gray-500">
			<a href="/" class="hover:text-black">HOME</a>
			<span class="mx-1">/</span>
			<a href="/products" class="hover:text-black">SHOP</a>
			{#if product?.categories?.name}
				<span class="mx-1">/</span>
				<span class="font-medium text-gray-800">{product.categories.name}</span>
			{/if}
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Left: Gambar Produk -->
			<div class="space-y-4">
				{#if product?.image}
					<img
						src={product.image}
						alt={product.name}
						class="w-full rounded-md border object-contain"
					/>
				{/if}

				<!-- Thumbnail jika ada banyak gambar -->
				<div class="flex gap-3">
					<img
						src={product.image}
						alt="thumbnail"
						class="h-20 w-20 cursor-pointer rounded border object-cover hover:border-amber-600"
					/>
				</div>
			</div>

			<!-- Right: Info Produk -->
			<div>
				<h1 class="text-2xl font-semibold text-gray-900">{product.name}</h1>
				<p class="mt-2 text-xl font-bold text-amber-800">Rp {product.price}</p>

				<!-- Deskripsi -->
				<div class="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
					<p>{product.description}</p>
				</div>

				<!-- Tombol Order Lain -->
				<div class="mt-4 space-y-2">
					<a
						href="https://wa.me/+6281901571773?text=Halo,%20saya%20tertarik%20dengan%20produk%20jamu%20Anda"
						target="_blank"
						class="flex w-full items-center justify-center rounded bg-amber-800 px-4 py-2 text-white hover:bg-green-700"
					>
						Order via WhatsApp
					</a>
				</div>

				<!-- Category -->
				<p class="mt-6 text-sm text-gray-500">
					Category:
					<span class="font-medium text-gray-800">{product.categories?.name}</span>
				</p>
			</div>
		</div>
	</div>
</div>

<Footer />
