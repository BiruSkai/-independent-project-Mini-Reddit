import {configureStore} from "@reduxjs/toolkit";
import bestSliceReducer from "./ducks/BestSlice";
import settingSliceReducer from "./ducks/SettingSlice";

const rootReducer = {
        bestSliceReducer,
        settingSliceReducer
}

export const store = configureStore({reducer: rootReducer});
    