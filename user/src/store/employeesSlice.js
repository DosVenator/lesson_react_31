import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { getState }) => {
    const token = getState().auth.token;

    const res = await fetch("http://localhost:3000/api/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee, { getState }) => {
    const token = getState().auth.token;

    const res = await fetch("http://localhost:3000/api/employees", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee }),
    });

    const data = await res.json();
    return data.employee;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, employee }, { getState }) => {
    const token = getState().auth.token;

    const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee }),
    });

    const data = await res.json();
    return data.employee;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { getState }) => {
    const token = getState().auth.token;

    await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return id; 
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.data = state.data.filter((emp) => emp.id !== action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.data.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default employeesSlice.reducer;
