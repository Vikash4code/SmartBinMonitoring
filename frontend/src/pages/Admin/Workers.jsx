import { useEffect, useState } from "react";

import API from "../../services/api";

import AdminSidebar from "../../components/AdminSidebar";


const Workers = () => {

    const [workers, setWorkers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    // FETCH WORKERS
    const fetchWorkers = async () => {
        try {

            setLoading(true);

            const response = await API.get("/workers");

            setWorkers(response.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWorkers();
    }, []);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // ADD WORKER
    const addWorker = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/workers",
                formData
            );

            console.log(response.data);

            alert("Worker added successfully");

            setFormData({
                name: "",
                email: "",
                password: "",
            });

            fetchWorkers();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add worker"
            );
        }
    };


    // DELETE WORKER
    const deleteWorker = async (id) => {

        try {

            await API.delete(`/workers/${id}`);

            fetchWorkers();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="flex bg-slate-100 min-h-screen">

            {/* SIDEBAR */}
            <AdminSidebar />


            {/* MAIN CONTENT */}
            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Worker Management
                </h1>


                {/* ADD WORKER FORM */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Add Worker
                    </h2>

                    <form
                        onSubmit={addWorker}
                        className="grid md:grid-cols-3 gap-5"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Worker Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-4 rounded-xl outline-none"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Worker Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-4 rounded-xl outline-none"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-4 rounded-xl outline-none"
                            required
                        />

                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl transition md:col-span-3"
                        >
                            Add Worker
                        </button>

                    </form>

                </div>


                {/* WORKERS TABLE */}
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        All Workers
                    </h2>


                    {loading ? (
                        <p>Loading...</p>
                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-4">
                                            Name
                                        </th>

                                        <th className="text-left py-4">
                                            Email
                                        </th>

                                        <th className="text-left py-4">
                                            Role
                                        </th>

                                        <th className="text-left py-4">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {workers.map((worker) => (

                                        <tr
                                            key={worker._id}
                                            className="border-b hover:bg-slate-50"
                                        >

                                            <td className="py-4">
                                                {worker.name}
                                            </td>

                                            <td className="py-4">
                                                {worker.email}
                                            </td>

                                            <td className="py-4 capitalize">
                                                {worker.role}
                                            </td>

                                            <td className="py-4">

                                                <button
                                                    onClick={() =>
                                                        deleteWorker(worker._id)
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

                    )}

                </div>

            </div>

        </div>
    );
};

export default Workers;