import { useState } from "react";
import { uploadImageFile } from "../utils/upload";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export default function AddProduct({ goBack, shopId }) {
  const [imageFile, setImageFile] = useState(null);
  const [image_url, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");

  const productHandler = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !price.trim()) {
      alert("Product name and price are required");
      return;
    }

    try {
      // Final URL to send
      let image_url_to_send = image_url;

      // If file selected → upload to Cloudinary
      if (imageFile) {
        try {
          image_url_to_send = await uploadImageFile(imageFile); // RETURNS STRING
        } catch (upErr) {
          console.error("Image upload failed:", upErr);
          alert("Image upload failed");
          return;
        }
      }

      // POST to backend route (must use BASE_URL!)
      const res = await fetch(`${BASE_URL}/api/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          shopId,
          productName,
          price,
          image_url: image_url_to_send,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Add product failed:", errText);
        alert("Failed to add product");
        return;
      }

      // Clear fields
      setImageUrl("");
      setImageFile(null);
      setPrice("");
      setProductName("");

      goBack();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Server error");
    }
  };


    return(
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

           {/* Form Card */}
           <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
             <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
               <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-white mb-2">
                   Add New Product
                 </h2>
                 <p className="text-gray-200">Expand your inventory</p>
               </div>
                 

               <form onSubmit={productHandler} className="space-y-6">
                 <div>
                   <input
                     placeholder="Product Name"
                     value={productName}
                     onChange={(e) => setProductName(e.target.value)}
                     className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                   />
                 </div>
                 <div>
                   <input
                     placeholder="Price"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                   />
                 </div>
                 <div>
                   <label className="text-sm text-white mb-2 block">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm file:bg-white/20 file:rounded-xl text-white"
                />
                 </div>
                 <button
                   type="submit"
                   className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                 >
                   Add Product
                 </button>
                 <button
                   type="button"
                   onClick={goBack}
                   className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                 >
                   Back to Shop
                 </button>
               </form>
             </div>
           </div>
         </div>
    </>
    )
}