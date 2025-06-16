import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await fetch("https://backend.pinkstories.ae/api/products");
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      console.log("Fetched Products:", result);

      // Use result.data because your API returns products inside data key
      set({ products: result.data || [] });
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      set({ products: [] });
    }
  },
}));





