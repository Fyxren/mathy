<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { game } from './game';
	import type { Answer, Question } from '$lib/types/game.interface';
	import { differenceInMilliseconds } from 'date-fns';

	let questions: Question[] = [];
	let currentQuestion: Question | null = null;
	let answers: Answer[] = [];
	let startTime: Date | null = null;
	let endTime: Date | null = null;
	let answer: number | null = null;
	let inputElement: HTMLInputElement | null = null;

	onMount(async () => {
		startGame();
	});

	function startGame() {
		console.log('Starting game....');
		startTime = new Date();
		questions = game.generateQuestions();
		nextQuestion();
	}

	function resetGame() {
		console.log('Reseting game....');
		questions = [];
		currentQuestion = null;
		answers = [];
		startTime = null;
		endTime = null;
		answer = null;
		inputElement = null;

		startGame();
	}

	afterUpdate(() => {
		if (currentQuestion && inputElement) {
			inputElement.focus();
		}
	});

	function nextQuestion() {
		if (questions.length > 0) {
			currentQuestion = questions.pop()!;
		} else {
			currentQuestion = null;
			endTime = new Date();
			game.saveHistory(startTime!, endTime, answers);
		}
	}

	function submitAnswer() {
		console.log(answer, currentQuestion && answer === 0);
		if (currentQuestion && answer === 0) {
			answers.push({ question: currentQuestion, answer });
		} else if (currentQuestion && answer) {
			answers.push({ question: currentQuestion, answer });
		} else if (currentQuestion) {
			answers.push({ question: currentQuestion, answer: undefined });
		}
		answer = null;
		nextQuestion();
	}

	function calculateTime() {
		if (startTime && endTime) return differenceInMilliseconds(endTime, startTime) / 1000;
		return '???';
	}
</script>

{#if currentQuestion}
	<div class="flex justify-center mt-40">
		<div class="flex flex-col justify-center w-full max-w-md gap-6 text-center">
			<div class="text-5xl font-bold">{currentQuestion.question}</div>
			<input
				type="number"
				bind:this={inputElement}
				bind:value={answer}
				class="input input-bordered"
				on:keydown={(e) => e.key === 'Enter' && submitAnswer()}
			/>
			<button on:click={() => submitAnswer()} class="btn btn-primary">Submit</button>
		</div>
	</div>
{:else}
	<div class="flex justify-center mt-20">
		<div class="space-y-8 text-center">
			<div class="text-xl">
				Time: <span class="font-mono font-bold">{calculateTime()}</span> seconds
			</div>
			<div class="flex flex-col gap-8">
				{#each answers as { question, answer }, i}
					<div class="flex flex-col justify-between text-lg">
						<div class="text-xl font-bold">Question {i + 1}</div>
						<div
							class={`mt-2 font-mono ${answer === question.answer ? 'text-success' : answer === undefined ? 'text-warning' : 'text-error'}`}
						>
							{question.question}

							{#if answer === question.answer}
								= <span class="font-bold">{answer}</span>
							{:else if answer === undefined}
								<span class="font-bold">≠ No answer</span>
							{:else}
								<span class="font-bold"> ≠ {answer}</span>
							{/if}
						</div>
						{#if answer !== question.answer}
							<div class="text-base">
								Correct answer: <span class="font-mono font-bold">{question.answer}</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex gap-4">
				<button on:click={() => resetGame()} class="btn btn-wide btn-primary"> Play again </button>
				<a class="btn btn-outline btn-primary btn-wide" href="/history">History</a>
			</div>
		</div>
	</div>
{/if}
