import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "store",
  initialState: {
    result: null
  },
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload
    },
  },
});

export default reducerSlice.reducer;

//action
export const { 
  setResult
} = reducerSlice.actions;
