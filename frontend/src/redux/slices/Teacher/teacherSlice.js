

// store/slices/teacherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTeachers,
  fetchTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from './teacherService';

// Async thunks
export const getTeachers = createAsyncThunk(
  'teachers/getTeachers',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTeachers();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTeacher = createAsyncThunk(
  'teachers/getTeacher',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchTeacherById(id);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (formData, { rejectWithValue }) => {
    try {
      return await createTeacher(formData);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editTeacher = createAsyncThunk(
  'teachers/editTeacher',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await updateTeacher(id, formData);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeTeacher = createAsyncThunk(
  'teachers/removeTeacher',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTeacher(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrent(state) {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getTeachers
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // getTeacher
      .addCase(getTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // addTeacher
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // editTeacher
      .addCase(editTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // removeTeacher
      .addCase(removeTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      .addCase(removeTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCurrent } = teacherSlice.actions;
export default teacherSlice.reducer;
