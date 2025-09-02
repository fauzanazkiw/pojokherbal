<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Testimonial = { text: string; name: string; date: string };

	export let testimonials: Testimonial[] = [
		{
			text: `Djanthi jamu mengingatkanku pada nenek... Love u Djanthi jamu 😍`,
			name: 'Bagas',
			date: '02 January 2025'
		},
		{
			text: `Jamu enak banget, tradisional tapi kekinian. Harga terjangkau!`,
			name: 'Hakim',
			date: '15 February 2025'
		},
		{
			text: `Pertama kali coba langsung suka. Tempat cozy, pelayanan ramah.`,
			name: 'Aziz',
			date: '20 March 2025'
		}
	];

	export let autoSlide = true;
	export let autoSlideInterval = 4000;

	// Build slides with clones at both ends:
	// slides = [lastClone, ...testimonials, firstClone]
	const n = testimonials.length;
	let slides: Testimonial[] = [];

	$: slides = n > 0 ? [testimonials[n - 1], ...testimonials, testimonials[0]] : [];

	// position indexes slides array: start at 1 (first real slide)
	let position = 1; // range 0 .. n+1
	let isTransition = false;

	// computed human-friendly active index 0..n-1
	$: activeIndex = n ? (position - 1 + n) % n : 0;

	// transform percent and drag
	let surface!: HTMLButtonElement;
	let track!: HTMLDivElement;
	let isDragging = false;
	let startX = 0;
	let currentX = 0;
	let deltaPx = 0;
	$: dragPct = isDragging && surface?.clientWidth ? (deltaPx / surface.clientWidth) * 100 : 0;
	$: translatePct = -position * 100 + dragPct;

	// transition style reactive
	$: transformStyle = `transform: translateX(${translatePct}%); transition: ${isDragging ? 'none' : isTransition ? 'transform 500ms ease' : 'none'};`;

	// auto slide timer
	let timer: ReturnType<typeof setInterval> | null = null;
	function startAuto() {
		if (!autoSlide || n <= 1) return;
		stopAuto();
		timer = setInterval(() => {
			next();
		}, autoSlideInterval);
	}
	function stopAuto() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function next() {
		if (isTransition) return;
		isTransition = true;
		position += 1; // will animate; if reaches n+1 (firstClone) handle on transitionend
	}
	function prev() {
		if (isTransition) return;
		isTransition = true;
		position -= 1; // if becomes 0 (lastClone) handle on transitionend
	}
	function goTo(i: number) {
		if (isTransition) return;
		// i in 0..n-1 -> position = i+1
		isTransition = true;
		position = i + 1;
		startAuto();
	}

	// pointer handlers
	let pointerId: number | null = null;

	function onPointerDown(e: PointerEvent) {
		if (!surface) return;
		if (!e.isPrimary) return;
		e.preventDefault();
		stopAuto();
		isDragging = true;
		startX = e.clientX;
		currentX = startX;
		deltaPx = 0;
		pointerId = e.pointerId;
		try {
			(e.currentTarget as Element).setPointerCapture(e.pointerId);
		} catch {}
		// while dragging, disable transition so transformStyle picks 'none'
		isTransition = false;
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		if (pointerId !== null && e.pointerId !== pointerId) return;
		currentX = e.clientX;
		deltaPx = currentX - startX;
	}

	function finishDrag(e?: PointerEvent) {
		if (!isDragging) return;
		isDragging = false;
		// threshold: 12% width or 60px
		const threshold = Math.max(60, (surface?.clientWidth || 0) * 0.12);
		if (deltaPx > threshold) {
			prev();
		} else if (deltaPx < -threshold) {
			next();
		} else {
			// snap back
			isTransition = true;
			// position unchanged; transitionend will set isTransition=false
		}
		deltaPx = 0;
		if (pointerId !== null && e) {
			try {
				(e.currentTarget as Element).releasePointerCapture(pointerId);
			} catch {}
		}
		pointerId = null;
		startAuto();
	}

	function onPointerUp(e: PointerEvent) {
		if (pointerId !== null && e.pointerId !== pointerId) return;
		finishDrag(e);
	}

	function onPointerCancel(e: PointerEvent) {
		if (pointerId !== null && e.pointerId !== pointerId) return;
		finishDrag(e);
	}

	// transitionend: handle jump when hitting clones
	function onTrackTransitionEnd() {
		// finished animating
		// if we moved to the final clone at right (position === n+1), jump to 1
		if (position === n + 1) {
			// jump to real first slide WITHOUT transition
			isTransition = false;
			position = 1;
		}
		// if moved to left clone (position === 0), jump to n
		else if (position === 0) {
			isTransition = false;
			position = n;
		} else {
			// normal slide end
			isTransition = false;
		}
	}

	// keyboard
	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			prev();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			next();
		}
	}

	// when testimonials array changes, reset slides & position
	$: if (n > 0 && position > n + 1) {
		position = 1;
	}

	// auto start/stop reactive to prop
	$: {
		if (autoSlide) startAuto();
		else stopAuto();
	}

	onMount(() => {
		// ensure track listens to transitionend
		if (track) track.addEventListener('transitionend', onTrackTransitionEnd);
		startAuto();
	});
	onDestroy(() => {
		if (track) track.removeEventListener('transitionend', onTrackTransitionEnd);
		stopAuto();
	});
