

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadStudent, approveStudentApplication, rejectStudentApplication } from "./studentService";

// Create Student
export const createStudent = createAsyncThunk(
  "student/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await uploadStudent(payload);
      return response;
    } catch (err) {
      const errorData = err.response?.data;
      return rejectWithValue(errorData || err.message);
    }
  }
);

// Approve Student Application
export const approveApplication = createAsyncThunk(
  "student/approve",
  async (id, { rejectWithValue }) => {
    try {
      const response = await approveStudentApplication(id);
      return response;
    } catch (err) {
      const errorData = err.response?.data;
      return rejectWithValue(errorData || err.message);
    }
  }
);

// Reject Student Application
export const rejectApplication = createAsyncThunk(
  "student/reject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rejectStudentApplication(id);
      return response;
    } catch (err) {
      const errorData = err.response?.data;
      return rejectWithValue(errorData || err.message);
    }
  }
);
// Fetch Pending Student Applications
export const fetchPendingApplications = createAsyncThunk(
  "student/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPendingApplications();  // service call
      console.log(response)
      return response;
    } catch (err) {
      const errorData = err.response?.data;
      return rejectWithValue(errorData || err.message);
    }
  }
);


const initialState = {
  current: null,
  loading: false,
  success: false,
  pendingStudents: [],  // ✅ pending গুলা এখানে রাখবো

  error: null,
  message: null,
  errors: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudent: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.errors = null;
      })
      .addCase(createStudent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.current = payload.student || payload;
        state.message = payload.message || "Success";
      })
      .addCase(createStudent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Something went wrong.";
        state.errors = payload?.errors || null;
      })
      
      // Approve Application
      .addCase(approveApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.errors = null;
      })
      .addCase(approveApplication.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message || "Application approved successfully.";
      })
      .addCase(approveApplication.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Failed to approve application.";
        state.errors = payload?.errors || null;
      })

      // Reject Application
      .addCase(rejectApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.errors = null;
      })
      .addCase(rejectApplication.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message || "Application rejected successfully.";
      })
      .addCase(rejectApplication.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Failed to reject application.";
        state.errors = payload?.errors || null;
      })
      // pending Application

      .addCase(fetchPendingApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.errors = null;
      })
      .addCase(fetchPendingApplications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.pendingStudents = payload;  // ✅ এখানে pending students আসবে
      })
      .addCase(fetchPendingApplications.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Failed to fetch pending applications.";
        state.errors = payload?.errors || null;
      });
  },
});

export const { resetStudent } = studentSlice.actions;
export default studentSlice.reducer;















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { uploadStudent } from "./studentService";

// export const createStudent = createAsyncThunk(
//   "student/create",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await uploadStudent(payload);
//       return response;  
//     } catch (err) {
//       const errorData = err.response?.data;
//       return rejectWithValue(errorData || err.message);
//     }
//   }
// );

// const initialState = {
//   current: null,
//   loading: false,
//   success: false,
//   error: null,
//   message: null,
//   errors: null,  // ✅ new
// };

// const studentSlice = createSlice({
//   name: "student",
//   initialState,
//   reducers: {
//     resetStudent: () => initialState,
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(createStudent.pending, state => {
//         state.loading = true;
//         state.error = null;
//         state.message = null;
//         state.errors = null;
//       })
//       .addCase(createStudent.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         state.current = payload.student || payload;
//         state.message = payload.message || "Success";
//       })
//       .addCase(createStudent.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = true;
//         state.message = payload?.message || "Something went wrong.";
//         state.errors = payload?.errors || null;  // ✅ new
//       });
//   }
// });

// export const { resetStudent } = studentSlice.actions;
// export default studentSlice.reducer;
