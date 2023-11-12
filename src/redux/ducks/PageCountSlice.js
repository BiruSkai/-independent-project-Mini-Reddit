import { createSlice } from "@reduxjs/toolkit";

const PageCountSlice = createSlice({
       name:"PageCount",
       initialState: {
        count:{total:0, count:0}
       },
       reducers:{
                increment(state, action){
                        state.count.count = action.payload.page;
                        console.log("incr count PageCountSlice ", state.count.count)
                        state.count.total += action.payload.page;
                        console.log("incr total PageCountSlice ", state.count.total)
                },
                decrement(state, action){
                        state.count.count = action.payload.page;
                        // console.log("decr count PageCountSlice ", state.count.count)
                        state.count.total -= action.payload.page;
                        // console.log("decr total PageCountSlice ", state.count.total)
                },
                reset(state){
                        state.count.total = state.count.count;
                },
                setCount(state, action){
                        //for init count and total 
                        state.count.count = action.payload;
                        state.count.total = action.payload;
                        // console.log("setCount PageCountSlice", state.count.count);
                }
       }
});
 
export default PageCountSlice.reducer;
export const {increment, decrement, reset, setCount} = PageCountSlice.actions;