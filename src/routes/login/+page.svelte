<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 pt-1">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">Login to Your Account</h1>
		<form method="post" use:enhance class="space-y-5">
			<div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				name="login"
				class="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
			>
				Login
			</button>
		</form>
	</div>
</div>
