import { useEffect, useState } from "react";

import API from "../../services/api";

import AdminSidebar from "../../components/AdminSidebar";


const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        driverName: "",
        status: "active",
    });


    // FETCH VEHICLES
    const fetchVehicles = async () => {
        try {

            const response = await API.get("/vehicles");

            setVehicles(response.data);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchVehicles();
    }, []);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // ADD VEHICLE
    const addVehicle = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/vehicles",
                formData
            );

            console.log(response.data);

            alert("Vehicle added successfully");

            setFormData({
                vehicleNumber: "",
                driverName: "",
                status: "active",
            });

            fetchVehicles();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add vehicle"
            );
        }
    };


    // DELETE VEHICLE
    const deleteVehicle = async (id) => {

        try {

            await API.delete(`/vehicles/${id}`);

            fetchVehicles();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="flex bg-slate-100 min-h-screen">

            {/* SIDEBAR */}
            <AdminSidebar />


            {/* MAIN */}
            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Vehicle Management
                </h1>


                {/* FORM */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Add Vehicle
                    </h2>

                    <form
                        onSubmit={addVehicle}
                        className="grid md:grid-cols-3 gap-5"
                    >

                        <input
                            type="text"
                            name="vehicleNumber"
                            placeholder="Vehicle Number"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            className="border p-4 rounded-xl outline-none"
                            required
                        />

                        <input
                            type="text"
                            name="driverName"
                            placeholder="Driver Name"
                            value={formData.driverName}
                            onChange={handleChange}
                            className="border p-4 rounded-xl outline-none"
                            required
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border p-4 rounded-xl outline-none"
                        >

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl transition md:col-span-3"
                        >
                            Add Vehicle
                        </button>

                    </form>

                </div>


                {/* TABLE */}
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        All Vehicles
                    </h2>


                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-4">
                                        Vehicle Number
                                    </th>

                                    <th className="text-left py-4">
                                        Driver
                                    </th>

                                    <th className="text-left py-4">
                                        Status
                                    </th>

                                    <th className="text-left py-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {vehicles.map((vehicle) => (

                                    <tr
                                        key={vehicle._id}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="py-4">
                                            {vehicle.vehicleNumber}
                                        </td>

                                        <td className="py-4">
                                            {vehicle.driverName}
                                        </td>

                                        <td className="py-4 capitalize">
                                            {vehicle.status}
                                        </td>

                                        <td className="py-4">

                                            <button
                                                onClick={() =>
                                                    deleteVehicle(vehicle._id)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Vehicles;