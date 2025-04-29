import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField/InputField"; // Adjust path as needed

const Login = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/login/", data);
      dispatch(setCredentials({ ...res.data }));

      setMessage("Login successful!");
      setMessageType("success");
      const role = res.data.user.role;

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "teacher") navigate("/teacher/dashboard");
      else navigate("/student/dashboard");

    } catch (err) {
      console.error(err);
      setMessage("Login failed. Please check your credentials.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Username"
              name="username"
              icon
              placeholder="Enter your username"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              icon
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </FormProvider>

        {message && (
          <div
            className={`mt-4 text-sm text-center p-2 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? <a className="text-blue-600 hover:underline" href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
