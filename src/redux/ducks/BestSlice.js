import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBest = createAsyncThunk("fetchBest", async(args) => {     
        const {page, nextPage, prevPage} = args 
        console.log("arg in BestSlice ", page, nextPage, prevPage)
        if(page === 0 && nextPage === undefined && prevPage === undefined){
                return;
        } else {
                try{
                        
                        const response = await fetch(`https://www.reddit.com/best.json?limit=${page}&after=${nextPage}&before=${prevPage}`);
                        const data = response.json();
                        console.log("asyncthunk fetchBest ", data);
                        return data;
                
                }catch(err){
                        const message = `Error occured in fetchBest. Message: ${err.message}`;
                        console.log("error ", message)
                        throw new Error(message)
                }
        }
});

const bestSlice = createSlice({
        name:"best",
        initialState: {
                isLoading: false,
                data: [],
                page: {nextPage: null, prevPage: null},
                // count: {total: 0, count: 0},
                isError: false,
        },
        // reducers:{
        //         increment(state, action){
        //                 state.count.modifiedSetting = false; 
        //                 state.count.count = action.payload.page;
        //                 // console.log("incr count BestSlice ", state.count.count)
        //                 state.count.total += action.payload.page;
        //                 // console.log("incr total BestSlice ", state.count.total)
        //         },
        //         decrement(state, action){
        //                 state.count.modifiedSetting = false;
        //                 state.count.count = action.payload.page;
        //                 // console.log("decr count BestSlice ", state.count.count)
        //                 state.count.total -= action.payload.page;
        //                 // console.log("decr total BestSlice ", state.count.total)
        //         },
        //         reset(state){
        //                 state.count.total = 0;
        //         },
        //         setCount(state, action){
        //                 state.count.modifiedSetting = true;
        //                 state.count.count = action.payload;
        //                 //Converting to int from string
        //                 state.count.total = action.payload;
        //                 // console.log("setCount BestSlice", state.count.count);
                        
        //         }
        // },
        extraReducers: (builder) => {
                builder.addCase(fetchBest.pending, (state, action) => {
                        state.isLoading = true;
                        state.isError = false;
                });
                builder.addCase(fetchBest.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.data = action.payload.data.children.map(child => child.data);

                        const lengthData = state.data.length;
                        // console.log("lengthData BestSlice", lengthData)

                        state.page.nextPage = state.data[lengthData - 1].name;
                        state.page.prevPage = state.data[0].name
        
                });
                builder.addCase(fetchBest.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                });
        }
        
});

export default bestSlice.reducer;
export const {increment, decrement, reset, setCount} = bestSlice.actions;