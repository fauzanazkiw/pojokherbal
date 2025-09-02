<script lang="ts">
	import { onMount } from 'svelte';

	let partners = [
		{
			src: '/images/logo1.png',
			alt: 'Perkumpulan Profesi Kesehatan Tradisional',
			name: 'Bangga Buatan Indonesia'
		},
		{
			src: '/images/logo2.jpg',
			alt: 'UMKM Binaan PUI Pujakesuma',
			name: 'UMKM Pujakesuma'
		}
	];

	// bind to this element
	let track!: HTMLDivElement;

	// computed values
	let marqueeWidth = 0; // px for one set
	let duration = 12; // seconds

	// speed px per second (adjust)
	const pxPerSecond = 50;

	onMount(() => {
		// Wait for layout; compute widths
		requestAnimationFrame(() => {
			if (!track) return;
			// track contains two sets, so oneSetWidth = scrollWidth / 2
			const total = track.scrollWidth;
			if (total > 0) {
				marqueeWidth = Math.round(total / 2);
				duration = Math.max(4, Math.round(marqueeWidth / pxPerSecond));
			}
		});
	});
</script>

<section class="bg-white py-12">
	<div class="mx-auto max-w-6xl text-center">
		<h2 class="mb-8 text-2xl font-bold text-gray-800">
			Partner <span class="text-amber-300">Kami</span>
		</h2>

		<!-- marquee wrapper -->
		<div class="relative w-full overflow-hidden">
			<!-- track has two copies to make seamless loop -->
			<div
				bind:this={track}
				class="marquee-track flex items-center whitespace-nowrap"
				style={'--marquee-width: ' + marqueeWidth + 'px; --marquee-duration: ' + duration + 's;'}
				role="list"
			>
				{#each [0, 1] as pass}
					{#each partners as partner (partner.src + '-' + pass)}
						<div
							class="marquee-item flex flex-shrink-0 items-center space-x-4 px-8"
							role="listitem"
							aria-hidden={pass === 1 ? 'true' : 'false'}
						>
							<img src={partner.src} alt={partner.alt} class="h-20 w-auto object-contain" />
							<p class="text-lg font-medium text-gray-700">{partner.name}</p>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* marquee keyframes: move left by exactly --marquee-width (px) */
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(var(--marquee-width) * -1));
		}
	}

	.marquee-track {
		animation-name: marquee;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-duration: var(--marquee-duration, 1s);
	}

	.relative:hover .marquee-track {
		animation-play-state: paused;
	}

	/* respects reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none !important;
			transform: none !important;
		}
	}

	/* small visual spacing for items */
	.marquee-item {
		gap: 1rem;
	}
</style>
