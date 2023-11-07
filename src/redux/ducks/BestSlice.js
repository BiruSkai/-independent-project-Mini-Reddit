import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBest = createAsyncThunk("fetchBest", async(arg) => {     
         
        try{
                
                const response = await fetch(`https://www.reddit.com/best.json?limit=${arg}&after=t5_2xhvq`);
                const data = response.json();
                console.log("asyncthunk fetchBest ", data);
                return data;
        }catch(err){
                const message = `Error occured. Message: ${err.message}`;
                // console.log("error ", message)
                throw new Error(message)
        }
});

const bestSlice = createSlice({
        name:"best",
        initialState: {
                isLoading: false,
                data: [],
                prevPage: null,
                nextPage: null,
                count: {total: 0, count: 0},
                isError: false,
        },
        reducers:{
                increment(state, action){
                        state.count.count = action.payload;
                        state.count.total += action.payload;
                },
                decrement(state, action){
                        state.count.count = action.payload;
                        state.count.total -= action.payload;
                },
                reset(state){
                        state.count.total = 0;
                }
        },
        extraReducers: (builder) => {
                builder.addCase(fetchBest.pending, (state, action) => {
                        state.isLoading = true;
                        state.isError = false;
                });
                builder.addCase(fetchBest.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.data = action.payload.data.children.map(child => child.data);
                        state.nextPage = action.payload.data.after;
                        state.prevPage = action.payload.data.before;
                });
                builder.addCase(fetchBest.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                });
        }
        
});

export default bestSlice.reducer;
export const {increment, decrement, reset} = bestSlice.actions;