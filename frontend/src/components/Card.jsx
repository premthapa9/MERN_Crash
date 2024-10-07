import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Card = ({ title, image, price }) => {
  return (
    <div className="border rounded-lg flex justify-between flex-col space-y-3 p-3     ">
      <img src={image} alt="" className="h-36 self-center" />
      <h1 className="font-PTSans">{title}</h1>
      <h2 className="font-semibold">${price}</h2>
      <div>
        <button className="p-2 rounded-md border bg-blue-200 text-2xl">
          <FaEdit />
        </button>
        <button className="p-2 rounded-md border bg-rose-300 text-2xl mx-2">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Card;
