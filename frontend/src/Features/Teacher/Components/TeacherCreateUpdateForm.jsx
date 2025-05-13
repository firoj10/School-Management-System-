import React, { useEffect, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputField from "../../../Components/InputField/InputField";
import SingleImage from "../../../Components/ImageUploder/SingleImage";
import ActionButtons from "../../../Components/ActionButtons/ActionButtons";

const TeacherCreateUpdateForm = ({ initialData = {}, onSubmit, loading, buttonLabel = "Save" }) => {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(initialData.photoUrl || null);

  const defaultValues = useCallback(() => ({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    email: initialData.email || "",
    date_of_birth: initialData.date_of_birth || "",
    phone: initialData.phone || "",
    status: initialData.status || "Active",
    photo: null, // form field for file
  }), [initialData]);

  const methods = useForm({ defaultValues: defaultValues() });
  const { register, handleSubmit, reset, setValue, formState: { errors, isDirty, isSubmitting } } = methods;

  useEffect(() => {
    reset(defaultValues());
    setPhotoPreview(initialData.photoUrl || null);
  }, [initialData, reset, defaultValues]);

  const handleImageChange = useCallback((file) => {
    setValue("photo", file, { shouldValidate: true });
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  }, [setValue]);

  const onFormSubmit = useCallback(async (data) => {
    console.log("data",data)
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.set(key, value);
      }
    });

    try {
      await onSubmit(formData);
      Swal.fire("Success", `Teacher ${initialData.id ? 'updated' : 'created'} successfully!`, 'success');
      navigate('/teachers');
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || 'Something went wrong.', 'error');
    }
  }, [onSubmit, navigate, initialData]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputField label="First Name" name="first_name" register={register} errors={errors.first_name} validation={{ required: "First name is required" }} />
          <InputField label="Last Name" name="last_name" register={register} errors={errors.last_name} validation={{ required: "Last name is required" }} />
          <InputField label="Email" type="email" name="email" register={register} errors={errors.email} validation={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } }} />
          <InputField label="Date of Birth" type="date" name="date_of_birth" register={register} errors={errors.date_of_birth} validation={{ required: "Date of birth is required" }} />

          <div className="md:col-span-2">
            <SingleImage initialUrl={photoPreview} onChange={handleImageChange} />
            {/* Hidden file field registered in form */}
            <input type="hidden" {...register('photo')} />
          </div>

          <InputField label="Phone" name="phone" register={register} errors={errors.phone} />
          <InputField label="Status" type="select" name="status" options={[{ label: "Active", value: "Active" }, { label: "Inactive", value: "Inactive" }]} register={register} errors={errors.status} validation={{ required: "Status is required" }} />

          <div className="md:col-span-2 flex justify-between items-center mt-4">
            <ActionButtons type="back" onClick={handleBack} />
            <ActionButtons type="submit" disabled={!isDirty || isSubmitting} />
          </div>

        </form>
      </FormProvider>
    </div>
  );
};

export default TeacherCreateUpdateForm;
