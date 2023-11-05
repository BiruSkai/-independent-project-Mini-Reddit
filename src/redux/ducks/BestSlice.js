import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBest = createAsyncThunk("fetchBest", async(arg) => {     
         
        try{
                
                const response = await fetch(`https://www.reddit.com/best.json?limit=${arg}`);
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
                count: 0,
                isError: false,
        },
        reducers:{
                increment(state){
                        state.count += 15
                },
                decrement(state){
                        state.count -= 15
                },
                reset(state){
                        state.count = 0
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