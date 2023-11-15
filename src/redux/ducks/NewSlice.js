import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNew = createAsyncThunk("fetchNew", async(args) => {     
        const {page, nextPage, prevPage} = args 
        console.log("arg in NewSlice ", page, nextPage, prevPage)
        if(page === 0 && nextPage === undefined && prevPage === undefined){
                return;
        } else {
                try{
                        const response = await fetch(`https://www.reddit.com/new.json?limit=${page}&after=${nextPage}&before=${prevPage}`);
                        const data = response.json();
                        console.log("asyncthunk fetchNew ", data);
                        return data;
                
                }catch(err){
                        const message = `Error occured in fetchNew. Message: ${err.message}`;
                        console.log("error ", message)
                        throw new Error(message)
                }
        }
});

const newSlice = createSlice({
        name:"New",
        initialState: {
                isLoading: false,
                data: [],
                page: {nextPage: null, prevPage: null},
                isError: false,
        },
        extraReducers: (builder) => {
                builder.addCase(fetchNew.pending, (state, action) => {
                        state.isLoading = true;
                        state.isError = false;
                });
                builder.addCase(fetchNew.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.data = action.payload.data.children.map(child => child.data);
                        const dataLength = state.data.length;
                        // console.log("lengthData NewSlice", dataLength)
                        state.page.nextPage = state.data[dataLength - 1].name;
                        state.page.prevPage = state.data[0].name
                });
                builder.addCase(fetchNew.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                });
        }
});

export default newSlice.reducer;