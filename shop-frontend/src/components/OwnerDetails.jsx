import { useState } from "react";
import StoreProducts from "./StoreProducts";
import { apiFetch } from "../utils/api";

export default function OwnerDetails({ shop, setOwnerIcon }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedShop, setUpdatedShop] = useState(shop);
  const [loading, setLoading] = useState(false);

  if (!shop) return null;

  // input handler
  const handleChange = (e) => {
    setUpdatedShop({ ...updatedShop, [e.target.name]: e.target.value });
  };

  // fetch fresh shop details (GET /find-owner)
  const fetchLatestShop = async () => {
    try {
      const allOwners = await apiFetch(`/api/find-owner`, { method: "GET" });

      const freshShop = allOwners.find((o) => o._id === shop._id);
      if (freshShop) setUpdatedShop(freshShop);
    } catch (err) {
      console.error("Error fetching latest owner:", err);
    }
  };

  // Save edited owner/shop details (PUT /edit-owner)
  const handleEditSubmit = async () => {
    try {
      setLoading(true);

      const data = await apiFetch(`/api/edit-owner`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId: shop._id,
          shopName: updatedShop.shopName,
          ownerName: updatedShop.ownerName,
          email: updatedShop.email,
          phone: updatedShop.phone,
          image_url: updatedShop.image_url,
          password: updatedShop.password,
        }),
      });

      alert("Shop updated successfully!");
      setIsEditing(false);
      setUpdatedShop(data.owner);
    } catch (err) {
      console.error("Error updating owner:", err);
      alert("Failed to update owner details.");
    } finally {
      setLoading(false);
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

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">{shop.ownerName}</span>!
            </h2>
            <p className="text-gray-200 text-lg">Manage your shop and products</p>
          </div>

          <div className="flex gap-3">
            {/* ✏️ Edit Button */}
            <button
              onClick={() => {
                fetchLatestShop();
                setIsEditing((prev) => !prev);
              }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              {isEditing ? "Cancel" : "Edit Shop"}
            </button>

            {/* ❌ Close Button */}
            <button
              onClick={setOwnerIcon}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Close
            </button>
          </div>
        </div>

        {/* Shop Info */}
        <div className="max-w-6xl mx-auto mb-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 animate-fade-in">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Shop Details
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-yellow-300 text-sm font-medium mb-2">Shop Name</label>
                  <input
                    type="text"
                    name="shopName"
                    value={updatedShop.shopName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                    placeholder="Enter shop name"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 text-sm font-medium mb-2">Owner Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={updatedShop.ownerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                    placeholder="Enter owner name"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedShop.email || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={updatedShop.phone || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={updatedShop.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image_url"
                    value={updatedShop.image_url || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleEditSubmit}
                  disabled={loading}
                  className={`px-8 py-3 rounded-xl text-white shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  }`}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-4">
                <h4 className="text-yellow-300 font-semibold mb-2">Shop Information</h4>
                <div className="space-y-2">
                  <p className="text-white">
                    <span className="text-yellow-300 font-medium">Shop Name:</span> {updatedShop.shopName}
                  </p>
                  <p className="text-white">
                    <span className="text-yellow-300 font-medium">Owner:</span> {updatedShop.ownerName}
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-4">
                <h4 className="text-yellow-300 font-semibold mb-2">Contact Details</h4>
                <div className="space-y-2">
                  <p className="text-white">
                    <span className="text-yellow-300 font-medium">Email:</span> {updatedShop.email || "Not Provided"}
                  </p>
                  <p className="text-white">
                    <span className="text-yellow-300 font-medium">Phone:</span> {updatedShop.phone || "Not Provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products */}
        {!isEditing && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2 animate-fade-in-delay">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Products</span>
              </h3>
              <p className="text-gray-200 text-lg">Manage your inventory</p>
            </div>
            <StoreProducts shop={updatedShop} logedIn={true} loginType="owner" />
          </div>
        )}
      </div>
    </div>
  );
}
