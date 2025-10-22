import { useState } from "react";

export default function AddProduct({goBack, shopId}){

    const [image_url, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");


  
    const productHandler = async (e) => {
        e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         shopId,
          productName,
          price,
          image_url,
        }),
      });

      const data = await res.json();
      
       setImageUrl("");
      setPrice("");
      setProductName("");
      goBack();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

    return(
        <>
       
         <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">

      

      {/* Form Card */}
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Add Product
          </h2>
           

          <form onSubmit={productHandler} className="space-y-4">
            <input
              placeholder="Image URL"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition font-medium"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={goBack}
              className="w-full py-2 mt-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition font-medium"
            >
              Go to Shop
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
    )
}