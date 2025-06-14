import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import employeesReducer from './employeesSlice';
import departmentsReducer from './departmentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
  }
});

export default store;