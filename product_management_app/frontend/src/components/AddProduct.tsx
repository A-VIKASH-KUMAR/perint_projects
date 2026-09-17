import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/products";
import { Error as ProductError } from "./Error";

type NewProduct = {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  lastUpdated: string;
};

export const AddProduct: React.FC<{
  onProductAdded?: (product: NewProduct) => void;
}> = ({ onProductAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
    lastUpdated: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await createProduct(formData);
      onProductAdded?.(formData);
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create product";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="price"
          type="number"
          min="0.1"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
          onInvalid={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.validity.rangeUnderflow) {
              target.setCustomValidity("Price must be at least 0.1");
            } else if (target.validity.valueMissing) {
              target.setCustomValidity("Price is required");
            } else {
              target.setCustomValidity("");
            }
          }}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          className="border p-2"
          required
        />
        <input
          name="stock"
          type="number"
          min="0"
          step="1"
          placeholder="Stock"
          onChange={handleChange}
          onInvalid={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.validity.rangeUnderflow) {
              target.setCustomValidity("Stock cannot be negative");
            } else if (target.validity.valueMissing) {
              target.setCustomValidity("Stock is required");
            } else {
              target.setCustomValidity("");
            }
          }}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          className="border p-2"
          required
        />
        <select name="status" onChange={handleChange} className="border p-2">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Discontinued">Discontinued</option>
        </select>
        {error && <ProductError message={error} />}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-default hover:cursor-pointer">
          Add Product
        </button>
      </div>
    </form>
  );
};
