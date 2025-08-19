<div class="flex min-h-screen bg-amber-200">
	<div class="m-auto flex flex-col">
		<div class="p-2.5 text-center">
			<h3 class="h3">Login to your account</h3>
			<p class="text-surface-400">Enter your email below to login to your account</p>
		</div>
		<form action="?login" method="post" class="flex flex-col gap-4 px-2.5">
			<input
				class="rounded border bg-transparent p-2.5 outline-none dark:border-surface-700"
				type="email"
				required
				name="input-email"
				placeholder="Email"
			/>
			<input
				class="rounded border bg-transparent p-2.5 outline-none dark:border-surface-700"
				type="password"
				name="input-password"
				placeholder="Password"
				required
			/>
			<button class="btn rounded preset-tonal-warning via-red-500 font-bold" type="submit"
				>Login</button
			>
		</form>
	</div>
</div>
