import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [bins, setBins] = useState([]);
  const [binId, setBinId] = useState("");
  const [fillLevel, setFillLevel] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔄 Fetch all bins
  const fetchBins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bin/all");
      setBins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBins();
    const interval = setInterval(fetchBins, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 Status Logic
  const getStatus = (fill) => {
    if (fill <= 30) return { text: "Empty", color: "bg-green-500" };
    if (fill <= 70) return { text: "Medium", color: "bg-yellow-500" };
    return { text: "Full", color: "bg-red-500" };
  };

  // ➕ CREATE + ✏️ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Edit ID:", editId); // 👈 ADD THIS

    try {
      if (editId) {
        console.log("Updating bin..."); // 👈 ADD THIS

        await axios.put(`http://localhost:5000/api/bin/${editId}`, {
          binId: Number(binId),
          fillLevel: Number(fillLevel),
        });

      } else {
        console.log("Creating bin...");

        await axios.post("http://localhost:5000/api/bin", {
          binId: Number(binId),
          fillLevel: Number(fillLevel),
        });
      }

      setBinId("");
      setFillLevel("");
      setEditId(null);

      fetchBins();

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message); // 👈 IMPORTANT
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bin/${id}`);
      fetchBins();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Smart Waste Bin Dashboard
      </h1>

      {/* 🧾 FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-4 mb-6 max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-3 text-center">
          {editId ? "Update Bin" : "Add Bin"}
        </h2>

        <input
          type="number"
          placeholder="Bin ID"
          value={binId}
          onChange={(e) => setBinId(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="number"
          placeholder="Fill Level (%)"
          value={fillLevel}
          onChange={(e) => setFillLevel(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update Bin" : "Add Bin"}
        </button>
      </form>

      {/* 🧱 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {bins.map((bin) => {
          const status = getStatus(bin.fillLevel);

          return (
            <div
              key={bin._id}
              className="bg-white shadow-lg rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                Bin ID: {bin.binId}
              </h2>

              <p className="text-lg mb-2">
                Fill Level: {bin.fillLevel}%
              </p>

              {/* 📊 Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className={`${status.color} h-3 rounded-full`}
                  style={{ width: `${bin.fillLevel}%` }}
                ></div>
              </div>

              <span className={`text-white px-3 py-1 rounded ${status.color}`}>
                {status.text}
              </span>

              <p className="text-sm text-gray-500 mt-3">
                {new Date(bin.timestamp).toLocaleString()}
              </p>

              {/* ✏️ EDIT */}
              <button
                onClick={() => {
                  setBinId(bin.binId);
                  setFillLevel(bin.fillLevel);
                  setEditId(bin._id);
                }}
                className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
              >
                Edit
              </button>

              {/* ❌ DELETE */}
              <button
                onClick={() => handleDelete(bin._id)}
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App;