export default function Item({ item, onToggle, onRemoveClick }) {
  return (
    <li className="mb-1">
      <label>
        <input
          type="checkbox"
          checked={item.isDone}
          onChange={e => onToggle(item.id, e.target.checked)}
          className="mr-1"
        />
        {item.description}
        <button onClick={() => onRemoveClick(item.id)} className="ml-2">X</button>
      </label>
    </li>
  );
}
