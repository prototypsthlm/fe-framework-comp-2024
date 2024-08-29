import Item from './item';

export default function ItemList({ items, onToggle, onRemoveClick }) {
  return (
    <ul className="w-96 mx-auto">
      {items.map(item => 
        <Item key={item.id} item={item} onToggle={onToggle} onRemoveClick={onRemoveClick} />
      )}
    </ul>
  );
}
