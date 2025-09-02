<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Icon from '@iconify/svelte';

	let form = {
		name: '',
		phone: '',
		email: '',
		subject: '',
		message: ''
	};

	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log('Form submitted:', form);
	// 	alert('Terima kasih, pesan Anda sudah terkirim!');
	// 	// TODO: fetch ke backend/API
	// }
</script>

<Navbar />
<main>
	<section class="relative flex-1 pt-[80px]">
		<div class="absolute inset-0 bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-no-repeat"></div>
		<div class="absolute inset-0 bg-amber-900/80" style="background-blend-mode: multiply;"></div>

		<div class="relative z-10 mx-auto max-w-6xl px-6 pt-36 pb-20 text-center md:pt-40">
			<h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">We're here to help</h1>
			<p class="mb-12 text-lg text-white">Contact us by selecting one of the channels below</p>

			<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
				<!-- Email -->
				<div class="rounded-2xl bg-white p-8 text-left shadow-lg">
					<Icon icon="mdi:email-outline" class="mb-4 h-8 w-8 text-amber-600" />
					<h3 class="text-xl font-semibold text-gray-800">Email Us</h3>
					<p class="mt-2 text-gray-600">Kirim pesan kapan saja, kami akan balas secepat mungkin.</p>
					<a
						class="mt-4 inline-flex items-center font-medium text-amber-600 hover:underline"
						href="#form"
					>
						Leave a Message →
					</a>
				</div>

				<!-- Visit -->
				<div class="rounded-2xl bg-white p-8 text-left shadow-lg">
					<Icon icon="mdi:map-marker" class="mb-4 h-8 w-8 text-amber-600" />
					<h3 class="text-xl font-semibold text-gray-800">Visit Us</h3>
					<p class="mt-2 text-gray-600">Bocor, Jawa Tengah 54391</p>
					<a
						href="https://maps.google.com"
						target="_blank"
						class="mt-4 inline-flex items-center font-medium text-amber-600 hover:underline"
					>
						Get Directions →
					</a>
				</div>

				<!-- Call -->
				<div class="rounded-2xl bg-white p-8 text-left shadow-lg">
					<Icon icon="mdi:whatsapp" class="mb-4 h-8 w-8 text-amber-600" />
					<h3 class="text-xl font-semibold text-gray-800">Call / WhatsApp</h3>
					<p class="mt-2 text-gray-600">Hubungi kami langsung untuk respon cepat.</p>
					<a
						href="https://wa.me/+6281901571773?text=Halo,%20saya%20tertarik%20dengan%20produk%20jamu%20Anda"
						target="_blank"
						rel="noopener"
						class="mt-2 inline-flex items-center font-medium text-amber-600 hover:underline"
					>
						<Icon icon="mdi:whatsapp" class="mr-2 h-5 w-5" />
						International Sales
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Form Contact -->
	<section id="form" class="relative bg-gray-50 py-16">
		<div class="mx-auto max-w-4xl px-6">
			<h2 class="mb-4 text-center text-3xl font-bold text-gray-800">Leave a message</h2>
			<p class="mb-10 text-center text-gray-500">
				Fill in the form below and we will contact you soon.
			</p>

			<form class="space-y-6">
				<div>
					<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Your name</label>
					<input
						bind:value={form.name}
						type="text"
						required
						class="focus:ring-brown-200 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-600 focus:ring"
					/>
				</div>

				<div>
					<label for="phone" class="mb-1 block text-sm font-medium text-gray-700">Your phone</label>
					<input
						bind:value={form.phone}
						type="tel"
						class="focus:ring-brown-200 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-600 focus:ring"
					/>
				</div>

				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Your email</label>
					<input
						bind:value={form.email}
						type="email"
						required
						class="focus:ring-brown-200 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-600 focus:ring"
					/>
				</div>

				<div>
					<label for="subject" class="mb-1 block text-sm font-medium text-gray-700">Subject</label>
					<input
						bind:value={form.subject}
						type="text"
						class="focus:ring-brown-200 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-600 focus:ring"
					/>
				</div>

				<div>
					<label for="message" class="mb-1 block text-sm font-medium text-gray-700"
						>Your message (optional)</label
					>
					<textarea
						bind:value={form.message}
						rows="5"
						class="focus:ring-brown-200 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-600 focus:ring"
					></textarea>
				</div>

				<div class="pt-4">
					<button
						type="submit"
						class="w-full rounded-md bg-amber-800 py-3 text-white transition hover:bg-amber-400"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	</section>

	<style>
		/* warna custom brown (kalau Tailwind config belum ada) */
		.bg-brown-700 {
			--tw-bg-opacity: 1;
			background-color: rgb(120 63 43 / var(--tw-bg-opacity));
		}
		.hover\:bg-brown-800:hover {
			--tw-bg-opacity: 1;
			background-color: rgb(96 48 32 / var(--tw-bg-opacity));
		}
		.focus\:border-amber-600:focus {
			--tw-border-opacity: 1;
			border-color: rgb(141 84 60 / var(--tw-border-opacity));
		}
		.focus\:ring-brown-200:focus {
			--tw-ring-opacity: 1;
			--tw-ring-color: rgb(233 216 207 / var(--tw-ring-opacity));
		}
	</style>
</main>
<Footer />
