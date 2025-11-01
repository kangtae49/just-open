import {createSlice} from "@reduxjs/toolkit";

interface VideoState {
  mediaPath: string | null
  currentTime: number
  duration: number
  volume: number
  playbackRate: number
  muted: boolean
  isPlaying: boolean
  autoPlay?: boolean
  controls?: boolean
}

const initialState: VideoState = {
  mediaPath: null,
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
  muted: false,
  isPlaying: false,
  autoPlay: false,
  controls: false,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setMediaPath: (state, { payload }) => { state.mediaPath = payload },
    setCurrentTime: (state, { payload }) => { state.currentTime = payload },
    setDuration: (state, { payload }) => { state.duration = payload },
    setVolume: (state, { payload }) => { state.volume = payload },
    setPlaybackRate: (state, { payload }) => { state.playbackRate = payload },
    setMuted: (state, { payload }) => { state.muted = payload },
    setIsPlaying: (state, { payload }) => { state.isPlaying = payload },
  }
})

export const videoActions = videoSlice.actions;
export default videoSlice.reducer;
