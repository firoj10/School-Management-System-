import { configureStore } from '@reduxjs/toolkit';
// import memberReducer from '../Features/Members/memberSlice/memberSlice'; // Ensure this path is correct
import authReducer from '../Features/auth/authSlice';
import studentReducer from '../redux/slices/studentSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,


  },
});

export default store; // Export as default
