import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "store",
  initialState: {
    result: null,
    selectedVoice: 0
  },
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload
    },
    setSelectedVoice: (state, action) => {
      state.selectedVoice = action.payload
    }
  },
});

export default reducerSlice.reducer;

//action
export const { 
  setResult,
  setSelectedVoice
} = reducerSlice.actions;
