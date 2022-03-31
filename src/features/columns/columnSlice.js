import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/columnApi";

export const createColumn = createAsyncThunk("columns/create", async (data) => {
  const res = await api.createColumn(data.name, data.token);
  return res.data;
});

export const fetchColumns = createAsyncThunk("columns/fetch", async (token) => {
  const res = await api.fetchColumns(token);
  return res.data;
});

export const deleteColumn = createAsyncThunk("columns/delete", async (data) => {
  const res = await api.deleteColumn(data.columnId, data.token);
  return res.data;
});

export const updateColumn = createAsyncThunk("columns/update", async (data) => {
  const res = await api.updateColumn(data.columnId, data.newName, data.token);
  console.log(res);
  return res.data;
});

export const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    columns: [],
  },
  reducers: {
    clearColumns(state) {
      state.columns = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createColumn.fulfilled, (state, action) => {
        console.log(action.payload);
        state.columns.push(action.payload);
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      state.columns = state.columns.filter(
        (item) => item.id !== action.payload.id
      );
    });
    builder.addCase(updateColumn.fulfilled, (state, action) => {
      // console.log(action.payload);
    });
  },
});

export const selectColumnsByUserId = (state, userId) =>
  state.columns.columns.find((column) => column.userId === userId);

export const {clearColumns} = columnsSlice.actions
export default columnsSlice.reducer;
