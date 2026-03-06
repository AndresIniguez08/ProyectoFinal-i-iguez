import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { db } from "../firebase/config";

export default function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // con esto evito que el form haga el submit tradicional y recargue toda la página

    setError("");

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Completá todos los campos.");
      return;
    }

    try {
      setLoading(true);

      const order = {
        buyer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      };
      // acá estoy armando la orden con los datos del comprador, los productos y el total final

      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);
      // acá guardo la compra en Firestore y me traigo el id que genera la base

      setOrderId(docRef.id);
      clearCart();
      // una vez que la orden salió bien, vacío el carrito para cerrar la compra
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al generar la orden. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <main className="mx-auto max-w-6xl p-4">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            ¡Compra realizada con éxito!
          </h2>

          <p className="mb-2 text-gray-700">Tu número de orden es:</p>

          <p className="mb-4 text-lg font-semibold text-green-700">
            {orderId}
          </p>

          <Link to="/" className="text-blue-600 underline">
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <div className="max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Checkout</h2>

        {error && (
          <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-900 px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Generando orden..." : "Confirmar compra"}
          </button>
        </form>
      </div>
    </main>
  );
}