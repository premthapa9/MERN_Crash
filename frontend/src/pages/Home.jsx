import React from "react";
import { products } from "../data/data";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="border-x-0 md:border-x-2 p-3 pt-5">
      <div>
        <h1 className="text-center mb-5 text-orange-500 font-PTSans text-3xl ">
          Current Product
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {products.length > 0 ? (
            products.map((prod, el) => <Card key={prod.id} {...prod} />)
          ) : (
            <h1>Product Not Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
