import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import InputField from "../../Components/InputField/InputField"; // adjust path if needed

const Register = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/register/", data);
      setSuccess("User registration successful.");
      setError("");
      reset();

      setTimeout(() => {
        navigate("");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        {success && (
          <div className="mt-4 text-sm text-center bg-green-100 text-green-700 p-2 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mt-4 text-sm text-center bg-red-100 text-red-700 p-2 rounded">
            {error}
          </div>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Username"
              name="username"
              icon
              placeholder="Choose a username"
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              icon
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              icon
              placeholder="Create a password"
            />
            <InputField
              label="Role"
              name="role"
              type="select"
              icon
              options={[
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
                { label: "Admin", value: "admin" },
              ]}
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
            >
              Register
            </button>
          </form>
        </FormProvider>

        

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a className="text-blue-600 hover:underline" href="/login">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
