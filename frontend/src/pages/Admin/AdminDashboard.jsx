import {
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import { AuthContext }
  from "../../context/AuthContext";

import AdminSidebar from "../../components/AdminSidebar";


const AdminDashboard = () => {

  const { user, logout } =
    useContext(AuthContext);

  const [stats, setStats] =
    useState({
      totalBins: 0,
      fullBins: 0,
      cleanedBins: 0,
      totalWorkers: 0,
      totalVehicles: 0,
      recentHistory: [],
    });

  const [showAlert,
    setShowAlert] =
    useState(true);


  // FETCH DASHBOARD STATS
  const fetchStats = async () => {

    try {

      const response =
        await API.get(
          "/dashboard/stats"
        );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchStats();

    const interval =
      setInterval(() => {

        fetchStats();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);


  return (
    <div className="flex bg-slate-100 min-h-screen">

      {/* SIDEBAR */}
      <AdminSidebar />


      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-10 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-slate-600 mt-2">
              Welcome back,
              {" "}
              {user?.name}
            </p>

          </div>


          {/* LOGOUT BUTTON */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
          >
            Logout
          </button>

        </div>

        {/* ALERT POPUP */}
        {showAlert &&
          stats.alertBins &&
          stats.alertBins.length > 0 && (

            <div className="bg-red-500 text-white p-6 rounded-2xl shadow-2xl mb-8 animate-pulse">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold mb-3">
                    ⚠ Full Bin Alert
                  </h2>

                  {stats.alertBins.map(
                    (bin) => (

                      <p
                        key={bin._id}
                        className="mb-2 text-lg"
                      >

                        Bin
                        {" "}
                        <span className="font-bold">
                          {bin.binId}
                        </span>

                        {" "}
                        is
                        {" "}

                        <span className="font-bold">
                          {bin.fillLevel}%
                        </span>

                        {" "}
                        full.

                      </p>

                    )
                  )}

                </div>


                {/* CLOSE BUTTON */}
                <button
                  onClick={() =>
                    setShowAlert(false)
                  }
                  className="bg-white text-red-500 px-4 py-2 rounded-xl font-bold"
                >
                  Close
                </button>

              </div>

            </div>

          )}
        {/* STATS CARDS */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">

          {/* TOTAL BINS */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-slate-500 mb-2">
              Total Bins
            </h2>

            <p className="text-4xl font-bold text-blue-600">
              {stats.totalBins}
            </p>

          </div>


          {/* FULL BINS */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-slate-500 mb-2">
              Full Bins
            </h2>

            <p className="text-4xl font-bold text-red-500">
              {stats.fullBins}
            </p>

          </div>


          {/* CLEANED BINS */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-slate-500 mb-2">
              Cleaned Bins
            </h2>

            <p className="text-4xl font-bold text-green-500">
              {stats.cleanedBins}
            </p>

          </div>


          {/* TOTAL WORKERS */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-slate-500 mb-2">
              Workers
            </h2>

            <p className="text-4xl font-bold text-purple-500">
              {stats.totalWorkers}
            </p>

          </div>


          {/* TOTAL VEHICLES */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-slate-500 mb-2">
              Vehicles
            </h2>

            <p className="text-4xl font-bold text-orange-500">
              {stats.totalVehicles}
            </p>

          </div>

        </div>


        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Cleaning Activity
          </h2>


          {stats.recentHistory.length === 0 ? (

            <p>
              No cleaning activity yet.
            </p>

          ) : (

            <div className="space-y-5">

              {stats.recentHistory.map(
                (item) => (

                  <div
                    key={item._id}
                    className="border rounded-xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-bold text-lg">
                        {item.binId}
                      </h3>

                      <p>
                        Worker:
                        {" "}
                        {item.workerName}
                      </p>

                      <p>
                        Vehicle:
                        {" "}
                        {item.vehicleNumber}
                      </p>

                    </div>


                    <div className="text-slate-500">

                      {new Date(
                        item.cleanedAt
                      ).toLocaleString()}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;