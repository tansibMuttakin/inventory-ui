import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { api } from "../../api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/register", form);

      // Store token and redirect
      localStorage.setItem("authToken", res.data.access_token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access_token}`;
      navigate("/"); // Go to dashboard
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  // Redirect to dashboard if already logged in
  if (localStorage.getItem("authToken")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
