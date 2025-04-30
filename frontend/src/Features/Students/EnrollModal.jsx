import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { createStudent, resetStudent } from "../../redux/slices/studentSlice";
import InputField from "Components/InputField/InputField";
import FileUploader from "utils/FileUploader";

const EnrollModal = ({ isOpen, onClose, footer }) => {
    if (!isOpen) return null;
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
                onClose()
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

    const handleClose = () => {
        reset();
        setFiles(null);
        dispatch(resetStudent());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative">
                <button
                    className="absolute top-0 right-0 text-primary"
                    onClick={handleClose}
                >
                    ✖
                </button>
                <div className="">
                    <div className="">
                        <h2 className="text-3xl font-bold text-white p-2 mt-2 text-center mb-6  bg-primary rounded">Enrolment Application Form</h2>

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
                                {/* First Name */}
                                <InputField
                                    icon
                                    label="First Name"
                                    name="first_name"
                                    placeholder="Enter first name"
                                    register={register}
                                    errors={errors.first_name}
                                    validation={{ required: "First name is required" }}
                                />

                                {/* Last Name */}
                                <InputField
                                    icon
                                    label="Last Name"
                                    name="last_name"
                                    placeholder="Enter last name"
                                    register={register}
                                    errors={errors.last_name}
                                    validation={{ required: "Last name is required" }}
                                />

                                {/* Date of Birth */}
                                <InputField
                                    icon
                                    label="Date of Birth"
                                    name="date_of_birth"
                                    type="date"
                                    register={register}
                                    errors={errors.date_of_birth}
                                    validation={{ required: "Date of birth is required" }}
                                />
                                <InputField
                                    icon
                                    label="Parent Name"
                                    name="parent_name"
                                    type="text"
                                    register={register}
                                    errors={errors.parent_name}
                                    validation={{ required: "Date of birth is required" }}
                                />
                                <InputField
                                    icon
                                    label="Parent Contact"
                                    name="parent_contact"
                                    type="number"
                                    register={register}
                                    errors={errors.parent_contact}
                                    validation={{ required: "Date of birth is required" }}
                                />



                                <InputField
                                    label="Gender"
                                    name="gender"
                                    type="select"
                                    options={[
                                        { label: "Male", value: "Male" },
                                        { label: "Female", value: "Female" },
                                        { label: "Other", value: "Other" }
                                    ]}
                                    validation={{ required: "Status is required" }}
                                />
                                {/* File Uploader */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1 font-semibold">Upload Photo / Documents</label>
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
                                    icon
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
                                    icon
                                    label="Phone"
                                    name="phone"
                                    type="number"
                                    placeholder="Enter phone number"
                                    register={register}
                                    errors={errors.phone}
                                />
                               

                                {/* Address */}
                               
                                <InputField
                                    label="Address"
                                    name="address"
                                    type="textarea"
                                    placeholder="Enter address"
                                    validation={{ required: "Address is required" }}
                                />
                                {/* Status */}

                                <InputField
                                    label="Status"
                                    name="status"
                                    type="select"
                                    options={[
                                        { label: "Active", value: "Active" },
                                        { label: "Inactive", value: "Inactive" }
                                    ]}
                                    validation={{ required: "Status is required" }}
                                />

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="md:col-span-2 w-full py-2 rounded bg-primary text-white hover:bg-primary transition"
                                >
                                    {loading ? "Creating…" : "Create Student"}
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EnrollModal;