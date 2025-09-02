<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Icon from '@iconify/svelte';
	import Testimoni from '$lib/components/Testimoni.svelte';
	import Partner from '$lib/components/Partner.svelte';

	function scrollToProduk() {
		const section = document.getElementById('produk-section');
		if (section) {
			const offset = 80;
			const y = section.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	}
</script>

<Navbar />
<section
	class="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden pt-[56px] md:pt-[80px]"
>
	<div class="absolute inset-0 bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-no-repeat"></div>
	<div class="absolute inset-0 bg-amber-900/80" style="background-blend-mode: multiply;"></div>
	<div
		class="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2"
	>
		<div class="text-left">
			<h2 class="text-lg font-medium text-white">Selamat Datang!</h2>
			<h1 class="mt-2 text-4xl leading-tight font-extrabold text-white md:text-5xl">
				Nikmati Jamu <br />
				<span class="text-amber-300">Tradisional Sehat</span> <br />
				dan Alami
			</h1>
			<p class="mt-4 text-white">
				Djanthi menghadirkan rempah pilihan dari alam nusantara yang diolah secara Higienis, alami,
				tanpa bahan pengawet, perasa dan pewarna buatan.
			</p>
			<button
				on:click={scrollToProduk}
				class="mt-6 inline-block rounded-md bg-amber-700 px-6 py-3 text-white transition hover:bg-amber-500"
			>
				Jelajahi Sekarang
			</button>
		</div>
	</div>
</section>

<!-- Section Produk -->
<section id="produk-section" class="mx-auto -mb-3 max-w-6xl px-5 py-10">
	<div class="grid items-start gap-15 md:grid-cols-2">
		<!-- Bagian Kiri -->
		<div class="flex flex-col gap-6">
			<h2 class="text-3xl leading-snug font-bold text-amber-600 md:text-3xl">
				Menghidupkan Tradisi Sehat<br />melalui Ramuan Alami
			</h2>

			<div class="grid auto-cols-max grid-flow-col items-start justify-center gap-x-4">
				<div class="flex flex-col">
					<img src="/images/produk1.png" alt="Produk 1" class="h-32 w-auto object-contain shadow" />
					<div class="mt-3 flex justify-start">
						<img
							src="/images/produk3.png"
							alt="Produk 3"
							class="ml-10 h-32 w-auto object-contain shadow"
						/>
					</div>
				</div>

				<div class="flex flex-col items-center">
					<img src="/images/produk2.png" alt="Produk 2" class="h-32 w-auto object-contain shadow" />
					<img
						src="/images/produk4.png"
						alt="Produk 4"
						class="mt-3 h-32 w-auto object-contain shadow"
					/>
				</div>
			</div>
		</div>

		<!-- Bagian Kanan -->
		<div class="flex flex-col space-y-4">
			<!-- Tentang Kami -->
			<div class="flex flex-col items-start gap-4 border-b-2 border-gray-100 md:flex-row">
				<img src="/images/toko.jpg" alt="Foto Toko" class="h-45 w-40 object-cover shadow" />
				<div class="flex-1">
					<h3 class="mb-1 text-xl font-bold text-gray-800">Tentang Kami</h3>
					<p class="text-sm text-gray-700 md:text-base">
						Kami hadir untuk mengembangkan dan mengenalkan minuman tradisional pada masyarakat agar
						senantiasa menjaga kebudayaan minum jamu, dan menjadi tempat yang dapat diterima
						kalangan anak muda maupun orang tua.
					</p>
				</div>
			</div>

			<!-- Produk -->
			<div class="flex flex-col items-start gap-4 md:flex-row-reverse">
				<img src="/images/rempah3.png" alt="Produk Display" class="h-48 w-40 object-cover shadow" />
				<div class="flex-1">
					<h3 class="mb-2 text-xl font-bold text-gray-800">Produk</h3>
					<p class="text-sm text-gray-700 md:text-base">
						Kami menghadirkan beberapa varian jamu seperti; jamu rehabilitatif/jamu racik, jamu
						preventif/jamu wedangan, jamu latte, dan jamu tradisional. Selain itu, kami menyediakan
						berbagai makanan dan cemilan untuk menemani minum jamu.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="relative flex items-center justify-center overflow-hidden py-20">
	<div class="absolute inset-0 bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-no-repeat"></div>
	<div class="absolute inset-0 bg-amber-900/80" style="background-blend-mode: multiply;"></div>
	<div class="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
		<div class="max-w-6xl text-left text-white">
			<h2 class="mb-6 text-4xl font-extrabold text-amber-300 md:text-5xl">
				Visi <span class="text-white">Misi</span>
			</h2>
			<div class="mb-6">
				<h3 class="mb-2 text-xl font-semibold text-amber-300 italic">Visi :</h3>
				<p class="leading-relaxed text-amber-300 italic">
					Menjadi pelopor gaya hidup sehat alami dengan jamu dan rempah tradisional yang
					berkelanjutan dan melestarikan jamu warisan Nusantara.
				</p>
			</div>
			<div>
				<h3 class="mb-2 text-xl font-semibold italic">Misi :</h3>
				<p class="leading-relaxed text-white/90 italic">
					Mengolah jamu dan tanaman rempah menjadi produk yang berkualitas,Mendorong pertumbuhan
					ekonomi hijau melalui pengolahan tanaman obat ramah lingkungan,Mengembangkan inovasi
					produk jamu untuk melestarikan tradisi jamu Nusantara,Mempromosikan budaya jamu sebagai
					Warisan Kesehatan Nusantara ke masyarakat,Menjadi Brand terpercaya di bidang jamu dan
					herbal.
				</p>
			</div>
		</div>
		<div class="max-w-6xl text-left">
			<h3 class="mb-6 text-4xl font-extrabold text-white">
				Mengapa harus memilih <br />Pojok Herbal?
			</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="flex items-start gap-3">
					<div
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-amber-700"
					>
						<Icon icon="mdi:check" class="h-4 w-4" />
					</div>
					<p class="text-white/90">menggunakan bahan alami</p>
				</div>

				<div class="flex items-start gap-3">
					<div
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-amber-700"
					>
						<Icon icon="mdi:check" class="h-4 w-4" />
					</div>
					<p class="text-white/90">tanpa pengawet, tanpa tambahan obat kimia</p>
				</div>

				<div class="flex items-start gap-3">
					<div
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-amber-700"
					>
						<Icon icon="mdi:check" class="h-4 w-4" />
					</div>
					<p class="text-white/90">konsultasi jamu gratis untuk berbagai macam keluhan kesehatan</p>
				</div>

				<div class="flex items-start gap-3">
					<div
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-amber-700"
					>
						<Icon icon="mdi:check" class="h-4 w-4" />
					</div>
					<p class="text-white/90">diracik oleh ahli madya jamu</p>
				</div>
			</div>
		</div>
	</div>
</section>
<Partner />
<Testimoni />
<Footer />
