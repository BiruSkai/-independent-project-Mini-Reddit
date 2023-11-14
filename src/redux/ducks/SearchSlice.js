import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearch = createAsyncThunk("fetchSearch", async(args) => {
        const {search,limit,before,after,sort,time} = args
        console.log("searchSlice search,limit,before,after,sort,time: ", search,limit,before,after,sort,time);

        try{
                const response = await fetch(`https://www.reddit.com/r/${search}/search.json?limit=${limit}&before=${before}&after=${after}
                        &sort=${sort}&t=${time}`);
                const data = response.json();
                console.log("Data post async fetchSearch: ", data);
                return data;
        } catch(err){
                const message= `Errror occurred post fetchSearch: ${err.message}`;
                console.log(message);
                throw new Error(message);
        };
});

const searchSlice = createSlice({
        name:"search",
        initialState:{
                isLoading: false,
                data:[],
                page:{prevPage:null, nextPage:null},
                isError: false
        },
        extraReducers: (builder) => {
                builder.addCase(fetchSearch.pending, (state, action) => {
                        state.isLoading = true;
                        state.isError = false;
                });
                builder.addCase(fetchSearch.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.data = action.payload.data.children.map(child => child.data);

                        const dataLength = state.data.length;
                        console.log("dataLength in SearchSlice: ", dataLength);

                        state.page.prevPage = state.data[0].name;
                        state.page.nextPage = state.data[dataLength - 1].name;
                });
                builder.addCase(fetchSearch.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                });
        }
})

export default searchSlice.reducer;