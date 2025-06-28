import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/logout/");
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
