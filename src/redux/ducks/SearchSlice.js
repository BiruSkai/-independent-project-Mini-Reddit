import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearch = createAsyncThunk("fetchSearch", async(args) => {
        
        const {search,page,prevPage,nextPage,sort,time} = args
        console.log("searchSlice search, page, prevPage, nextPage, sort, time: ", search,page,prevPage,nextPage,sort,time);

        try{
                const response = await fetch(`https://www.reddit.com/search/.json?q=${search}&limit=${page}&before=${prevPage}&after=${nextPage}
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
                input: "",
                data:[],
                page:{prevPage:null, nextPage:null},
                isError: false
        },
        reducers:{
                inputSearch(state, action){
                        state.input = action.payload;
                        console.log("xx", state.input)
                }
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
export const {inputSearch} = searchSlice.actions;