import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHot = createAsyncThunk("fetchHot", async(args) => {
        const {subreddit, page, prevPage, nextPage} = args;
        console.log("prefetch args in HotSlice ", subreddit, page, nextPage, prevPage)

        try{
                const fetchHot = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=${page}&after=${nextPage}&before=${prevPage}`);
                const data = fetchHot.json();
                console.log("data fetchHot asyncThunk ", data);
                return data;
        } catch(err){
                const message = `Error occured in fetchHot. Message: ${err.message}`;
                console.log("error SubredditHotSlice", message)
                throw new Error(message)
        }
});

const hotSlice = createSlice({
        name: "hot",
        initialState: {
                isLoading: false,
                data:[],
                page: {nextPage: null, prevPage: null},
                count: {total: 0, count: 0},
                isError: false
        },
     
        extraReducers: (builder) => {
                builder.addCase(fetchHot.pending, (state, action) => {
                        state.isLoading = true;
                        state.isError = false;
                });
                builder.addCase(fetchHot.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.data = action.payload.data.children.map(child => child.data);

                        const lengthData = state.data.length;
                        console.log("lengthData HotSlice", lengthData)

                        state.page.nextPage = state.data[lengthData - 1].name;
                        state.page.prevPage = state.data[0].name
        
                });
                builder.addCase(fetchHot.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                });
        }
        
});

export default hotSlice.reducer;
// export const {increment, decrement, reset, setCount} = hotSlice.actions;
