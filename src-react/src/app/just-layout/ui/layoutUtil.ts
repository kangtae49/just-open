import type {
  JustNode,
  JustPayloadInsert, JustPayloadMove,
  JustPayloadRemove, JustPayloadResize,
  JustSplit,
  JustStack
} from "@/app/just-layout/justLayoutSlice.ts";
import update from "immutability-helper"


export function insertWin(layout: JustNode | null, payload: JustPayloadInsert): JustNode {
  const addStack: JustStack = {
    type: 'stack',
    tabs: [payload.winId],
    active: payload.winId,
  }
  if (layout == null) {
    return addStack
  } else if (payload.pos === 'stack') {
    const curNode = getByPath(layout, payload.branch);
    if (curNode.type !== 'stack') {
      console.log("check branch curNode", curNode)

      throw new Error("check branch curNode", curNode)
    }
    const safeIndex = payload.index < 0 ? curNode.tabs.length : payload.index;

    // const newTabs = [...curNode.tabs, payload.winId]
    const newTabs = [
      ...curNode.tabs.slice(0, safeIndex),
      payload.winId,
      ...curNode.tabs.slice(safeIndex),
    ]
    const newActive = payload.winId
    const patch = makeNested(payload.branch, { $merge: {
        type: 'stack',
        tabs: newTabs,
        active: newActive,
      }})
    return update(layout, patch)
  } else if (payload.pos === 'first') {
    return {
      type: 'split',
      direction: payload.direction ?? 'row',
      first: addStack,
      second: {...layout},
      splitPercentage: 50,
    }
  } else if (payload.pos === 'second') {
    return {
      type: 'split',
      direction: payload.direction ?? 'row',
      first: {...layout},
      second: addStack,
      splitPercentage: 50,
    }
  } else {
    throw new Error("unknown error")
  }
}

export function removeWin(layout: JustNode | null, payload: JustPayloadRemove): JustNode | null {
  if (layout == null) return null;
  if (payload.branch.length === 0) {
    const newLayout = {...layout} as JustStack;
    const newTabs = newLayout.tabs.filter((tab: string) => tab !== payload.winId);
    if (newTabs.length === 0) {
      return null
    } else {
      return {
        ...newLayout,
        type: 'stack',
        tabs: newTabs,
      };
    }
  } else {
    const curNode = getByPath(layout, payload.branch);
    if (curNode.type !== 'stack') {
      throw new Error("Not stack", curNode)
    }

    const newActivIdx = curNode.tabs.indexOf(payload.winId)
    const newTabs: string [] = curNode.tabs.filter((tab: string) => tab !== payload.winId)
    if (newTabs.length === 0) {
      const lastBranch = payload.branch.at(-1) === 'first' ? 'second' : 'first'
      const parentBranch = payload.branch.slice(0, -1)
      const otherNode = getByPath(layout, [...parentBranch, lastBranch])
      const newOtherNode = {...otherNode} as JustSplit
      newOtherNode.splitPercentage = 50
      const patch = makeNested(parentBranch, { $set: newOtherNode})
      return update(layout, patch)
    } else {
      const patch = makeNested(payload.branch, { $set: {
          type: 'stack',
          tabs: newTabs,
          active: newActivIdx >= 0 ? newTabs[newActivIdx] : newTabs[0],
        }})
      return update(layout, patch)
    }
  }
}

export function updateResize(layout: JustNode | null, payload: JustPayloadResize): JustNode | null {
  if (layout == null) return null;
  const patch = makeNested(payload.branch, { $merge: {
      splitPercentage: payload.splitPercentage,
    }})
  return update(layout, patch)
}

export function moveWin(layout: JustNode | null, payload: JustPayloadMove): JustNode | null {
  if (layout == null) return null;
  if (JSON.stringify(payload.sourceBranch) === JSON.stringify(payload.targetBranch)) {
    const curNode = getByPath(layout, payload.targetBranch);
    if (curNode.type !== 'stack') {
      console.log("check branch curNode", curNode)
      throw new Error("check branch curNode", curNode)
    }
    let newTabs = curNode.tabs.filter((tab: string) => tab !== payload.winId)
    const safeIndex = payload.index < 0 ? newTabs.length : payload.index;
    newTabs = [
      ...newTabs.slice(0, safeIndex),
      payload.winId,
      ...newTabs.slice(safeIndex),
    ]
    console.log("newTabs", newTabs)
    const patch = makeNested(payload.targetBranch, { $merge: {
      tabs: newTabs,
      }})

    return update(layout, patch)
  } else {
    const newLayout = insertWin(layout, {
      branch: payload.targetBranch,
      winId: payload.winId,
      direction: 'row',
      pos: 'stack',
      index: payload.index
    });
    return removeWin(newLayout, {
      branch: payload.sourceBranch,
      winId: payload.winId
    })

  }
}


function makeNested(path: (string | number)[], value:any): any {
  return path.reduceRight((acc, key) => ({ [key]: acc }), value)
}
function getByPath<T extends object>(obj: T, path: (string | number)[]): any {
  return path.reduce((acc: any, key) => (acc == null ? undefined : acc[key]), obj)
}