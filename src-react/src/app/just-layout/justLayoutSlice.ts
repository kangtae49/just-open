import {createSlice, current} from "@reduxjs/toolkit";
import {type JSX} from "react";
import {insertWin, moveWin, removeWin, updateResize} from "@/app/just-layout/ui/layoutUtil.ts";

export type JustDirection = 'row' | 'column';
export type JustSplitType = 'first' | 'second';

export type JustNode = JustStack | JustSplit

export type JustBranch = JustSplitType []

export interface JustStack {
  type: 'stack'
  tabs: string[]
  active: string
}

export interface JustSplit {
  type: 'split'
  direction: JustDirection
  first: JustNode
  second: JustNode
  splitPercentage: number
}

export type JustPos = JustSplitType | 'stack'

export interface JustPayloadInsert {
  branch: JustBranch
  winId: string
  direction: JustDirection
  pos: JustPos
  index: number
}

export interface JustPayloadRemove {
  branch: JustBranch
  winId: string
}

export interface JustPayloadResize {
  branch: JustBranch
  splitPercentage: number
}

export interface JustPayloadMove {
  sourceBranch: JustBranch
  targetBranch: JustBranch
  winId: string
  index: number
}

export interface JustLayoutState {
  layout: JustNode | null
}


const initialState: JustLayoutState = {
  layout: null
}

export interface WinInfo {
  title: string
  icon: JSX.Element
  view: JSX.Element
}

export const createJustLayoutSlice = (id: string) =>
  createSlice({
    name: id,
    initialState,
    reducers: {
      setLayout: (state, { payload }: {payload: JustNode}) => { state.layout = payload },
      insertWin: (state, { payload }: {payload: JustPayloadInsert}) => {
        state.layout = insertWin(current(state.layout), payload)
      },
      removeWin: (state, { payload }: {payload: JustPayloadRemove}) => {
        state.layout = removeWin(current(state.layout), payload)
      },
      moveWin: (state, { payload }: {payload: JustPayloadMove}) => {
        state.layout = moveWin(current(state.layout), payload)
      },
      updateResize: (state, { payload }: {payload: JustPayloadResize}) => {
        state.layout = updateResize(current(state.layout), payload)
      },

    }
  })

export type JustLayoutSlice = ReturnType<typeof createJustLayoutSlice>;

export type JustLayoutActions = JustLayoutSlice["actions"];


