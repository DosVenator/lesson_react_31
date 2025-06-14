import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDepartments = createAsyncThunk('departments/fetchAll', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await fetch('http://localhost:3000/api/departments', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
});

export const addDepartment = createAsyncThunk('departments/add', async (department, { getState }) => {
  const token = getState().auth.token;
  const res = await fetch('http://localhost:3000/api/departments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ department })
  });
  const data = await res.json();
  return data.department;
});

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: {
    data: [],
    loading: false
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDepartments.pending, state => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  }
});

export default departmentsSlice.reducer;