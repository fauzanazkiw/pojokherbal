<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';

	let scrolled = false;
	let menuOpen = false;
	let closeBtn: HTMLButtonElement | null = null;

	// safe: cek browser sebelum membaca window
	function handleScroll() {
		if (!browser) return;
		scrolled = window.scrollY > 5;
	}

	onMount(() => {
		// hanya di client
		if (!browser) return;

		// set awal & attach listener
		handleScroll();
		window.addEventListener('scroll', handleScroll);
	});

	onDestroy(() => {
		// hanya di client
		if (!browser) return;

		window.removeEventListener('scroll', handleScroll);
		removeEscListener();
	});

	// Efek ketika menuOpen berubah — hanya berjalan di browser
	$: if (browser) {
		if (menuOpen) {
			document.documentElement.classList.add('overflow-hidden');
			addEscListener();
			// set fokus setelah DOM update
			tick().then(() => closeBtn?.focus());
		} else {
			document.documentElement.classList.remove('overflow-hidden');
			removeEscListener();
		}
	}

	function openMenu() {
		menuOpen = true;
	}

	function closeMenu() {
		menuOpen = false;
	}

	// keyboard escape handler
	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeMenu();
	}
	function addEscListener() {
		if (!browser) return;
		window.addEventListener('keydown', onKeydown);
	}
	function removeEscListener() {
		if (!browser) return;
		window.removeEventListener('keydown', onKeydown);
	}
</script>

<nav
	aria-label="Main navigation"
	class="right-0 left-0 z-20 overflow-visible bg-white transition-all duration-300"
	class:fixed={!menuOpen}
	class:static={menuOpen}
	class:animate-slideDown={scrolled}
>
	<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-0 md:py-2.5">
		<!-- Logo (lebih besar, tapi navbar padding tetap) -->
		<a
			href="/"
			class="relative z-20 flex items-center overflow-visible md:h-16"
			aria-label="Go to home"
		>
			<img
				src="/images/djanthi.png"
				alt="Djanthi Logo"
				class="h-22 w-auto -translate-y-0 transform object-contain transition-transform duration-200 md:h-30 md:-translate-y-1"
				style="z-index:20;"
			/>
		</a>

		<!-- Desktop links -->
		<ul class="hidden items-center gap-8 font-medium text-gray-800 md:flex">
			<li><a href="/" class="transition hover:text-amber-500">BERANDA</a></li>
			<li><a href="/products" class="transition hover:text-amber-500">PRODUK KAMI</a></li>
			<li><a href="/contact" class="transition hover:text-amber-500">KONTAK KAMI</a></li>
			<li>
				<a
					href="https://wa.me/+6281901571773?text=Halo,%20saya%20tertarik%20dengan%20produk%20jamu%20Anda"
					class="rounded-md bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-400"
				>
					SHOP NOW
				</a>
			</li>
		</ul>

		<!-- Mobile Hamburger -->
		<button
			class="flex items-center justify-center md:hidden"
			on:click={() => (menuOpen ? closeMenu() : openMenu())}
			aria-expanded={menuOpen}
			aria-controls="mobile-nav-panel"
			aria-label="Toggle menu"
		>
			<div class="flex h-10 w-10 flex-col items-center justify-center">
				<span
					aria-hidden="true"
					class="block h-[2px] w-6 bg-gray-800 transition-transform duration-300"
					style="transform: {menuOpen
						? 'translateY(6px) rotate(45deg)'
						: 'translateY(0) rotate(0)'};"
				></span>
				<span
					aria-hidden="true"
					class="my-1 block h-[2px] w-6 bg-gray-800 transition-opacity duration-200"
					style="opacity: {menuOpen ? 0 : 1};"
				></span>
				<span
					aria-hidden="true"
					class="block h-[2px] w-6 bg-gray-800 transition-transform duration-300"
					style="transform: {menuOpen
						? 'translateY(-6px) rotate(-45deg)'
						: 'translateY(0) rotate(0)'};"
				></span>
			</div>
		</button>
	</div>
</nav>

{#if menuOpen}
	<div class="fixed inset-0 z-40 md:hidden" on:click={closeMenu} aria-hidden="true">
		<div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
	</div>

	<div
		id="mobile-nav-panel"
		class="fixed top-0 left-0 z-50 h-full w-60 max-w-[85vw] overflow-auto bg-white shadow-2xl md:hidden"
		in:fly={{ x: -320, duration: 240 }}
		out:fly={{ x: -320, duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-label="Main menu"
	>
		<div class="flex items-center justify-between border-b border-gray-100 px-4 py-4">
			<a href="/" class="flex items-center text-lg font-semibold">
				<!-- gunakan ukuran lebih kecil di dalam panel agar muat -->
				<img src="/images/djanthi.png" alt="Djanthi Logo" class="h-10 w-auto object-contain" />
			</a>
			<button
				bind:this={closeBtn}
				class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
				on:click={closeMenu}
				aria-label="Close menu"
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

		<nav class="px-4 py-4" aria-label="Mobile primary">
			<ul class="flex flex-col gap-4 text-gray-800">
				<li>
					<a href="/" class="block rounded px-2 py-2 hover:bg-gray-50" on:click={closeMenu}
						>BERANDA</a
					>
				</li>
				<li>
					<a href="/products" class="block rounded px-2 py-2 hover:bg-gray-50" on:click={closeMenu}
						>PRODUK KAMI</a
					>
				</li>
				<li>
					<a href="/contact" class="block rounded px-2 py-2 hover:bg-gray-50" on:click={closeMenu}
						>KONTAK KAMI</a
					>
				</li>
				<li class="mt-2">
					<a
						href="https://wa.me/+6281901571773?text=Halo,%20saya%20tertarik%20dengan%20produk%20jamu%20Anda"
						class="inline-block w-full rounded-md bg-amber-500 px-4 py-2 text-center text-white transition hover:bg-amber-400"
					>
						SHOP NOW
					</a>
				</li>
			</ul>
		</nav>
	</div>
{/if}

<style>
	@keyframes slideDown {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	.animate-slideDown {
		animation: slideDown 0.4s ease-out;
	}
	@media (max-width: 767px) {
		nav.fixed {
			box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
		}
	}
</style>
