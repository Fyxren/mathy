<script lang="ts">
	import type { HistoryItem } from '$lib/types/game.interface';
	import { differenceInMilliseconds, formatDate, formatDistanceToNow } from 'date-fns';
	import { onMount } from 'svelte';

	let history: HistoryItem[] = [];
	let loaded = false;

	onMount(() => {
		history = JSON.parse(localStorage.getItem('history') || '[]');
		loaded = true;
	});
</script>

<main class="flex flex-col items-center">
	<h1 class="text-2xl font-bold">History</h1>
	{#if loaded}
		{#if history.length > 0}
			<table class="table table-zebra">
				<thead>
					<tr>
						<th />
						<th>Date</th>
						<th>Time</th>
						<th>Correct</th>
						<th>Incorrect</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each history as item, i}
						<tr>
							<th>{i + 1}</th>
							<td
								class="tooltip tooltip-primary"
								data-tip={formatDate(item.startTime, 'MMM Do, yyyy • HH:mm:ss')}
								>{formatDistanceToNow(item.startTime)} ago</td
							>
							<td>{differenceInMilliseconds(item.endTime, item.startTime) / 1000} seconds</td>
							<td>{item.answers.filter((a) => a.answer === a.question.answer).length}</td>
							<td>{item.answers.filter((a) => a.answer !== a.question.answer).length}</td>
							<td>
								<button class="btn btn-primary btn-xs" on:click={() => console.log(item)}
									>View</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="flex gap-4 mt-16">
				<a href="play" class="btn btn-primary btn-wide">Play</a>
				<a href="/" class="btn btn-primary btn-outline btn-wide">Back</a>
			</div>
		{:else}
			<div class="mt-20 text-center">
				<p>It's quite empty here.. (✿◠‿◠)</p>
				<div class="flex gap-4 mt-16">
					<a href="play" class="btn btn-primary btn-wide">Play</a>
					<a href="/" class="btn btn-primary btn-outline btn-wide">Back</a>
				</div>
			</div>
		{/if}
	{:else}
		<p>Loading...</p>
	{/if}
</main>
