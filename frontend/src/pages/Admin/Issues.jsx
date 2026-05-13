import {
    useEffect,
    useState,
} from "react";

import API from "../../services/api";

import AdminSidebar from "../../components/AdminSidebar";


const Issues = () => {

    const [issues,
        setIssues] =
        useState([]);


    const fetchIssues =
        async () => {

            try {

                const response =
                    await API.get(
                        "/issues"
                    );

                setIssues(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };


    useEffect(() => {
        fetchIssues();
    }, []);


    return (
        <div className="flex bg-slate-100 min-h-screen">

            <AdminSidebar />


            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-10">
                    Worker Issue Reports
                </h1>


                <div className="space-y-5">

                    {issues.map((issue) => (

                        <div
                            key={issue._id}
                            className="bg-white p-6 rounded-2xl shadow-lg"
                        >

                            <h2 className="text-2xl font-bold mb-3">

                                Bin:
                                {" "}
                                {issue.binId}

                            </h2>

                            <p className="mb-2">

                                Worker:
                                {" "}
                                <span className="font-semibold">
                                    {issue.workerName}
                                </span>

                            </p>

                            <p className="mb-4">
                                {issue.message}
                            </p>

                            <p className="text-slate-500">

                                {new Date(
                                    issue.createdAt
                                ).toLocaleString()}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Issues;