import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
    reducer: {
      store:  reducer
    },
  })
  
export default store;