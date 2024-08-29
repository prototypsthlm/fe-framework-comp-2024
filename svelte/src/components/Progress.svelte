<script>
	export let items;
	$: doneCount = items.reduce((totalDone, item) => (item.isDone ? (totalDone += 1) : totalDone), 0);
	$: progress = items.length > 0 ? (doneCount / items.length) * 100 : 0;
</script>

<div class="w-96 mx-auto my-4 bg-gray-200 h-[4px]">
	<div
		class="h-[4px] bg-red-500 transition-[width] ease-out duration-[600ms]"
		style={`width: ${progress}%`}
	></div>
</div>
