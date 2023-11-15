import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from "./ducks/ThemeSlice";
import pageCountSliceReducer from "./ducks/PageCountSlice";
import bestSliceReducer from "./ducks/BestSlice";
import hotSliceReducer from "./ducks/SubredditHotSlice";
import authorCommentSliceReducer from "./ducks/authorCommentSlice";
import newSliceReducer from "./ducks/NewSlice";
import topSliceReducer from "./ducks/TopSlice";
import risingSliceReducer from "./ducks/RisingSlice";
import contraSliceReducer from "./ducks/ContraSlice";
import searchSliceReducer from "./ducks/SearchSlice";

const rootReducer = {
        pageCountSliceReducer,
        themeSliceReducer,
        bestSliceReducer,
        hotSliceReducer,
        authorCommentSliceReducer,
        newSliceReducer,
        topSliceReducer,
        risingSliceReducer,
        contraSliceReducer,
        searchSliceReducer,
};

export const store = configureStore({reducer: rootReducer});
    