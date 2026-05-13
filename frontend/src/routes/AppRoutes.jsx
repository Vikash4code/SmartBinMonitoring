import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";

import AdminDashboard from "../pages/Admin/AdminDashboard";

import WorkerDashboard from "../pages/Worker/WorkerDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

import Workers from "../pages/Admin/Workers";

import Vehicles from "../pages/Admin/Vehicles";

import Bins from "../pages/Admin/Bins";

import History from "../pages/Admin/History";

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />


                {/* ADMIN ROUTE */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/workers"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Workers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/vehicles"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Vehicles />
                        </ProtectedRoute>
                    }
                />


                {/* WORKER ROUTE */}
                <Route
                    path="/worker"
                    element={
                        <ProtectedRoute allowedRole="worker">
                            <WorkerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/bins"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Bins />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/history"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <History />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;