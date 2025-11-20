import { useState } from "react";
import { uploadImageFile } from "../utils/upload";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export default function RegistrationPage({ setRegistrationPage }) {
  const [role, setRole] = useState("owner");
  const [shopName, setShop] = useState("");
  const [ownerName, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const newErrors = {};

    if (role === "owner") {
      if (!shopName.trim()) newErrors.shopName = "Shop name is required";
      if (shopName.length < 2) newErrors.shopName = "Shop name must be at least 2 characters long";

      if (!ownerName.trim()) newErrors.ownerName = "Owner name is required";
      if (ownerName.length < 2) newErrors.ownerName = "Owner name must be at least 2 characters long";

      if (!email) newErrors.email = "Email is required";
      if (!phone) newErrors.phone = "Phone number is required";

      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters long";
    } else {
      if (!name.trim()) newErrors.name = "Name is required";
      if (name.length < 2) newErrors.name = "Name must be at least 2 characters long";

      if (!email) newErrors.email = "Email is required";
      if (!phone) newErrors.phone = "Phone number is required";

      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateFields()) return;

    setLoading(true);
    try {
      // Upload image first (if provided). uploadImageFile returns a string URL.
      let uploadedImageUrl = "";
      if (imageFile) {
        uploadedImageUrl = await uploadImageFile(imageFile);
      }

      // Build endpoint & body according to your backend routes (unchanged)
      const endpoint = role === "owner" ? "/api/register" : "/api/register-user";
      const body =
        role === "owner"
          ? { shopName, ownerName, email, phone, image_url: uploadedImageUrl, password }
          : { name, email, phone, password };

      const res = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      // try to parse json (backend returns JSON even on errors)
      const text = await res.text().catch(() => null);
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // non-json response
        throw new Error(`Unexpected response from server: ${text}`);
      }

      if (!res.ok) {
        // show backend message if present
        const msg = data.message || data.error || `Registration failed (status ${res.status})`;
        setErrors({ server: msg });
        setLoading(false);
        return;
      }

      // success -> reset and close registration UI
      setShop("");
      setOwner("");
      setPassword("");
      setName("");
      setEmail("");
      setPhone("");
      setImageFile(null);
      setErrors({});
      setLoading(false);
      setRegistrationPage();
    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ server: err.message || "Network or server error" });
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

      <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Join Radar Shop
            </h2>
            <p className="text-gray-200">Create your account today</p>
          </div>

          {/* Role Selection */}
          <div className="flex justify-center space-x-6 mb-8">
            <label className="flex items-center space-x-2 text-white cursor-pointer group">
              <input
                type="radio"
                value="owner"
                checked={role === "owner"}
                onChange={(e) => setRole(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="group-hover:text-yellow-300 transition-colors duration-300">Owner</span>
            </label>

            <label className="flex items-center space-x-2 text-white cursor-pointer group">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="group-hover:text-yellow-300 transition-colors duration-300">User</span>
            </label>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {role === "owner" ? (
              <>
                <div>
                  <input
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => setShop(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.shopName && <p className="text-red-400 text-sm mt-1">{errors.shopName}</p>}
                </div>

                <div>
                  <input
                    placeholder="Owner Name"
                    value={ownerName}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.ownerName && <p className="text-red-400 text-sm mt-1">{errors.ownerName}</p>}
                </div>

                <div>
                  {/* <input
                    placeholder="Image URL"
                    value={image_url}
                    onChange={(e) => setimage_url(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />

                  {errors.image_url && <p className="text-red-400 text-sm mt-1">{errors.image_url}</p>} */}
                  <label className="block text-sm text-white mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-sm file:bg-white/20 file:backdrop-blur-md file:border file:border-white/30 file:rounded-xl file:px-3 file:py-2 text-white placeholder-gray-300"
                  />
                  {imageFile && <p className="text-gray-300 text-sm mt-1">{imageFile.name}</p>}
                  {errors.image_url && <p className="text-red-400 text-sm mt-1">{errors.image_url}</p>}
                </div>

                <div>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-white placeholder-gray-300 transition-all duration-300"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>
              </>
            )}

            {errors.server && <p className="text-red-400 text-sm text-center">{errors.server}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
