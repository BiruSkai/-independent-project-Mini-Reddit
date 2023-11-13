import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAuthorComment = createAsyncThunk("fetchAuthorComment", async(args) => {
        const {subreddit, page, prevPage, nextPage} = args;
        

        try{
                const fetchAuthorComment = await fetch(`https://www.reddit.com/user/${subreddit}/comments.json?limit=${page}&after=${nextPage}&before=${prevPage}`);
                const data = fetchAuthorComment.json();
                console.log("postfetch args in authorCommentSlice ", subreddit, page, nextPage, prevPage)
                console.log("data fetchAuthorComment asyncThunk ", data);
                return data;
        } catch(err){
                const message = `Error occured in fetchAuthorComment. Message: ${err.message}`;
                console.log("error AuthorCommentSlice", message)
                throw new Error(message)
        }
});

const authorCommentSlice = createSlice({
        name: "authorComment",
        initialState: {
                isLoading: false,
                data:[],
                page: {nextPage: null, prevPage: null},
                count: {total: 0, count: 0},
                isError: false
        },
     
        extraReducers: (builder) => {
                builder.addCase(fetchAuthorComment.pending, (state, action) => {
                        state.isLoading = true;
                        state.isError = false;
                });
                builder.addCase(fetchAuthorComment.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.data = action.payload.data.children.map(child => child.data);

                        const lengthData = state.data.length;
                        console.log("lengthData authorCommentSlice", lengthData)

                        state.page.nextPage = state.data[lengthData - 1].name;
                        state.page.prevPage = state.data[0].name
        
                });
                builder.addCase(fetchAuthorComment.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                });
        }
        
});

export default authorCommentSlice.reducer;
