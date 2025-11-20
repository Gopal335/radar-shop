import { useState } from "react";
import { apiFetch } from "../utils/api";

export default function UserDetails({ user, setUserIcon, setUser }) {
  const [editing, setEditing] = useState(false);

  const [editedData, setEditedData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    password: ""   // 🔥 never put existing password here — backend hashes only new password
  });

  // SAVE UPDATED USER DETAILS
  const handleSave = async () => {
    try {
      const payload = {
        userId: user._id,
        name: editedData.name,
        email: editedData.email,
        phone: editedData.phone,
      };

      // Only include password if user entered something new
      if (editedData.password.trim() !== "") {
        payload.password = editedData.password;
      }

      const data = await apiFetch("/api/edit-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      alert("User details updated successfully!");
      setUser(data.user);          // update parent state
      setEditing(false);

    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user details");
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

      <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              User Profile
            </h2>
            <p className="text-gray-200">Manage your account details</p>
          </div>

          <div className="space-y-4">
            {["name", "email", "phone", "password"].map((field) => (
              <div
                key={field}
                className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-yellow-300 text-sm uppercase tracking-wide">{field}:</span>
                  {editing ? (
                    <input
                      type={field === "phone" ? "tel" : field === "password" ? "password" : "text"}
                      value={editedData[field]}
                      onChange={(e) =>
                        setEditedData({ ...editedData, [field]: e.target.value })
                      }
                      className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 w-48"
                      placeholder={`Enter ${field}`}
                    />
                  ) : (
                    <span className="font-semibold text-white text-right">{user[field]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={() => {
                window.history.back();
                setUserIcon();
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
