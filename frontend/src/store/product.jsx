import { useState } from "react";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProucts: (products) => set({ products }),
  createProduct: async (newProd) => {
    if (!newProd.name || !newProd.price || !newProd.image) {
      return { success: false, message: "Please fill all the data" };
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProd),
      });
      const data = res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product added successfully" };
    }
  },
  getProduct: async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        let json = await res.json();
        set((state) => ({ products: json.data }));
        return json.data;
      }
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  },
  deleteProd: async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.log(error.message);
    }
  },
}));
