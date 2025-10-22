import { useState } from "react";

export default function UserDetails({ user, setUserIcon, setUser }) {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password
  });

  // 💾 Save updated user
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/edit-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, ...editedData }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("User details updated successfully!");
        setUser(data.user); // Update parent state
        setEditing(false);
        
      } else {
        alert(data.error || "Failed to update user details");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]  from-gray-100 via-white  px-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6 border border-gray-200 transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          User Details
        </h2>

        <div className="space-y-3 text-gray-700">
          {["name", "email", "phone", "password"].map((field) => (
            <div
              key={field}
              className="flex items-center justify-between border rounded-lg px-4 py-2 hover:bg-indigo-50 transition"
            >
              <span className="font-medium text-gray-500">{field[0].toUpperCase() + field.slice(1)}:</span>
              {editing ? (
                <input
                  type={field === "phone" ? "tel" : "text"}
                  value={editedData[field]}
                  onChange={(e) =>
                    setEditedData({ ...editedData, [field]: e.target.value })
                  }
                  className="font-semibold text-gray-200 w-full text-right border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <span className="font-semibold text-gray-800">{user[field]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-5 py-2.5 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => {
              window.history.back();
              setUserIcon();
            }}
            className="px-5 py-2.5 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
