import {configureStore} from "@reduxjs/toolkit";
import pageCountSliceReducer from "./ducks/PageCountSlice";
import bestSliceReducer from "./ducks/BestSlice";
import hotSliceReducer from "./ducks/SubredditHotSlice";
import themeSliceReducer from "./ducks/ThemeSlice";

const rootReducer = {
        pageCountSliceReducer,
        themeSliceReducer,
        bestSliceReducer,
        hotSliceReducer,
};

export const store = configureStore({reducer: rootReducer});
    