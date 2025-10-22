import { useEffect, useState } from "react";

function Cart({ user }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.name) return;

    async function fetchCart() {
      try {
        const res = await fetch(`http://localhost:3000/get-cart/${user.name}`);
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
      const res = await fetch(`http://localhost:3000/remove-from-cart`, {
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
    <div className="min-h-screen bg-[#a896f3] p-6">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        {user.name}'s Cart
      </h2>

      <div className="flex flex-col items-center space-y-6">
        {cart.shops.map((shop, i) => (
          <div
            key={i}
            className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-5 text-center"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-3">
              Shop: {shop.shopName}
            </h3>

            <ul className="space-y-3">
              {shop.products.map((p, j) => (
                <li
                  key={j}
                  className="flex items-center justify-between bg-purple-50 p-3 rounded-xl shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.image_url}
                      alt={p.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="text-gray-700 font-medium">
                      {p.productName}
                    </span>
                  </div>
                  <span className="text-gray-800 font-semibold">₹{p.price}</span>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition" 
                          onClick={()=>removeProduct(shop.shopName, p.productName)}>Remove</button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => alert(`Sending list for ${shop.shopName}`)}
              className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all"
            >
              Send List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
