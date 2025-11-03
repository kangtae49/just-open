import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { devToolsEnhancer } from "@redux-devtools/remote";

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer({ realtime: true, hostname: "localhost", port: 8001 }))
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
