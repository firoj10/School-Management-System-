
import axios from 'axios';
import axiosInstance from '../../../utils/axiosInstance';


/**
 * Fetch all teachers
 */
export const fetchTeachers = async () => {
  const response = await axiosInstance.get(`/api/teachers/`);
  return response.data;
};

/**
 * Fetch a single teacher by ID
 */
export const fetchTeacherById = async (id) => {
  const response = await axiosInstance.get(`/api/teachers/detail/${id}/`);
  return response.data;
};

/**
 * Create a new teacher
 * @param {FormData} formData - FormData object with teacher fields and files
 */
export const createTeacher = async (formData) => {
  const response = await axiosInstance.post(
    `/api/teachers/create/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

/**
 * Update an existing teacher
 * @param {number} id - Teacher ID
 * @param {FormData} formData
 */
export const updateTeacher = async (id, formData) => {
  const response = await axiosInstance.put(
    `/api/teachers/update/${id}/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

/**
 * Delete a teacher
 * @param {number} id
 */
export const deleteTeacher = async (id) => {
  const response = await axiosInstance.delete(`/api/teachers/delete/${id}/`);
  return response.data;
};