import {createSlice, current} from "@reduxjs/toolkit";
import update from "immutability-helper"

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
  splitPercentage?: number
}

export interface JustLayoutState {
  layout: JustNode | null
}

const initialState: JustLayoutState = {
  layout: null
}

export const createJustLayoutSlice = (id: string) =>
  createSlice({
    name: id,
    initialState,
    reducers: {
      insertNode: (state, { payload }) => {
        if (state.layout == null) {
          state.layout = {
            type: 'stack',
            tabs: [payload.winId],
            active: payload.winId,
          }
        } else if (payload.branch.length === 0) {
          state.layout = {
            type: 'split',
            direction: payload.direction ?? 'row',
            first: {
              type: 'stack',
              tabs: [payload.winId],
              active: payload.winId,
            },
            second: {...state.layout},
            splitPercentage: 50,
          }
        } else {
          const curNode = getByPath(state.layout, payload.branch);
          const newTabs = [...curNode.tabs, payload.winId]
          const newActive = payload.winId
          const patch = makeNested(payload.branch, { $set: {
            type: 'stack',
            tabs: newTabs,
            active: newActive,
          }})
          state.layout = update(current(state.layout), patch)
        }
      },
      removeNode: (state, { payload }) => {
        if (state.layout == null) return;
        if (payload.branch.length === 0) {
          const newLayout = {...state.layout} as JustStack;
          const newTabs = newLayout.tabs.filter((tab: string) => tab !== payload.winId);
          if (newTabs.length === 0) {
            state.layout = null
          } else {
            newLayout.type = 'stack';
            newLayout.tabs = newTabs;
            state.layout = newLayout;
          }
        } else {

          const curNode = getByPath(state.layout, payload.branch);
          const newActivIdx = curNode.tabs.indexOf(payload.winId)
          const newTabs: string [] = curNode.tabs.filter((tab: string) => tab !== payload.winId)
          if (newTabs.length === 0) {
            const lastBranch = payload.branch.at(-1) === 'first' ? 'second' : 'first'
            const parentBranch = payload.branch.slice(0, -1)
            const otherNode = getByPath(state.layout, [...parentBranch, lastBranch])
            const newOtherNode = {...otherNode} as JustSplit
            newOtherNode.splitPercentage = 50
            const patch = makeNested(parentBranch, { $set: newOtherNode})
            state.layout = update(current(state.layout), patch)
          } else {
            const patch = makeNested(payload.branch, { $set: {
                type: 'stack',
                tabs: newTabs,
                active: newActivIdx >= 0 ? newTabs[newActivIdx] : newTabs[0],
              }})
            state.layout = update(current(state.layout), patch)
          }
        }
      },
      updateResize: (state, { payload }) => {
        if (state.layout == null) return;
        const patch = makeNested(payload.branch, { $merge: {
            splitPercentage: payload.splitPercentage,
            test: 'abc'
          }})
        state.layout = update(current(state.layout), patch)
      },
    }
  })

export type JustLayoutSlice = ReturnType<typeof createJustLayoutSlice>;

export type JustLayoutActions = JustLayoutSlice["actions"];

function makeNested(path: (string | number)[], value:any): any {
  return path.reduceRight((acc, key) => ({ [key]: acc }), value)
}
function getByPath<T extends object>(obj: T, path: (string | number)[]): any {
  return path.reduce((acc: any, key) => (acc == null ? undefined : acc[key]), obj)
}

