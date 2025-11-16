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
      const res = await fetch("/api/add-to-cart", {
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
      const res = await fetch("/api/delete-product", {
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
      const res = await fetch("/api/edit-product", {
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-pink-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>

          {/* Store Header */}
          <div className="relative z-10 max-w-6xl mx-auto p-6">
           {loginType === "owner" ? (
             <div className="text-center mb-8">
               <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                 Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Products</span>
               </h2>
               <p className="text-gray-200 text-lg">Manage your inventory</p>
             </div>
           ):(
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">{shop.shopName}</span>
              </h2>
              <p className="text-gray-200 text-lg">Discover amazing products</p>
            </div>
           )} 
            

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {shop.products.map((product, i) => (
                <div
                  key={i}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up"
                  style={{animationDelay: `${i * 0.1}s`}}
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.image_url}
                      alt={product.productName}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {editingProduct === product.productName ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedData.productName}
                        onChange={(e) =>
                          setEditedData({ ...editedData, productName: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300"
                        placeholder="Product Name"
                      />
                      <input
                        type="number"
                        value={editedData.price}
                        onChange={(e) =>
                          setEditedData({ ...editedData, price: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300"
                        placeholder="Price"
                      />
                      <input
                        type="text"
                        value={editedData.image_url}
                        onChange={(e) =>
                          setEditedData({ ...editedData, image_url: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300"
                        placeholder="Image URL"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">{product.productName}</h3>
                      <p className="text-gray-200 mb-4 text-lg">
                        <span className="font-medium text-yellow-300">Price:</span> ₹{product.price}
                      </p>
                      {loginType === "owner" ?(
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(product)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(product.productName)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                            Delete
                          </button>
                        </div>
                      ):(
                        <button onClick={() => addToCart(product)}
                                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                          Add to Cart
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {shop.products.length === 0 && (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Products Available</h3>
                <p className="text-gray-300">This shop doesn't have any products yet.</p>
              </div>
            )}
          </div>
        </div>
        </>
       ) : (
        <>
         <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
           {/* Animated Background Elements */}
           <div className="absolute inset-0 overflow-hidden">
             <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
             <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
             <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
           </div>

           {/* Floating Elements */}
           <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-60 animate-bounce"></div>
           <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
           <div className="absolute bottom-40 left-20 w-5 h-5 bg-pink-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>

           {/* Store Header */}
           <div className="relative z-10 max-w-6xl mx-auto p-6">
             <div className="text-center mb-8">
               <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                 Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">{shop.shopName}</span>
               </h2>
               <p className="text-gray-200 text-lg">Discover amazing products</p>
             </div>
             
             {/* Products Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {shop.products.map((product, i) => (
                 <div
                   key={i}
                   className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up"
                   style={{animationDelay: `${i * 0.1}s`}}
                 >
                   <div className="relative overflow-hidden rounded-xl mb-4">
                     <img
                       src={product.image_url}
                       alt={product.productName}
                       className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">{product.productName}</h3>
                   <p className="text-gray-200 mb-4 text-lg">
                     <span className="font-medium text-yellow-300">Price:</span> ₹{product.price}
                   </p>
                   <button onClick={()=>alert("Please login to add products to cart")} className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                     Login to Add Cart
                   </button>
                 </div>
               ))}
             </div>

             {/* Empty State */}
             {shop.products.length === 0 && (
               <div className="text-center py-16">
                 <div className="w-32 h-32 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center">
                   <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">No Products Available</h3>
                 <p className="text-gray-300">This shop doesn't have any products yet.</p>
               </div>
             )}
           </div>
         </div>
        </>
       )}
       </>
    )
}