import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from "./ducks/ThemeSlice";
import pageCountSliceReducer from "./ducks/PageCountSlice";
import bestSliceReducer from "./ducks/BestSlice";
import hotSliceReducer from "./ducks/SubredditHotSlice";
import authorCommentSliceReducer from "./ducks/authorCommentSlice";
import searchSliceReducer from "./ducks/SearchSlice";

const rootReducer = {
        pageCountSliceReducer,
        themeSliceReducer,
        bestSliceReducer,
        hotSliceReducer,
        authorCommentSliceReducer,
        searchSliceReducer,
};

export const store = configureStore({reducer: rootReducer});
    