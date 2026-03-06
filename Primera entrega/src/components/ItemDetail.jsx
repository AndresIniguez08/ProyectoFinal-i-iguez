import { useState } from "react";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

export default function ItemDetail({ item }) {
  const [added, setAdded] = useState(0);
  const { addItem } = useCart();

  const handleAdd = (quantity) => {
    addItem(item, quantity);
    setAdded(true);
  };

  return (
    <section className="bg-white border rounded-xl p-4 shadow-sm grid gap-4 md:grid-cols-2">
      <img
        src={item.pictureUrl}
        alt={item.title}
        className="w-full rounded-lg"
      />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
        <p className="text-gray-600">{item.description}</p>

        <div className="pt-2">
          <p className="text-sm text-gray-500">Categoría: {item.category}</p>
          <p className="text-xl font-semibold">${item.price}</p>
          <p className="text-sm text-gray-500">Stock: {item.stock}</p>
        </div>

        <div className="pt-3">
          {/* ✅ interfaz para agregar unidades al carrito */}
          {added > 0 ? (
            <p className="font-semibold">Agregaste {added} unidades ✅</p>
          ) : (
            <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
          )}
        </div>
      </div>
    </section>
  );
}
