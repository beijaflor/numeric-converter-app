<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: number;
	export let decoder: (value: number) => string;
	export let encoder: (value: string) => number;

	let innerValue: string;
	const dispatch = createEventDispatcher();

	const inputHandler = (v: Event & { currentTarget: HTMLInputElement }) => {
		try {
			if (v.currentTarget.value === '') {
				v.currentTarget.value = decoder(0);
				dispatch('update', { value: 0 });
			} else {
				const num = encoder(v.currentTarget.value);
				if (num.toString() !== v.currentTarget.value) {
					v.currentTarget.value = num.toString();
				}
				dispatch('update', { value: num });
			}
		} catch (e) {
			v.currentTarget.value = decoder(value);
			console.info(e);
		}
	};

	$: if (innerValue !== decoder(value)) {
		console.log('watch');
		innerValue = decoder(value);
	}
</script>

<label class="input-component">
	<span class="label-text">{label}</span>
	<input class="input" value={decoder(value)} on:input={inputHandler} />
</label>

<style>
	.input-component {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 400px;
		margin: 0 0 10px;
	}
	.label-text {
		flex-basis: 40%;
		text-transform: uppercase;
	}
	.input {
		font-family: monospace;
		flex-basis: 60%;
		border: solid 1px #ddd;
		border-radius: 4px;
		padding: 4px 8px;
	}
</style>
