import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const Navbar = () => {
  const [flag, setFlag] = useState(true);
  return (
    <div className="border-x-0 md:border-x-2 p-3  shadow-md ">
      <div className=" flex justify-between items-center  gap-2 ">
        <Link
          to="/"
          className="font-PTSans text-2xl md:text-3xl text-orange-500 flex items-center gap-1"
        >
          Product List <MdOutlineLocalGroceryStore />
        </Link>
        <div className="flex justify-between items-center gap-2">
          <Link to={"/create"} className="px-2 py-2 bg-gray-500 rounded-sm">
            <FaPlus color="white" />
          </Link>
          <button
            onClick={() => setFlag(!flag)}
            className="px-2 py-2 bg-gray-500 rounded-sm text-white"
          >
            {flag ? <MdModeNight /> : <MdOutlineLightMode />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
