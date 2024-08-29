<script>
	import ItemList from '../components/ItemList.svelte';
	import Progress from '../components/Progress.svelte';

	// the data property is populated server-side on load in +page.js
	export let data;
	let { items, backendBaseUrl } = data;

	async function addItem(e) {
		e.preventDefault();

		const form = e.target;
		if (form instanceof HTMLFormElement) {
			const formData = new FormData(form);

			const res = await fetch(`${backendBaseUrl}/Home/AddItem?output=json`, {
				method: form.method,
				body: formData
			});
			items = await res.json();
		}
	}

	async function removeItem(id) {
		const formData = new FormData();
		formData.append('id', id);

		const res = await fetch(`${backendBaseUrl}/Home/DeleteItem?output=json`, {
			method: 'post',
			body: formData
		});
		items = await res.json();
	}

	async function toggleItem(id, done) {
		const formData = new FormData();
		formData.append('id', id);
		formData.append('done', done ? 'on' : 'off');

		const res = await fetch(`${backendBaseUrl}/Home/ToggleItem?output=json`, {
			method: 'post',
			body: formData
		});
		const updatedItem = await res.json();

		items = items.map((item) => {
			if (item.id === updatedItem.id) {
				return updatedItem;
			}
			return item;
		});
	}
</script>

<main>
	<Progress {items} />
	<h1 class="h1 text-center">Svelte to-do list</h1>
	<div class="text-center mt-4 mb-2">
		<form method="post" on:submit={addItem}>
			<input type="text" placeholder="e.g. Mow the lawn" name="item" />
			<button class="ml-2">Add item</button>
		</form>
	</div>
	<ItemList {items} onToggle={toggleItem} onRemoveClick={removeItem} />
</main>
