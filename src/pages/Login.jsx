import { useState } from "react";
import { api } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("authToken", res.data.access_token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access_token}`;
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h1>
      {error && (
        <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow-sm"
        >
          Login
        </button>
      </form>
      <Link
        to="/register"
        className="block mt-4 w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow-sm text-center"
      >
        Register
      </Link>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Demo Email:{" "}
          <span className="font-medium text-gray-800">test@example.com</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Demo Password:{" "}
          <span className="font-medium text-gray-800">password</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
