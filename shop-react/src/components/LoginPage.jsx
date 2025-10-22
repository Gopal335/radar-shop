import { useState } from "react";
import AddProduct from "./AddProduct";
import StoreProducts from "./StoreProducts";


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
      const res = await fetch("http://localhost:3000/login", {
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
      const res = await fetch("http://localhost:3000/login-user", {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">

      {/* Navbar */}
     

      { !logedIn ? (
        // LOGIN CARD
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Login
            </h2>

            <div className="flex justify-center space-x-6 mb-6">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  value="owner"
                  checked={loginType === "owner"}
                  onChange={(e) => setLoginType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Owner</span>
              </label>

              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  value="user"
                  checked={loginType === "user"}
                  onChange={(e) => setLoginType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>User</span>
              </label>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <input
                placeholder={loginType === "owner" ? "Owner Name" : "User Name"}
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition font-medium"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      ) :  (
        // OWNER VIEW
        <div className="p-6">
          {addProduct ? (
            <AddProduct
              goBack={() => setAddProduct(false)}
              
              shopId={shop._id}
              
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Welcome {shop.ownerName} to your shop
              </h2>
              <div className="space-x-4 mb-4">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition" onClick={() => setAddProduct(true)}>Add new product</button>
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
