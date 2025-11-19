import { useState } from "react";
import AddProduct from "./AddProduct";
import StoreProducts from "./StoreProducts";
import { apiFetch } from "../utils/api";

export default function LoginPage({ setLogedinPage, setSelectedShop, setLogedIn, logedIn, shop, loginType, setLoginType, setUser}) {
  const [addProduct, setAddProduct] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [password, setPassword] = useState("");
  
  
  

  
  const submitHandler = async (e) => {
  e.preventDefault();

  if (!ownerName || !password) {
    alert("Please enter both name and password");
    return;
  }

  try {
    if (loginType === "owner") {
      const res = await apiFetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerName, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      setSelectedShop(data.owner);
      setLogedIn();
    } else {
      const res = await apiFetch("/api/login-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: ownerName, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      setUser(data.user);
      setLogedIn();
      setLogedinPage();
    }

    setOwnerName("");
    setPassword("");
  } catch (err) {
    console.error("Error logging in:", err);
    alert("Server error. Please try again later.");
  }
};


  

  return (
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

      { !logedIn ? (
        // LOGIN CARD
        <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-200">Sign in to your account</p>
            </div>

            <div className="flex justify-center space-x-6 mb-8">
              <label className="flex items-center space-x-2 text-white cursor-pointer group">
                <input
                  type="radio"
                  value="owner"
                  checked={loginType === "owner"}
                  onChange={(e) => setLoginType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="group-hover:text-yellow-300 transition-colors duration-300">Owner</span>
              </label>

              <label className="flex items-center space-x-2 text-white cursor-pointer group">
                <input
                  type="radio"
                  value="user"
                  checked={loginType === "user"}
                  onChange={(e) => setLoginType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="group-hover:text-yellow-300 transition-colors duration-300">User</span>
              </label>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="relative">
                <input
                  placeholder={loginType === "owner" ? "Owner Name" : "User Name"}
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                />
              </div>
              <div className="relative">
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      ) :  (
        // OWNER VIEW
        <div className="relative z-10 p-6">
          {addProduct ? (
            <AddProduct
              goBack={() => setAddProduct(false)}
              
              shopId={shop._id}
              
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                  Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">{shop.ownerName}</span>
                </h2>
                <p className="text-gray-200 text-lg">Manage your shop products</p>
              </div>
              <div className="text-center mb-8">
                <button 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold" 
                  onClick={() => setAddProduct(true)}
                >
                  Add New Product
                </button>
              </div>
              
                <StoreProducts shop={shop} logedIn={logedIn} loginType={loginType} ></StoreProducts>
              
            </div>
          )}
        </div>
      ) 
    }
    </div>
  );
}
