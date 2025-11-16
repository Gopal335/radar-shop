import { useEffect, useState } from "react";

function Cart({ user }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.name) return;

    async function fetchCart() {
      try {
        const res = await fetch(`/api/get-cart/${user.name}`);
        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        console.log("Cart data:", data);

        if (!data.shops || data.shops.length === 0) {
          setCart({ shops: [] });
        } else {
          setCart(data);
        }
      } catch (err) {
        console.error("Error loading cart:", err);
        setCart({ shops: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white">
        Your cart is loading...
      </div>
    );

  if (!cart || cart.shops.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-white">
        Your cart is empty.
      </div>
    );

    const removeProduct = async (shopName, productName) => {
    try {
      const res = await fetch(`/api/remove-from-cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: user.name, shopName, productName }),
      });

      if (!res.ok) throw new Error("Failed to remove product");

      const data = await res.json();
      console.log("Updated cart:", data.cart);

      // ✅ Update frontend instantly
      setCart(data.cart);
    } catch (err) {
      console.error("Error removing product:", err);
      alert("Could not remove product");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white">
        Your cart is loading...
      </div>
    );

  if (!cart || cart.shops.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-white">
        Your cart is empty.
      </div>
    );

    

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

      <div className="relative z-10 p-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">{user.name}</span>'s Cart
          </h2>
          <p className="text-gray-200 text-lg">Your shopping cart</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cart.shops.map((shop, i) => (
              <div
                key={i}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {shop.shopName}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4 mb-6">
                  {shop.products.map((p, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={p.image_url}
                            alt={p.productName}
                            className="w-16 h-16 object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div>
                          <span className="text-white font-semibold text-lg">
                            {p.productName}
                          </span>
                          <p className="text-gray-300 text-sm">From {shop.shopName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-yellow-300 font-bold text-lg">₹{p.price}</span>
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold" 
                          onClick={()=>removeProduct(shop.shopName, p.productName)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => alert(`Sending list for ${shop.shopName}`)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Send List to {shop.ownerName}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
