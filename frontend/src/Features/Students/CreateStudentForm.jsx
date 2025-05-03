import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { createStudent, resetStudent } from "../../redux/slices/studentSlice";
import InputField from "../../Components/InputField/InputField";
import FileUploader from "../../utils/FileUploader";



const CreateStudentForm = () => {
  const methods = useForm();
  const { register, handleSubmit, control, reset, formState: { errors } } = methods;
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  // Show toast & reset on success or error
  const { loading, success, error, message } = useSelector(s => s.student);
  const student = useSelector(state => state.student);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: message,             
        confirmButtonText: "OK"
      }).then(() => {
        reset();
        setFiles(null);
        dispatch(resetStudent());
         navigate("/")
      });
    } else if (error) {
      if (student?.errors) {
        const errorMessages = Object.values(student.errors).flat().join("\n");
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: errorMessages,
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
          confirmButtonText: "OK"
        });
      }
    }
  }, [success, error, message, reset, dispatch]);
  

  const onSubmit = data => {
    dispatch(createStudent({ data, files }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create New Student</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
            {/* First Name */}
            <InputField
              label="First Name"
              name="first_name"
              placeholder="Enter first name"
              register={register}
              errors={errors.first_name}
              validation={{ required: "First name is required" }}
            />

            {/* Last Name */}
            <InputField
              label="Last Name"
              name="last_name"
              placeholder="Enter last name"
              register={register}
              errors={errors.last_name}
              validation={{ required: "Last name is required" }}
            />

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              name="dob"
            
              type="date"
              register={register}
              errors={errors.dob}
              validation={{ required: "Date of birth is required" }}
            />
            <InputField
              label="Date of Birth"
              name="dob"
              type="select"

              register={register}
              errors={errors.dob}
              validation={{ required: "Date of birth is required" }}
            />

            {/* Gender */}
            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Gender</option>
                {["Male", "Female", "Other"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            {/* File Uploader */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Upload Photo / Documents</label>
              {/* Controller lets RHF manage FileUploader’s internal state */}
              <Controller
                name="files"
                control={control}
                render={() => (
                  <FileUploader files={files} onFilesChange={setFiles} />
                )}
              />
            </div>

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              placeholder="Enter email address"
              register={register}
              errors={errors.email}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
            />

            {/* Phone */}
            <InputField
              label="Phone"
              name="phone"
              placeholder="Enter phone number"
              register={register}
              errors={errors.phone}
            />

            {/* Address */}
            <div>
              <label className="block mb-1 font-semibold">Address</label>
              <textarea
                {...register("address", { required: "Address is required" })}
                rows={3}
                className="w-full border p-2 rounded"
                placeholder="Enter address"
              />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-semibold">Status</label>
              <select
                {...register("status", { required: true })}
                className="w-full border p-2 rounded"
                defaultValue="Active"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {loading ? "Creating…" : "Create Student"}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateStudentForm;
