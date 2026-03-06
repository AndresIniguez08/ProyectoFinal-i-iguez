import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productsRef = collection(db, "products");
    const productsQuery = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(productsQuery)
      .then((res) => {
        const productsAdapted = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsAdapted);
      })
      .catch((error) => {
        console.error(error);
        // si algo falla acá, lo dejo en consola para ver rápido qué está pasando con Firebase
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {greeting && !categoryId && (
        <h1 className="mb-4 text-xl font-semibold">{greeting}</h1>
      )}

      {categoryId && (
        <h2 className="mb-4 text-lg font-semibold">
          Categoría: {categoryId}
        </h2>
      )}

      {loading ? <p>Cargando productos...</p> : <ItemList items={products} />}
    </main>
  );
};

export default ItemListContainer;