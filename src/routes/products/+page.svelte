<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	export let data: PageData;

	const products = (data as any)?.products ?? [];

	// state untuk kategori terpilih
	let selectedCategory: string | null = null;

	// daftar kategori (bisa kamu ganti dari database juga)
	const categories = ['RAMU REMPAH', 'SARI REMPAH', 'REMPAH KERING'];

	// state untuk mobile filter panel (slide-over)
	let filterOpen = false;

	// contoh filter price sederhana (bisa ganti implementasi dual-range)
	let price = { min: 30000, max: 300000 };

	// sorting state: bind ke <select>
	let sortBy = 'default'; // 'default' | 'price-asc' | 'price-desc' | 'latest'

	// computed: filter produk (sesuaikan field category jika beda)
	$: filteredProducts =
		selectedCategory && selectedCategory !== 'All'
			? products.filter((p: any) => p.categories?.name === selectedCategory)
			: products;

	// helper: ambil nilai numeric dari product.price (aman untuk string like "Rp1.000,00" atau number)
	function getPrice(p: any) {
		const val = p?.price ?? 0;
		if (typeof val === 'number') return val;
		if (typeof val === 'string') {
			// ambil digit saja, hapus simbol, koma, titik ribuan
			const digits = val.replace(/[^\d\-\.]/g, '');
			const n = Number(digits);
			return Number.isFinite(n) ? n : 0;
		}
		return 0;
	}

	// compute displayedProducts = filteredProducts + sorting
	$: displayedProducts = (() => {
		const list = Array.isArray(filteredProducts) ? [...filteredProducts] : [];
		if (sortBy === 'price-asc') {
			list.sort((a, b) => getPrice(a) - getPrice(b));
		} else if (sortBy === 'price-desc') {
			list.sort((a, b) => getPrice(b) - getPrice(a));
		} else if (sortBy === 'latest') {
			// try created_at, fallback to id (descending)
			list.sort((a: any, b: any) => {
				const ta = a?.created_at ? Date.parse(a.created_at) : Number(a?.id ?? 0);
				const tb = b?.created_at ? Date.parse(b.created_at) : Number(b?.id ?? 0);
				return tb - ta;
			});
		}
		return list;
	})();

	// Disable page scroll saat filter mobile terbuka
	$: if (typeof window !== 'undefined') {
		if (filterOpen) {
			document.documentElement.classList.add('overflow-hidden');
		} else {
			document.documentElement.classList.remove('overflow-hidden');
		}
	}

	function selectCategory(cat: string | null) {
		selectedCategory = cat;
		// optional: tutup panel mobile setelah pilih kategori
		if (filterOpen) filterOpen = false;
	}

	function closeFilter() {
		filterOpen = false;
	}
</script>

<Navbar />

