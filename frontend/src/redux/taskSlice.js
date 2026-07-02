import {createSlice} from "@reduxjs/toolkit";
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};
const taskSlice  = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        
    },
});
export default taskSlice.reducer;

