import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/auth/authSlice';
import studentReducer from '../redux/slices/studentSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,


  },
});

export default store; 
