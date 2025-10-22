
// import { useState } from "react"
// import AddProduct from "./AddProduct"

import { useEffect, useState } from "react";

export default function StoreProducts({ shop, logedIn, loginType, user }) {
  const [products, setProducts] = useState(shop.products || []);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({ productName: "", price: "", image_url: "" });
const addToCart = async (product) => {
    if (!logedIn) {
      alert("Please login to add product");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.name,       // pass logged-in user's name
          shopName: shop.shopName,   // since you identify shops by name
          productName: product.productName,
          price: product.price,
          image_url: product.image_url
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Added to cart successfully!");
        console.log("Cart:", data);
      } else {
        alert(data.error || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong.");
    }
  };




  const handleDelete = async (productName) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch("http://localhost:3000/delete-product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId: shop._id, productName }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product deleted successfully");
        setProducts(data.shop.products);
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Something went wrong.");
    }
  };

  // ✏️ Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product.productName);
    setEditedData({
      productName: product.productName,
      price: product.price,
      image_url: product.image_url,
    });
  };

  // 💾 Save Updated Product
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/edit-product", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: shop._id,
          oldProductName: editingProduct,
          ...editedData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product updated successfully");
        setProducts(data.shop.products);
        setEditingProduct(null);
      } else {
        alert(data.error || "Failed to update product");
      }
    } catch (err) {
      console.error("Error editing product:", err);
      alert("Something went wrong.");
    }
  };

 

    // const [addProduct, setAddProduct] = useState(false);

    return(
        <>
      {logedIn ? (
        <>
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">

      {/* Navbar */}
      {/* {loginType == "owner" ? (<></>):(

     <h1 onClick={goBack} className="text-2xl font-bold text-indigo-600 cursor-pointer">shops</h1>
      )} */}
    

      {/* Store Header */}
      <div className="max-w-4xl mx-auto p-6">
       {loginType === "owner" ? (<></>):(
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          Welcome to {shop.shopName}
        </h2>
       )} 
        

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shop.products.map((product, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.image_url}
                alt={product.productName}
                className="h-24 w-48 object-cover mb-2 rounded"
              />
              {editingProduct === product.productName ? (
                <div className="space-y-2 w-full">
                  <input
                    type="text"
                    value={editedData.productName}
                    onChange={(e) =>
                      setEditedData({ ...editedData, productName: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    value={editedData.price}
                    onChange={(e) =>
                      setEditedData({ ...editedData, price: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={editedData.image_url}
                    onChange={(e) =>
                      setEditedData({ ...editedData, image_url: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
              <p className="font-semibold text-gray-800">{product.productName}</p>
              <p className="text-gray-600 mb-2">Price: {product.price}</p>
              {loginType === "owner" ?(<>
              <button  onClick={() => handleEdit(product)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition">
                Edit
              </button>
              <button onClick={() => handleDelete(product.productName)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition">
                Delete
              </button>
              </>):(
              <button onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition">
                Add to cart
              </button>
              )}
              </>
            )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
     ):(
      <>
         <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">

      {/* Navbar */}
      

      {/* Store Header */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          Welcome to {shop.shopName}
        </h2>
        

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shop.products.map((product, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.image_url}
                alt={product.productName}
                className="h-24 w-48 object-cover mb-2 rounded"
              />
              <p className="font-semibold text-gray-800">{product.productName}</p>
              <p className="text-gray-600 mb-2">Price: {product.price}</p>
              <button onClick={()=>alert("login to add product")} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
     )}
     </>
    )
}