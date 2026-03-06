import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productRef = doc(db, "products", itemId);

    getDoc(productRef)
      .then((res) => {
        if (res.exists()) {
          setItem({
            id: res.id,
            ...res.data(),
          });
        } else {
          setItem(null);
        }
      })
      .catch((error) => {
        console.error(error);
        // si falla la carga del detalle, lo dejo logueado así detecto rápido dónde está el problema
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) return <main className="p-4">Cargando detalle...</main>;
  if (!item) return <main className="p-4">Producto no encontrado.</main>;

  return (
    <main className="mx-auto max-w-6xl p-4">
      <ItemDetail item={item} />
    </main>
  );
}