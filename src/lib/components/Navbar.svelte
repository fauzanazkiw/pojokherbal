<script>
	import '@fontsource/lato';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let scrolled = false;
	function handleScroll() {
		scrolled = window.scrollY > 0;
	}
	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	class={`font-lato fixed top-0 right-0 left-0 z-20 flex items-center justify-center px-6 py-3 transition-all duration-300 ${
		scrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-transparent'
	}`}
>
	<div class="flex w-full max-w-6xl items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-3">
			<img class="-my-5 h-30 w-auto" src="/djanthi.png" alt="Djanthi Logo" />
		</a>
		<ul
			class={`flex gap-10 font-mono text-sm font-bold transition-colors duration-300 ${
				scrolled ? 'text-black' : 'text-white/70'
			}`}
		>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About us</a></li>
			<li><a href="/products">Products</a></li>
			<li><a href="/contact">Contact</a></li>
			<li>
				<a href="https://www.instagram.com" target="_blank" rel="noopener">
					<Icon icon="mdi:instagram" class="h-6 w-6" />
				</a>
			</li>
		</ul>
	</div>
</nav>
