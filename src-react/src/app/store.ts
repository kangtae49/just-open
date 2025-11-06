import { configureStore, combineReducers, type Reducer } from "@reduxjs/toolkit";

interface DynamicStore extends ReturnType<typeof configureStore> {
  asyncReducers: Record<string, Reducer>;
  injectReducer: (key: string, reducer: Reducer) => void;
  removeReducer: (key: string) => void;
}

export function createDynamicStore(staticReducers = {}): DynamicStore {
  let asyncReducers: Record<string, Reducer> = {};

  const baseStore = configureStore({
    reducer: combineReducers(staticReducers),
  });

  const store = baseStore as unknown as DynamicStore;

  store.asyncReducers = asyncReducers;

  store.injectReducer = (key, asyncReducer) => {
    if (store.asyncReducers[key]) return;
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(combineReducers({
      ...staticReducers,
      ...store.asyncReducers,
    }) as Reducer);
  };

  store.removeReducer = (key) => {
    if (!store.asyncReducers[key]) return;
    delete store.asyncReducers[key];
    store.replaceReducer(combineReducers({
      ...staticReducers,
      ...store.asyncReducers,
    }) as Reducer);
  };

  return store;
}

export const store = createDynamicStore({
  app: (state = { appName: 'JustOpen' }) => state,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/*
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { devToolsEnhancer } from "@redux-devtools/remote";

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer({
    name: "JustOpen",
    realtime: true,
    trace: true,
    maxAge: 1000,
    hostname: "localhost",
    port: 8001
  }))
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
*/