<script>
	import Item from './Item.svelte';

	export let items;
	export let onToggle;
	export let onRemoveClick;
</script>

<ul class="w-96 mx-auto">
	{#each items as item}
		<Item {item} {onToggle} {onRemoveClick} />
	{/each}
</ul>
