import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log(api.defaults.headers);

      await api.post("/logout/");
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
        <Link to={"/"}>
          <div className="text-xl font-semibold">Dashboard</div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/products" className="hover:text-gray-300 transition">
            Products
          </Link>
          <Link to="/sales" className="hover:text-gray-300 transition">
            Sales
          </Link>
          <Link to="/journals" className="hover:text-gray-300 transition">
            Journals
          </Link>
          <Link
            to="/financial-report"
            className="hover:text-gray-300 transition"
          >
            Financial Report
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
