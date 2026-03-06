import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <article className="border rounded-lg p-3 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-1">

      <img
        src={item.pictureUrl}
        alt={item.title}
        className="w-full rounded mb-2"
      />
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600">${item.price}</p>

      <Link
  to={`/item/${item.id}`}
  className="mt-3 block w-full rounded-md bg-gray-900 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-800"
>
  Ver detalle
</Link>


    </article>
  );
};

export default Item;
