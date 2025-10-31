import { combineReducers } from '@reduxjs/toolkit'
import videoReducer from './video/videoSlice.ts'

const rootReducer = combineReducers({
  video: videoReducer
});

export default rootReducer;
