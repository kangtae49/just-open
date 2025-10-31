import {createSlice} from "@reduxjs/toolkit";

interface VideoState {
  mediaRef: HTMLVideoElement | null;
  mediaPath: string | null;
  currentTime: number;
  volume: number;
  playbackRate: number;
  muted: boolean;
  paused: boolean;
}

const initialState: VideoState = {
  mediaRef: null,
  mediaPath: null,
  currentTime: 0,
  volume: 1,
  playbackRate: 1,
  muted: false,
  paused: true
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
  }
})

export const {} = videoSlice.actions;
export default videoSlice.reducer;
