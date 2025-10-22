import { useState } from "react";
import StoreProducts from "./StoreProducts";

export default function OwnerDetails({ shop, setOwnerIcon }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedShop, setUpdatedShop] = useState(shop);
  const [loading, setLoading] = useState(false);

  if (!shop) return null; // safety check

  // Handle edit field changes
  const handleChange = (e) => {
    setUpdatedShop({ ...updatedShop, [e.target.name]: e.target.value });
  };

  // Fetch latest details for this owner before editing
  const fetchLatestShop = async () => {
    try {
      const res = await fetch("http://localhost:3000/find-owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const allOwners = await res.json();
      const freshShop = allOwners.find((o) => o._id === shop._id);
      if (freshShop) setUpdatedShop(freshShop);
    } catch (err) {
      console.error("Error fetching latest shop:", err);
    }
  };

  // Submit updated shop details
  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/edit-owner", {
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
      

      const data = await res.json();
      if (res.ok) {
        alert("Shop details updated successfully!");
        setIsEditing(false);
        setUpdatedShop(data.owner);
      } else {
        alert("Error: " + (data.error || data.message));
      }
    } catch (err) {
      console.error("Error updating owner:", err);
      alert("Failed to update shop details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-600">
          Welcome, {shop.ownerName}!
        </h2>

        <div className="flex gap-2">
          {/* ✏️ Edit Button */}
          <button
            onClick={() => {
              fetchLatestShop();
              setIsEditing((prev) => !prev);
            }}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {/* ❌ Close Button */}
          <button
            onClick={setOwnerIcon}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Shop Info */}
      <div className="max-w-4xl mx-auto mb-6 bg-white/90 backdrop-blur-md rounded-xl shadow p-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Shop Details
        </h3>

        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              name="shopName"
              value={updatedShop.shopName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Shop Name"
            />
            <input
              type="text"
              name="ownerName"
              value={updatedShop.ownerName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Owner Name"
            />
            <input
              type="password"
              name="password"
              value={updatedShop.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Password"
            />
            <input
              type="text"
              name="image_url"
              value={updatedShop.image_url || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Image URL"
            />
            <input
              type="text"
              name="email"
              value={updatedShop.email || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="email"
            />
            <input
              type="String"
              name="phone"
              value={updatedShop.phone || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Phone no."
            />

            <button
              onClick={handleEditSubmit}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white shadow ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <>
            <p className="text-blue-500">
              <strong>Shop Name:</strong> {updatedShop.shopName}
            </p>
            <p className="text-blue-500">
              <strong>Owner Name:</strong> {updatedShop.ownerName}
            </p>
            <p className="text-blue-500">
              <strong>Password:</strong> {updatedShop.password}
            </p>
            <p className="text-blue-500">
              <strong>Email:</strong>{" "}
              {updatedShop.email || "Not Provided"}
            </p>
            <p className="text-blue-500">
              <strong>Contact:</strong>{" "}
              {updatedShop.phone || "Not Provided"}
            </p>
          </>
        )}
      </div>

      {/* Products */}
      {!isEditing && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Products
          </h3>
          <StoreProducts shop={updatedShop} logedIn={true} loginType="owner" />
        </div>
      )}
    </div>
  );
}
