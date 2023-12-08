import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: false },
];
function App() {
  const [newList, setNewList] = useState([]);
  const numOfItems = newList.length;
  const packedItems = newList.filter((item) => item.packed).length;
  const handleClear = () => {
    setNewList([])
  }
  function handleAddItems(item) {
    setNewList((items) => [...items, item]);
  }
  const handlePacked = (id) => {
    setNewList((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handleDeleteItem = (id) => {
    setNewList((items) => items.filter((item) => item.id !== id));
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        handleClear={handleClear}
        items={newList}
        onDeleteItems={handleDeleteItem}
        onPacked={handlePacked}
      />
      <Stats newList={newList} onNumItems={numOfItems} onPackedItems={packedItems} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setQuantity(1);
    setDescription("");
    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤨</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onPacked, handleClear }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if(sortBy === 'input') sortedItems = items;

  if(sortBy === 'description') sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));

  if(sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onPacked={onPacked}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button className="actions" onClick={handleClear}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onPacked }) {
  return (
    <li>
      <button onClick={() => onPacked(item.id)}>✅</button>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ onNumItems, onPackedItems, newList }) {
  if(!newList.length) return (<footer className="stats"
><em>Start Adding Items!</em></footer>)
  return (
    <footer className="stats">
      <em>
        {
        onPackedItems !== onNumItems?
        `You have ${onNumItems} items on your list and you already packed
        ${onPackedItems} (${((onPackedItems / onNumItems) * 100).toFixed(0)}% )`
        : `You Are All Set To Go, Enjoy ✈️`
}     
      </em>
    </footer>
  );
}
export default App;
