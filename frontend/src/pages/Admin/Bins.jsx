import {
    useEffect,
    useState,
} from "react";

import API from "../../services/api";

import AdminSidebar from "../../components/AdminSidebar";


const Bins = () => {

    const [bins, setBins] = useState([]);

    const [workers, setWorkers] = useState([]);

    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        binId: "",
        fillLevel: "",
    });


    // FETCH BINS
    const fetchBins = async () => {

        try {

            setLoading(true);

            const response = await API.get(
                "/bin/all"
            );

            setBins(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };


    // FETCH WORKERS
    const fetchWorkers = async () => {

        try {

            const response =
                await API.get("/workers");

            setWorkers(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    // FETCH VEHICLES
    const fetchVehicles = async () => {

        try {

            const response =
                await API.get("/vehicles");

            setVehicles(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        fetchBins();

        fetchWorkers();

        fetchVehicles();

    }, []);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // ADD BIN
    const addBin = async (e) => {

        e.preventDefault();

        try {

            await API.post("/bin", {
                ...formData,
                fillLevel: Number(
                    formData.fillLevel
                ),
            });

            setFormData({
                binId: "",
                fillLevel: "",
            });

            fetchBins();

        } catch (error) {

            console.log(error);
        }
    };


    // DELETE BIN
    const deleteBin = async (id) => {

        try {

            await API.delete(`/bin/${id}`);

            fetchBins();

        } catch (error) {

            console.log(error);
        }
    };


    // ASSIGN BIN
    const assignBin = async (
        binId,
        workerId,
        vehicleId
    ) => {

        try {

            await API.put(`/bin/${binId}`, {
                assignedWorker: workerId,
                assignedVehicle: vehicleId,
            });

            fetchBins();

            alert("Assignment updated");

        } catch (error) {

            console.log(error);
        }
    };


    // STATUS
    const getStatus = (fillLevel) => {

        if (fillLevel <= 30) {
            return {
                text: "Empty",
                color: "bg-green-500",
            };
        }

        if (fillLevel <= 70) {
            return {
                text: "Medium",
                color: "bg-yellow-500",
            };
        }

        return {
            text: "Full",
            color: "bg-red-500",
        };
    };


    return (
        <div className="flex bg-slate-100 min-h-screen">

            <AdminSidebar />


            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Bin Management
                </h1>


                {/* ADD BIN */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Add Bin
                    </h2>

                    <form
                        onSubmit={addBin}
                        className="grid md:grid-cols-2 gap-5"
                    >

                        <input
                            type="text"
                            name="binId"
                            placeholder="Bin ID"
                            value={formData.binId}
                            onChange={handleChange}
                            className="border p-4 rounded-xl"
                            required
                        />

                        <input
                            type="number"
                            name="fillLevel"
                            placeholder="Fill Level"
                            value={formData.fillLevel}
                            onChange={handleChange}
                            className="border p-4 rounded-xl"
                            required
                        />

                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl md:col-span-2"
                        >
                            Add Bin
                        </button>

                    </form>

                </div>


                {/* TABLE */}
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        All Bins
                    </h2>


                    {loading ? (

                        <p>Loading...</p>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="py-4 text-left">
                                            Bin
                                        </th>

                                        <th className="py-4 text-left">
                                            Fill
                                        </th>

                                        <th className="py-4 text-left">
                                            Status
                                        </th>

                                        <th className="py-4 text-left">
                                            Worker
                                        </th>

                                        <th className="py-4 text-left">
                                            Vehicle
                                        </th>

                                        <th className="py-4 text-left">
                                            Cleaned
                                        </th>

                                        <th className="py-4 text-left">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {bins.map((bin) => {

                                        const status =
                                            getStatus(bin.fillLevel);

                                        return (
                                            <tr
                                                key={bin._id}
                                                className="border-b"
                                            >

                                                <td className="py-4">
                                                    {bin.binId}
                                                </td>


                                                <td className="py-4">
                                                    {bin.fillLevel}%
                                                </td>


                                                <td className="py-4">

                                                    <span
                                                        className={`${status.color} text-white px-4 py-2 rounded-full text-sm`}
                                                    >
                                                        {status.text}
                                                    </span>

                                                </td>


                                                {/* WORKER */}
                                                <td className="py-4">

                                                    <select
                                                        defaultValue={
                                                            bin.assignedWorker || ""
                                                        }
                                                        onChange={(e) =>
                                                            assignBin(
                                                                bin._id,
                                                                e.target.value,
                                                                bin.assignedVehicle
                                                            )
                                                        }
                                                        className="border p-2 rounded-lg"
                                                    >

                                                        <option value="">
                                                            Select Worker
                                                        </option>

                                                        {workers.map((worker) => (

                                                            <option
                                                                key={worker._id}
                                                                value={worker._id}
                                                            >
                                                                {worker.name}
                                                            </option>

                                                        ))}

                                                    </select>

                                                </td>


                                                {/* VEHICLE */}
                                                <td className="py-4">

                                                    <select
                                                        defaultValue={
                                                            bin.assignedVehicle || ""
                                                        }
                                                        onChange={(e) =>
                                                            assignBin(
                                                                bin._id,
                                                                bin.assignedWorker,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border p-2 rounded-lg"
                                                    >

                                                        <option value="">
                                                            Select Vehicle
                                                        </option>

                                                        {vehicles.map((vehicle) => (

                                                            <option
                                                                key={vehicle._id}
                                                                value={vehicle._id}
                                                            >
                                                                {vehicle.vehicleNumber}
                                                            </option>

                                                        ))}

                                                    </select>

                                                </td>


                                                {/* CLEANED */}
                                                <td className="py-4">

                                                    {bin.cleaned ? (
                                                        <span className="text-green-600 font-bold">
                                                            Cleaned
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold">
                                                            Pending
                                                        </span>
                                                    )}

                                                </td>


                                                {/* ACTION */}
                                                <td className="py-4">

                                                    <button
                                                        onClick={() =>
                                                            deleteBin(bin._id)
                                                        }
                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>
                                        );
                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default Bins;