<div class="relative flex-1 pt-[95px]">
	<div class="min-h-screen bg-white px-4 py-2 text-gray-800">
		<!-- Breadcrumb (centered) -->
		<div class="mx-auto max-w-6xl border-t border-gray-200 py-1">
			<p class="text-semibold text-center text-sm text-gray-500 md:text-left">
				<a href="/" class="hover:text-black">HOME</a><span class="mx-1">/</span>
				<span class="font-medium text-gray-800">SHOP</span>
				{#if selectedCategory}
					<span class="mx-1">/</span>
					<span class="font-medium text-gray-800">{selectedCategory}</span>
				{/if}
			</p>
		</div>

		<!-- Main Layout container -->
		<div class="mx-auto mt-6 max-w-6xl">
			<!-- MOBILE: Filter button (visible only on mobile) -->
			<div class="mb-4 flex items-center justify-between md:hidden">
				<button
					class="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
					on:click={() => (filterOpen = true)}
					aria-expanded={filterOpen}
					aria-controls="mobile-filter-panel"
				>
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path d="M3 5h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<path d="M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<path d="M10 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
					FILTER
				</button>

				<!-- bind sortBy pada mobile select juga -->
				<select
					class="rounded border px-3 py-2 text-sm"
					aria-label="Sort products"
					bind:value={sortBy}
				>
					<option value="default">Default sorting</option>
					<option value="price-asc">Sort by price: low to high</option>
					<option value="price-desc">Sort by price: high to low</option>
					<option value="latest">Sort by latest</option>
				</select>
			</div>

			<!-- MOBILE: slide-over panel (overlay) -->
			{#if filterOpen}
				<!-- Backdrop -->
				<div class="fixed inset-0 z-40 md:hidden" on:click={closeFilter} aria-hidden="true">
					<div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
				</div>

				<!-- Panel (gunakan div role=dialog untuk aksesibilitas) -->
				<div
					id="mobile-filter-panel"
					class="fixed top-0 left-0 z-50 h-full w-55 max-w-[85vw] overflow-auto bg-white shadow-2xl md:hidden"
					in:fly={{ x: -320, duration: 250 }}
					out:fly={{ x: -320, duration: 220 }}
					role="dialog"
					aria-modal="true"
					aria-labelledby="filter-title"
				>
					<div class="flex items-center justify-between border-b border-gray-100 px-4 py-4">
						<h3 id="filter-title" class="text-lg font-bold tracking-wide">BROWSE</h3>
						<button
							class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
							on:click={closeFilter}
							aria-label="Close filters"
						>
							<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path
									d="M6 6l12 12M6 18L18 6"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</div>

					<div class="px-4 py-4">
						<!-- category list -->
						<h4 class="mb-2 text-sm font-semibold">Kategori</h4>
						<ul class="divide-y divide-gray-100">
							<li>
								<button
									class="block w-full px-0 py-3 text-left text-sm text-gray-700 hover:text-amber-500"
									on:click={() => selectCategory(null)}
								>
									All Products
								</button>
							</li>
							{#each categories as cat}
								<li>
									<button
										class="block w-full px-0 py-3 text-left text-sm transition {selectedCategory ===
										cat
											? 'font-semibold text-amber-600'
											: 'text-gray-700 hover:text-amber-500'}"
										on:click={() => selectCategory(cat)}
									>
										{cat}
									</button>
								</li>
							{/each}
						</ul>

						<!-- optional: search or extra widgets -->
						<div class="mt-8 text-sm text-gray-500">
							<!-- space for other filters -->
						</div>
					</div>
				</div>
			{/if}

			<!-- GRID + SIDEBAR LAYOUT -->
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				<!-- Sidebar (desktop only) -->
				<aside class="hidden pr-4 lg:col-span-1 lg:block">
					<h2
						class="relative mb-4 inline-block text-lg font-semibold after:mt-2 after:block after:h-0.5 after:w-1/2 after:bg-gray-300"
					>
						KATEGORI
					</h2>

					<ul>
						<li class="border-b border-gray-200 py-2">
							<button
								class="block w-full text-left text-gray-600 hover:text-blue-600"
								on:click={() => selectCategory(null)}
							>
								All Products
							</button>
						</li>
						{#each categories as cat}
							<li class="border-b border-gray-200 py-2">
								<button
									class="block w-full text-left text-gray-600 hover:text-blue-600 {selectedCategory ===
									cat
										? 'font-semibold text-blue-600'
										: ''}"
									on:click={() => selectCategory(cat)}
								>
									{cat}
								</button>
							</li>
						{/each}
					</ul>
				</aside>

				<!-- Product Grid -->
				<section class="lg:col-span-3">
					<!-- Sorting & result count (desktop keeps select on right) -->
					<div class="mb-6 flex items-center justify-between">
						<p class="text-sm text-gray-500">
							Showing {displayedProducts.length} of {products.length} results
						</p>
						<div class="hidden md:block">
							<select
								class="rounded border px-3 py-2 text-sm"
								bind:value={sortBy}
								aria-label="Sort products desktop"
							>
								<option value="default">Default sorting</option>
								<option value="price-asc">Sort by price: low to high</option>
								<option value="price-desc">Sort by price: high to low</option>
								<option value="latest">Sort by latest</option>
							</select>
						</div>
					</div>

					{#if displayedProducts.length === 0}
						<p class="text-left text-gray-500">Tidak ada produk di kategori ini.</p>
					{:else}
						<div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
							{#each displayedProducts as product}
								<a
									href={`/products/${product.id}`}
									class="group block overflow-hidden rounded-sm p-3 text-left shadow-sm transition hover:shadow-md"
								>
									{#if product.image}
										<img
											src={product.image}
											alt={product.name}
											class="mx-auto h-42 w-42 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
										/>
									{/if}
									<p class="mt-3 text-xs text-gray-500 uppercase">{product.categories?.name}</p>
									<h2 class="mt-1 text-sm text-gray-700">{product.name}</h2>
									<p class="font-semibold text-gray-900">
										Rp {getPrice(product).toLocaleString('id-ID')}
									</p>
								</a>
							{/each}
						</div>
					{/if}
				</section>
			</div>
		</div>
	</div>
</div>

<Footer />
