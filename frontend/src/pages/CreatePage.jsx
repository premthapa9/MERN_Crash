import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { products, createProduct } = useProductStore();
  console.log(products);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSub = async (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.image) {
      console.log("All field are mandatory");
    } else {
      // console.log(data);
      // console.log("We are good to go buddy");
      const { success, message } = await createProduct(data);
      console.log("Success:", success);
      console.log("Message:", message);
      setData({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  return (
    <div className="border-x-0 md:border-x-2 p-3 bg-slate-500">
      <div className="flex justify-center flex-col gap-2 items-center container">
        <h1 className="font-PTSans font-bold mb-3 text-center text-white text-2xl md:text-3xl">
          Create New Product
        </h1>
        <form
          onSubmit={handleSub}
          className="rounded-md w-full md:w-3/5 p-2 border flex flex-col gap-4"
        >
          <input
            type="text"
            autoComplete="off"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="p-2 outline-none  rounded-md "
            placeholder="Product Name"
          />
          <input
            type="number"
            name="price"
            autoComplete="off"
            value={data.price}
            onChange={handleChange}
            className="p-2 rounded-md outline-none"
            placeholder="Price"
          />
          <input
            type="text"
            name="image"
            autoComplete="off"
            value={data.image}
            onChange={handleChange}
            className="p-2 outline-none rounded-md"
            placeholder="Image URL"
          />
          <button
            type="submit"
            className="p-2 text-2xl text-white font-PTSans rounded-sm bg-blue-500 outline-none"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
