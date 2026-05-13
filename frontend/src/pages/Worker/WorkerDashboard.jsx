import {
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import { AuthContext }
  from "../../context/AuthContext";


const WorkerDashboard = () => {

  const { user, logout } =
    useContext(AuthContext);

  const [bins, setBins] =
    useState([]);

  const [selectedImages,
    setSelectedImages] =
    useState({});

  const [issueMessage,
    setIssueMessage] =
    useState("");

  const [selectedBin,
    setSelectedBin] =
    useState("");


  // FETCH ASSIGNED BINS
  const fetchBins = async () => {

    try {

      const response =
        await API.get(
          "/worker-dashboard/assigned-bins"
        );

      setBins(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {
    fetchBins();
  }, []);


  // HANDLE IMAGE
  const handleImageChange =
    (binId, file) => {

      setSelectedImages(
        (prev) => ({
          ...prev,
          [binId]: file,
        })
      );
    };


  // MARK CLEANED
  const markCleaned =
    async (binId) => {

      try {

        const image =
          selectedImages[binId];

        if (!image) {

          alert(
            "Please capture/upload image first"
          );

          return;
        }

        const formData =
          new FormData();

        formData.append(
          "cleaningImage",
          image
        );


        await API.put(
          `/worker-dashboard/clean/${binId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Cleaning proof uploaded successfully"
        );

        fetchBins();

      } catch (error) {

        console.log(error);
      }
    };


  // REPORT ISSUE
  const reportIssue =
    async () => {

      try {

        if (
          !selectedBin ||
          !issueMessage
        ) {

          alert(
            "Please fill all fields"
          );

          return;
        }

        await API.post(
          "/issues",
          {

            workerName:
              user?.name,

            binId:
              selectedBin,

            message:
              issueMessage,
          }
        );

        alert(
          "Issue reported to admin"
        );

        setIssueMessage("");

        setSelectedBin("");

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <div className="min-h-screen bg-slate-100">

      {/* TOPBAR */}
      <div className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-green-400">
            Worker Dashboard
          </h1>

          <p className="mt-2 text-slate-300">
            Hello,
            {" "}
            {user?.name}
          </p>

        </div>


        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>


      {/* MAIN CONTENT */}
      <div className="p-8">

        {/* ASSIGNED BINS */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8">
            Assigned Bins
          </h2>


          <div className="space-y-6">

            {bins.map((bin) => (

              <div
                key={bin._id}
                className="border rounded-2xl p-6 shadow-sm"
              >

                {/* BIN INFO */}
                <div className="mb-5">

                  <h3 className="text-2xl font-bold mb-3">
                    Bin ID:
                    {" "}
                    {bin.binId}
                  </h3>

                  <p className="mb-2">
                    Fill Level:
                    {" "}
                    <span className="font-semibold">
                      {bin.fillLevel}%
                    </span>
                  </p>

                  <p className="mb-2">
                    Vehicle:
                    {" "}
                    <span className="font-semibold">
                      {bin.assignedVehicle
                        ?.vehicleNumber ||
                        "Not Assigned"}
                    </span>
                  </p>

                  <p className="mb-2">
                    Status:
                    {" "}
                    {bin.cleaned ? (
                      <span className="text-green-600 font-bold">
                        Cleaned
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold">
                        Pending
                      </span>
                    )}
                  </p>

                </div>


                {/* CLEANING SECTION */}
                {!bin.cleaned && (

                  <div className="mt-6">

                    {/* CAMERA INPUT */}
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) =>
                        handleImageChange(
                          bin._id,
                          e.target.files[0]
                        )
                      }
                      className="mb-4 block"
                    />


                    {/* IMAGE PREVIEW */}
                    {selectedImages[bin._id] && (

                      <img
                        src={URL.createObjectURL(
                          selectedImages[bin._id]
                        )}
                        alt="preview"
                        className="w-48 h-48 object-cover rounded-xl mb-5 border"
                      />

                    )}


                    {/* BUTTON */}
                    <button
                      onClick={() =>
                        markCleaned(bin._id)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition"
                    >
                      Upload Proof & Mark Cleaned
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>


        {/* ISSUE REPORT SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Report Problem to Admin
          </h2>


          <select
            value={selectedBin}
            onChange={(e) =>
              setSelectedBin(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-xl mb-5"
          >

            <option value="">
              Select Bin
            </option>

            {bins.map((bin) => (

              <option
                key={bin._id}
                value={bin.binId}
              >
                {bin.binId}
              </option>

            ))}

          </select>


          <textarea
            placeholder="Describe the issue..."
            value={issueMessage}
            onChange={(e) =>
              setIssueMessage(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-xl mb-5 h-32"
          />


          <button
            onClick={reportIssue}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
          >
            Report Issue
          </button>

        </div>

      </div>

    </div>
  );
};

export default WorkerDashboard;