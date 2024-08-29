'use client'

import { useState, useEffect } from 'react';
import ItemList from './item-list';
import Progress from './progress';

export default function Main({ defaultItems, backendBaseUrl }) {
  const [items, setItems] = useState(defaultItems);

  const addItem = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch(`${backendBaseUrl}/Home/AddItem?output=json`, { method: form.method, body: formData });
    setItems(await res.json());
  }

  const removeItem = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(`${backendBaseUrl}/Home/DeleteItem?output=json`, { method: "post", body: formData });
    setItems(await res.json());
  }

  const toggleItem = async (id, done) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("done", done ? "on" : "off");
    
    const res = await fetch(`${backendBaseUrl}/Home/ToggleItem?output=json`, { method: "post", body: formData });
    const updatedItem = await res.json()

    setItems(items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    }));
  }

  return (
    <main>
      <Progress items={items} />
      <h1 className="h1 text-center">React to-do list</h1>
      <div className="text-center mt-4 mb-2">
        <form method="post" onSubmit={addItem}>
          <input type="text" placeholder="e.g. Mow the lawn" name="item" />
          <button className="ml-2">Add item</button>
        </form>
      </div>
      <ItemList items={items} onToggle={toggleItem} onRemoveClick={removeItem} />
    </main>
  );
}
