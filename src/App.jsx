import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Register from "./pages/Register";
import ProductEntry from "./pages/ProductEntry";
import AppLayout from "./layout/AppLayout";
import ProductEdit from "./pages/ProductEdit";
import SaleEntry from "./pages/SaleEntry";
import Sales from "./pages/Sales";
import Journal from "./pages/Journal";
import FinancialReport from "./pages/FinancialReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <PrivateRoute>
                  <ProductEntry />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id/edit"
              element={
                <PrivateRoute>
                  <ProductEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <PrivateRoute>
                  <Sales />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales/add"
              element={
                <PrivateRoute>
                  <SaleEntry />
                </PrivateRoute>
              }
            />
            <Route
              path="/journals"
              element={
                <PrivateRoute>
                  <Journal />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial-report"
              element={
                <PrivateRoute>
                  <FinancialReport />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
