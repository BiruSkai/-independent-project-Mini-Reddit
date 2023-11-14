import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
        name:"theme",
        initialState: {
                theme:"Best"
        },
        reducers:{
                setTheme(state,action){
                        state.theme = action.payload;
                }
        }
})

//for configurationStore
export default themeSlice.reducer;
//Action used 
export const {setTheme} = themeSlice.actions;
