<script lang="ts">
	import Input from '../components/input.svelte';

	let value: number = 0;

	const fields = [
		{
			label: 'decimal',
			decoder: (v: number) => v.toString(),
			encoder: (v: string) => {
				const ret = Number(v);
				if (Number.isNaN(ret)) {
					throw new Error('parse error');
				}
				return ret;
			},
			validator: (v: string) => !v.split('').some((c) => !c.match(/[0-9]/))
		},
		{
			label: 'hex',
			decoder: (v: number) => v.toString(16).toUpperCase(),
			encoder: (v: string) => {
				const ret = parseInt(v, 16);
				if (Number.isNaN(ret)) {
					throw new Error('parse error');
				}
				return ret;
			},
			validator: (v: string) => !v.split('').some((c) => !c.match(/[0-9a-fA-F]/))
		},
		{
			label: 'binary',
			decoder: (v: number) => v.toString(2).toUpperCase(),
			encoder: (v: string) => {
				const ret = parseInt(v, 2);
				if (Number.isNaN(ret)) {
					throw new Error('parse error');
				}
				return ret;
			},
			validator: (v: string) => !v.split('').some((c) => !c.match(/[0-1]/))
		}
	];

	$: console.log(value);
</script>

<section class="page">
	<h1 class="page-heading">HEX DECIMAL CONVERTER</h1>
	{#each fields as field}
		<Input
			{...field}
			{value}
			on:update={(v) => {
				console.log(v);
				value = v.detail.value;
			}}
		/>
	{/each}
</section>

<style>
	.page-heading {
		font-weight: bold;
		font-size: 2.4rem;
		margin: 0 0 40px;
	}
	.page {
		padding: 40px;
	}
</style>
