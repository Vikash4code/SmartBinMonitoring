import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import { AuthContext } from "../../context/AuthContext";


const Login = () => {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // HANDLE LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response = await API.post(
        "/auth/login",
        formData
      );

      // SAVE USER + TOKEN
      login(
        response.data.user,
        response.data.token
      );

      // ROLE BASED REDIRECT
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/worker");
      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white mb-3">
            SmartBin
          </h1>

          <p className="text-slate-300">
            Smart Waste Management Platform
          </p>

        </div>


        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="text-white block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-slate-300 outline-none border border-white/20"
              required
            />

          </div>


          <div>

            <label className="text-white block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-slate-300 outline-none border border-white/20"
              required
            />

          </div>


          {error && (
            <p className="text-red-400 text-center">
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;