</script>

<div class="relative w-full overflow-hidden px-4 py-16 text-center text-white">
	<!-- Background -->
	<div class="absolute inset-0 bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-no-repeat"></div>
	<div class="absolute inset-0 bg-amber-900/80" style="background-blend-mode: multiply;"></div>

	<div class="relative z-10">
		<h2 class="mb-4 text-3xl font-bold md:text-4xl">
			Testimoni <span class="text-amber-300">Pelanggan</span> Tentang Produk Kami
		</h2>
		<p class="mb-10 text-lg/relaxed text-white/90">
			Apa yang pelanggan kami katakan tentang jamu kami
		</p>

		<!-- interactive surface -->
		<button
			bind:this={surface}
			type="button"
			class="mx-auto block w-full max-w-3xl cursor-grab overflow-hidden rounded-2xl p-0 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:cursor-grabbing"
			aria-label="Geser untuk melihat testimoni"
			aria-roledescription="carousel"
			aria-live="off"
			on:pointerdown={onPointerDown}
			on:pointermove={onPointerMove}
			on:pointerup={onPointerUp}
			on:pointercancel={onPointerCancel}
			on:keydown={onKeyDown}
			on:click|preventDefault
		>
			<!-- track -->
			<div bind:this={track} class="flex will-change-transform" style={transformStyle}>
				{#if slides.length}
					{#each slides as s}
						<div class="w-full flex-shrink-0 px-4">
							<p class="text-lg leading-relaxed italic md:text-xl">"{s.text}"</p>
							<p class="mt-6 text-xl font-semibold">{s.name}</p>
							<p class="text-sm text-white/80 italic">{s.date}</p>
						</div>
					{/each}
				{/if}
			</div>
		</button>

		<!-- bullets -->
		<div class="mt-8 flex justify-center gap-2">
			{#each testimonials as _, i}
				<button
					type="button"
					class="h-3.5 w-3.5 rounded-full border border-white/80 transition-all"
					class:bg-white={i === activeIndex}
					aria-label={'Ke slide ' + (i + 1)}
					aria-current={i === activeIndex ? 'true' : undefined}
					on:click={() => goTo(i)}
				></button>
			{/each}
		</div>

		<!-- SR status -->
		<p class="sr-only" aria-live="polite">Slide {activeIndex + 1} dari {n}</p>
	</div>
</div>

<style>
	/* allow vertical scroll on touch but prevent double-tap zoom interfering */
	button {
		touch-action: pan-y;
	}
</style>
