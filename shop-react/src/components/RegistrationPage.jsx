import { useState } from "react";

export default function RegistrationPage({ setRegistrationPage }) {
  const [role, setRole] = useState("owner");
  const [shopName, setShop] = useState("");
  const [ownerName, setOwner] = useState("");
  const [password, setPassword] = useState("");

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

    try {
      let url = "";
      let body = {};

      if (role === "owner") {
        url = "http://localhost:3000/register";
        body = { shopName, ownerName, email, phone, image_url, password };
      } else {
        url = "http://localhost:3000/register-user";
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
      setErrors({});
      setRegistrationPage();
    } catch (err) {
      console.error("Error registering:", err);
      setErrors({ server: "Network or server error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Registration
          </h2>

          {/* Role Selection */}
          <div className="flex justify-center space-x-6 mb-6">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                value="owner"
                checked={role === "owner"}
                onChange={(e) => setRole(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Owner</span>
            </label>

            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>User</span>
            </label>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            {role === "owner" ? (
              <>
                <div>
                  <input
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => setShop(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName}</p>}
                </div>

                <div>
                  <input
                    placeholder="Owner Name"
                    value={ownerName}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
                </div>

                <div>
                  <input
                    placeholder="Image URL"
                    value={image_url}
                    onChange={(e) => setimage_url(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url}</p>}
                </div>

                <div>
                  <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <input
                    placeholder="Phone no."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              </>
            )}

            {errors.server && <p className="text-red-500 text-sm text-center">{errors.server}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition font-medium"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
