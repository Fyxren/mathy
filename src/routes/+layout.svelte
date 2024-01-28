<script>
	import Topbar from '$lib/components/elements/Topbar.svelte';
	import '../app.css';
</script>

<div class="container h-screen max-h-screen px-16 space-y-4">
	<Topbar />
	<div class="">
		<slot />
	</div>
</div>
