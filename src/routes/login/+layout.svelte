<script>
	export const reset = true; // layout ini independen, tidak mewarisi global
	export let children;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	{@render children()}
</div>
