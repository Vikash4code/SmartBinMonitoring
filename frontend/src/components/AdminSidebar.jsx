import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

            <h1 className="text-3xl font-bold text-green-400 mb-10">
                SmartBin
            </h1>

            <div className="space-y-4">

                <Link
                    to="/admin"
                    className="block bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/workers"
                    className="block bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
                >
                    Workers
                </Link>

                <Link
                    to="/admin/vehicles"
                    className="block bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
                >
                    Vehicles
                </Link>

                <Link
                    to="/admin/bins"
                    className="block bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
                >
                    Bins
                </Link>

                <Link
                    to="/admin/history"
                    className="block bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
                >
                    History
                </Link>

            </div>

        </div>
    );
};

export default AdminSidebar;