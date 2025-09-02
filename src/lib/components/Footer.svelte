<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import type { SvelteComponent } from 'svelte';

	let width: number | null = null;
	let IconComponent: typeof SvelteComponent | null = null;
	let onResize: (() => void) | null = null;

	onMount(async () => {
		// guaranteed to run only in browser
		if (!browser) return;

		// set width and listener
		width = window.innerWidth;
		onResize = () => (width = window.innerWidth);
		window.addEventListener('resize', onResize);

		// dynamic import of icon component - only in browser
		try {
			const mod = await import('@iconify/svelte');
			// some builds export default, some named - handle both
			IconComponent = (mod && (mod.default ?? mod.Icon ?? mod)) as typeof SvelteComponent;
		} catch (err) {
			// optionally console.warn for debugging during client runtime
			console.warn('Failed to load @iconify/svelte dynamically:', err);
			IconComponent = null;
		}
	});

	onDestroy(() => {
		if (browser && onResize) {
			window.removeEventListener('resize', onResize);
		}
	});
</script>

<footer class="bg-white px-6 py-8 text-sm text-amber-800">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-start md:justify-between"
	>
		<!-- Kolom 1 -->
		<div class="max-w-xs text-center md:text-left">
			<img
				src="/images/djanthi.png"
				alt="Ladang Lima"
				class="mx-auto -mt-10 mb-1 h-40 w-auto md:mx-0"
			/>
			<p class="-mt-5 font-semibold">Djanthi, Pojok Herbal Indonesia</p>
			<p class="break-words">
				Djanthi menghadirkan rempah pilihan dari alam nusantara yang diolah secara Higienis, alami,
				tanpa bahan pengawet, perasa dan pewarna buatan.
			</p>
		</div>

		<!-- Kolom 2 -->
		<div class="max-w-sm text-center break-words md:text-left">
			<h4 class="mb-2 font-bold">Informasi</h4>
			<p class="mb-2">
				Bocor RT 08/III, Kinanthi Selatan, Bocor, Kec. Buluspesantren, Kabupaten Kebumen, Jawa
				Tengah 54391
			</p>
			<p class="mb-2">
				<strong>Lokasi</strong><br />Kebumen, Jawa Tengah, Indonesia
			</p>
		</div>

		<!-- Kolom 3 -->
		<div class="text-center md:text-left">
			<h4 class="mb-2 font-bold">Media Sosial</h4>
			<ul class="flex justify-center gap-4 md:justify-start">
				<li>
					<a
						href="https://wa.me/+6281901571773?text=Halo,%20saya%20tertarik%20dengan%20produk%20jamu%20Anda"
						class="text-2xl hover:text-amber-700"
						aria-label="WhatsApp"
					>
						{#if IconComponent}
							<svelte:component this={IconComponent} icon="fa-brands:whatsapp" />
						{:else}
							<span>WA</span>
						{/if}
					</a>
				</li>
				<li>
					<a
						href="https://instagram.com/pojokherbal.id"
						class="text-2xl hover:text-amber-700"
						aria-label="Instagram"
					>
						{#if IconComponent}
							<svelte:component this={IconComponent} icon="fa-brands:instagram" />
						{:else}
							<span>IG</span>
						{/if}
					</a>
				</li>
			</ul>
		</div>
	</div>

	<div class="mx-auto mt-8 w-full max-w-6xl border-t pt-6 text-center text-amber-700">
		<p class="text-xs">
			PT Pojok Herbal Indonesia © 2025 — viewport:
			{#if width !== null}
				{width}px
			{:else}
				unknown
			{/if}
		</p>
	</div>
</footer>
