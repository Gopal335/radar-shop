import { useState } from "react";
import { uploadImageFile } from "../utils/upload";

export default function RegistrationPage({ setRegistrationPage }) {
  const [role, setRole] = useState("owner");
  const [shopName, setShop] = useState("");
  const [ownerName, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image_url, setimage_url] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (role === "owner") {
      if (!shopName.trim()) newErrors.shopName = "Shop name is required";
      if (shopName.length < 2) newErrors.shopName = "Shop name must be at least 2 characters long";
      if (!ownerName.trim()) newErrors.ownerName = "Owner name is required";
      if (ownerName.length < 2) newErrors.ownerName = "Owner name must be at least 2 characters long";
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters long";
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password))
        newErrors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      // if (image_url && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(image_url))
      //   newErrors.image_url = "Please enter a valid image URL";
    } else {
      if (!name.trim()) newErrors.name = "Name is required";
      if (name.length < 2) newErrors.name = "Name must be at least 2 characters long";
      if (!email) newErrors.email = "Email is required";
      else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        newErrors.email = "Please enter a valid email address";
      if (!phone) newErrors.phone = "Phone number is required";
      else if (!/^\+?\d{10,15}$/.test(phone))
        newErrors.phone = "Please enter a valid phone number (10–15 digits)";
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters long";
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password))
        newErrors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateFields()) return; // Stop submission if validation fails
   try{
   let image_url_to_send = image_url;
    if (imageFile) {
      try {
        image_url_to_send = await uploadImageFile(imageFile);
      } catch (upErr) {
        console.error("Image upload failed:", upErr);
        setErrors({ server: "Image upload failed. Please try again." });
        return;
      }
    }

    let url = "";
    let body = {};
    if (role === "owner") {
      url = "/api/register";
      body = { shopName, ownerName, email, phone, image_url: image_url_to_send, password };
    } else {
      url = "/api/register-user";
      body = { name, email, phone, password };
    }

      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("response:", data);

      if (!res.ok) {
        setErrors({ server: data.message || "Registration failed" });
        return;
      }

      // reset form
      setShop("");
      setOwner("");
      setPassword("");
      setName("");
      setEmail("");
      setPhone("");
      setimage_url("");
      setimage_url("");
      setImageFile(null);
      setErrors({});
      setRegistrationPage();
    } 
    catch (err) {
      console.error("Error registering:", err);
      setErrors({ server: "Network or server error" });
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
