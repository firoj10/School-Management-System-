import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import axios from 'axios';
import InputField from '../../Components/InputField/InputField';
import FileUploader from '../../utils/FileUploader';
// import InputField from '../components/InputField';
// import FileUploader from '../components/FileUploader';

const TeacherForm = ({ teacherId, onSuccess }) => {
  const methods = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active'
    }
  });
  const { register, control, reset, handleSubmit, formState: { errors, isSubmitting } } = methods;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!teacherId) return;
    axios.get(`/api/teachers/${teacherId}/`)
      .then(({ data }) => {
        reset({
          first_name: data.first_name,
          last_name: data.last_name,
          dob: data.date_of_birth,
          gender: data.gender || '',
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
          status: data.status,
        });
        if (data.photo_url) setFiles([{ url: data.photo_url }]);
      });
  }, [teacherId, reset]);

  const onSubmit = async (formData) => {
    // formData.files will now contain the updated files array
    console.log('Submitting:', formData);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'files') payload.append(key, value);
    });
    formData.files.forEach(file => {
      if (file instanceof File) payload.append('files', file);
    });

    // try {
    //   if (teacherId) await axios.put(`/api/teachers/${teacherId}/`, payload);
    //   else await axios.post('/api/teachers/', payload);
    //   onSuccess();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="max-w-4xl  bg-white shadow-sm rounded-xl p-6 mt-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            icon
            label="First Name"
            name="first_name"
            placeholder="Enter first name"
            register={register}
            errors={errors.first_name}
            validation={{ required: 'First name is required' }}
            className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/50"
          />
          <InputField
            icon
            label="Last Name"
            name="last_name"
            placeholder="Enter last name"
            register={register}
            errors={errors.last_name}
            validation={{ required: 'Last name is required' }}
            className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/50"
          />
          <div>
            <label htmlFor="dob" className="block mb-1 font-semibold">Date of Birth</label>
            <input
              type="date"
              id="dob"
              {...register('dob', { required: 'Date of birth is required' })}
              className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:ring focus:ring-primary/50"
            />
            {errors.dob && <p className="text-red-500 mt-1">{errors.dob.message}</p>}
          </div>
          <div>
            <label htmlFor="gender" className="block mb-1 font-semibold">Gender</label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:ring focus:ring-primary/50"
            >
              <option value="">Select Gender</option>
              {['Male', 'Female', 'Other'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.gender && <p className="text-red-500 mt-1">{errors.gender.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold">Upload Photo/Documents</label>
            <Controller
              name="files"
              control={control}
              render={() => <FileUploader files={files} onFilesChange={setFiles} />}
            />
          </div>
          <InputField
            icon
            label="Email"
            name="email"
            placeholder="Enter email"
            register={register}
            errors={errors.email}
            validation={{
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
            }}
            className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/50"
          />
          <InputField
            icon
            label="Phone"
            name="phone"
            placeholder="Enter phone number"
            register={register}
            errors={errors.phone}
            className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/50"
          />
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block mb-1 font-semibold">Address</label>
            <textarea
              id="address"
              {...register('address', { required: 'Address is required' })}
              rows={4}
              className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:ring focus:ring-primary/50"
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-500 mt-1">{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="status" className="block mb-1 font-semibold">Status</label>
            <select
              id="status"
              {...register('status', { required: true })}
              className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:ring focus:ring-primary/50"
              defaultValue="Active"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="sm:col-span-2 w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition"
          >
            {isSubmitting
              ? (teacherId ? 'Updating…' : 'Creating…')
              : (teacherId ? 'Update Teacher' : 'Create Teacher')
            }
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TeacherForm;
