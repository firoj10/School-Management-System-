
import axiosInstance from "../../utils/axiosInstance";

export const uploadStudent = async ({ data, files }) => {
  const formData = new FormData();

  // 1) Append all simple fields
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // 2) Append multiple files
  if (files && files.length > 0) {
    formData.append("std_photo", files[0]);
  }

  // 3) Send request
  const response = await axiosInstance.post(
    "/api/students/create/",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};





// Approve Student Application API
export const approveStudentApplication = async (id) => {
  const response = await axiosInstance.post(`/api/student/applications/approve/${id}/`);
  return response.data;
};

// Reject Student Application API
export const rejectStudentApplication = async (id) => {
  const response = await axiosInstance.post(`/api/student/applications/reject/${id}/`);
  return response.data;
};

export const getPendingApplications = async () => {
  const response = await axios.get("/api/student/application/pending/");
  return response.data;
};
