import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/* Main content */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
