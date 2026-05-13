import {
    useEffect,
    useState,
} from "react";

import API from "../../services/api";

import AdminSidebar from "../../components/AdminSidebar";


const History = () => {

    const [history, setHistory] =
        useState([]);


    // FETCH HISTORY
    const fetchHistory = async () => {

        try {

            const response =
                await API.get("/history");

            setHistory(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {
        fetchHistory();
    }, []);


    return (
        <div className="flex bg-slate-100 min-h-screen">

            <AdminSidebar />


            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Cleaning History
                </h1>


                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-4">
                                    Bin
                                </th>

                                <th className="text-left py-4">
                                    Worker
                                </th>

                                <th className="text-left py-4">
                                    Vehicle
                                </th>

                                <th className="text-left py-4">
                                    Cleaned At
                                </th>
                                <th className="text-left py-4">
                                    Proof
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {history.map((item) => (

                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="py-4">
                                        {item.binId}
                                    </td>

                                    <td className="py-4">
                                        {item.workerName}
                                    </td>

                                    <td className="py-4">
                                        {item.vehicleNumber}
                                    </td>

                                    <td className="py-4">

                                        {new Date(
                                            item.cleanedAt
                                        ).toLocaleString()}

                                    </td>
                                    <td className="py-4">

                                        {item.cleaningImage && (

                                            <img
                                                src={`http://localhost:5000${item.cleaningImage}`}
                                                alt="proof"
                                                className="w-24 h-24 object-cover rounded-xl"
                                            />

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default History;