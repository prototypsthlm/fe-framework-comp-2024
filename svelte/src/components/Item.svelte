<script>
	export let item;
	export let onToggle;
	export let onRemoveClick;
</script>

<li class="mb-1">
	<label>
		<input
			type="checkbox"
			checked={item.isDone}
			on:change={(e) => onToggle(item.id, e.target?.checked)}
			class="mr-1"
		/>
		{item.description}
		<button on:click={() => onRemoveClick(item.id)} class="ml-2">X</button>
	</label>
</li>
