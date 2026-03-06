import { useState } from "react";
import { CartProvider } from "../context/CartContext"; 

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [count, setCount] = useState(
    Math.min(Math.max(initial, 1), stock || 1),
  );

  const dec = () => setCount((c) => Math.max(1, c - 1));
  const inc = () => setCount((c) => Math.min(stock, c + 1));

  return (
    <div className="flex items-center gap-3">
      <button
        className="px-3 py-1 border rounded-lg"
        onClick={dec}
        disabled={stock === 0}
      >
        -
      </button>

<span className="min-w-6 text-center">{count}</span>

<button
  className="px-3 py-1 border rounded-lg"
  onClick={inc}
  disabled={stock === 0}
>
  +
</button>
     <button
        onClick={() => onAdd(count)}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Agregar al carrito
      </button>

      
    </div>
  );
}

