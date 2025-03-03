import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      state.filter((connection) => connection._id !== action.payload);
    },
  },
});

export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
