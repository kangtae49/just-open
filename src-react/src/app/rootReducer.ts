import { combineReducers } from '@reduxjs/toolkit'
import videoReducer from './video/videoSlice.ts'
import justLayoutReducer from './just-layout/justLayoutSlice.ts'

const rootReducer = combineReducers({
  video: videoReducer,
  justLayout: justLayoutReducer,
});

export default rootReducer;
