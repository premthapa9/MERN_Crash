import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";

const Card = ({ _id: id, name, image, price }) => {
  const { deleteProd } = useProductStore();
  return (
    <div className="border rounded-lg   space-y-3 p-3">
      <div className="w-full h-52">
        <img
          src={image}
          alt=""
          className="h-full w-full object-center rounded-lg"
        />
      </div>

      <h1 className="font-PTSans">{name}</h1>
      <h2 className="font-semibold">${price}</h2>
      <div>
        <button className="p-2 rounded-md border bg-blue-200 text-2xl">
          <FaEdit />
        </button>
        <button
          onClick={() => deleteProd(id)}
          className="p-2 rounded-md border bg-rose-300 text-2xl mx-2"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Card;
