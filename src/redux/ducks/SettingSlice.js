import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
        name:"setting",
        initialState: {data: null},
        reducers:{
                pageDisplayed(state, action){
                        state.data = action.payload;
                        console.log("settingSlice state ", state.data)
                }
        }
});

export const {pageDisplayed} = settingSlice.actions;
export default settingSlice.reducer;