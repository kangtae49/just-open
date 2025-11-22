import type {
  JustBranch, JustDirection,
  JustNode,
  JustPos,
  JustStack,
  // JustPayloadInsert, JustPayloadMoveSplit, JustPayloadMoveTab,
  // JustPayloadRemove, JustPayloadResize,
  // JustSplit,
} from "@/app/just-layout/justLayoutSlice.ts";
import update from "immutability-helper"
import clamp from "lodash/clamp";



// export function insertWinId(layout: JustNode | null, winId: string, index: number): JustNode | null {
//   if (layout == null) return null;
//   const justStack = getNodeByWinId(layout, winId) as unknown as JustStack | null
//   if (justStack == null) return layout;
//   const newTabs = [
//     justStack.tabs.slice(0, index),
//     winId,
//     justStack.tabs.slice(index),
//   ]
//   return updateNodeOfWinId(layout, winId, {
//     $set: {
//       ...justStack,
//       tabs: newTabs,
//       active: winId,
//     }
//   })
// }

export function insertWinId(layout: JustNode | null, winId: string, branch: JustBranch, pos: JustPos, direction: JustDirection, index: number): JustNode | null {
  if (layout == null) {
    // stack
    return {
      type: "stack",
      tabs: [
        winId,
      ],
      active: winId,
    } as JustStack
  }
  const targetNode = getNodeByBranch(layout, branch)
  const targetType = targetNode.type
  if (pos === 'stack' && targetType === 'stack') {
    const targetTabs = (targetNode as JustStack).tabs

    const newIndex = index >= 0 ? clamp(index, 0, targetTabs.length) : targetTabs.length;
    return updateNodeOfBranch(layout, branch, {
      $set: {
        type: "stack",
        tabs: [
          ...targetTabs.slice(0, newIndex),
          winId,
          ...targetTabs.slice(newIndex),
        ],
        active: winId,
      }
    })
  } else if (pos === 'second') {
    return updateNodeOfBranch(layout, branch, {
      $set: {
        type: "split",
        direction: direction,
        first: targetNode,
        second: {
          type: "stack",
          tabs: [winId],
          active: winId,
        },
        splitPercentage: 50,
      }
    })
  } else if (pos === 'first') {
    return updateNodeOfBranch(layout, branch, {
      $set: {
        type: "split",
        direction: direction,
        first: {
          type: "stack",
          tabs: [winId],
          active: winId,
        },
        second: targetNode,
        splitPercentage: 50,
      }
    })
  }
  console.log("unknown error pos: ", pos, ", targetType: ", targetType)
  return null

}

export function removeWinId(layout: JustNode | null, winId: string): JustNode | null {
  if (layout == null) return null;
  const justStack = getNodeByWinId(layout, winId) as unknown as JustStack | null
  if (justStack == null) return layout;
  const newTabs = justStack.tabs.filter((tab: string) => tab !== winId)
  const active = newTabs.length > 0
    ? newTabs[clamp(justStack.tabs.indexOf(justStack.active), 0, newTabs.length - 1)]
    : ''
  return updateNodeOfWinId(layout, winId, {
    $set: {
      ...justStack,
      tabs: newTabs,
      active: active,
    }
  })
}

export function moveWinId(layout: JustNode | null, winId: string, branch: JustBranch, pos: JustPos, direction: JustDirection, index: number): JustNode | null {
  const newLayout = removeWinId(layout, winId)
  return insertWinId(newLayout, winId, branch, pos, direction, index)
}

export function updateSplitPercentage(layout: JustNode | null, branch: JustBranch, splitPercentage: number) {
  return updateNodeOfBranch(layout, branch, {
    $merge: {
      splitPercentage: splitPercentage,
    }
  })
}


// export function insertWin(layout: JustNode | null, payload: JustPayloadInsert): JustNode {
//   const addStack: JustStack = {
//     type: 'stack',
//     tabs: [payload.winId],
//     active: payload.winId,
//   }
//   const branch = getBranch(layout, payload.winId, []) ?? []
//
//   if (layout == null) {
//     return addStack
//   } else if (payload.pos === 'stack') {
//     const curNode = getNodeByBranch(layout, branch);
//     if (curNode.type !== 'stack') {
//       console.log("check branch curNode", curNode)
//
//       throw new Error("check branch curNode", curNode)
//     }
//     const safeIndex = payload.index < 0 ? curNode.tabs.length : payload.index;
//
//     // const newTabs = [...curNode.tabs, payload.winId]
//     const newTabs = [
//       ...curNode.tabs.slice(0, safeIndex),
//       payload.winId,
//       ...curNode.tabs.slice(safeIndex),
//     ]
//     const newActive = payload.winId
//     const patch = makePatch(payload.branch, { $set: {
//         type: 'stack',
//         tabs: newTabs,
//         active: newActive,
//       }})
//     return update(layout, patch)
//   } else if (payload.pos === 'first') {
//     const curNode = getNodeByBranch(layout, payload.branch);
//     const patch = makePatch(payload.branch, {
//       $set: {
//         type: 'split',
//         direction: payload.direction,
//         first: addStack,
//         second: curNode,
//         splitPercentage: 50,
//       }
//     })
//     return update(layout, patch)
//   } else if (payload.pos === 'second') {
//     const curNode = getNodeByBranch(layout, branch);
//     const patch = makePatch(branch, {
//       $set: {
//         type: 'split',
//         direction: payload.direction,
//         first: curNode,
//         second: addStack,
//         splitPercentage: 50,
//       }
//     })
//     return update(layout, patch)
//   } else {
//     throw new Error("unknown error")
//   }
// }
//
// export function removeWin(layout: JustNode | null, payload: JustPayloadRemove): JustNode | null {
//   if (layout == null) return null;
//   const branch = getBranch(layout, payload.winId, []) ?? []
//   if (branch.length === 0) {
//     const newLayout = {...layout} as JustStack;
//     let activeIndex = newLayout.tabs.indexOf(payload.winId);
//
//     const newTabs = newLayout.tabs.filter((tab: string) => tab !== payload.winId);
//     activeIndex = clamp(activeIndex, 0, newTabs.length - 1);
//
//     if (newTabs.length === 0) {
//       return null
//     } else {
//       return {
//         ...newLayout,
//         type: 'stack',
//         tabs: newTabs,
//         active: newTabs[activeIndex],
//       };
//     }
//   } else {
//     const curNode = getNodeByBranch(layout, branch);
//     if (curNode.type !== 'stack') {
//       throw new Error("Not stack", curNode)
//     }
//
//     let activeIndex = curNode.tabs.indexOf(payload.winId)
//     const newTabs: string [] = curNode.tabs.filter((tab: string) => tab !== payload.winId)
//
//     activeIndex = clamp(activeIndex, 0, newTabs.length - 1);
//
//     if (newTabs.length === 0) {
//       const lastBranch = branch.at(-1) === 'first' ? 'second' : 'first'
//       const parentBranch = branch.slice(0, -1)
//       const otherNode = getNodeByBranch(layout, [...parentBranch, lastBranch])
//       const newOtherNode = {...otherNode} as JustSplit
//       newOtherNode.splitPercentage = 50
//       const patch = makePatch(parentBranch, { $set: newOtherNode})
//       return update(layout, patch)
//     } else {
//       activeIndex = clamp(activeIndex, 0, newTabs.length - 1);
//
//       const patch = makePatch(payload.branch, { $set: {
//           type: 'stack',
//           tabs: newTabs,
//           active: newTabs[activeIndex],
//         }})
//       return update(layout, patch)
//     }
//   }
// }
//
// export function updateResize(layout: JustNode | null, payload: JustPayloadResize): JustNode | null {
//   if (layout == null) return null;
//   const patch = makePatch(payload.branch, { $merge: {
//       splitPercentage: payload.splitPercentage,
//     }})
//   return update(layout, patch)
// }
//
// export function moveTab(layout: JustNode | null, payload: JustPayloadMoveTab): JustNode | null {
//   if (layout == null) return null;
//   const sourceBranch = getBranch(layout, payload.winId, []) ?? []
//   if (JSON.stringify(sourceBranch) === JSON.stringify(payload.targetBranch)) {
//     const curNode = getNodeByBranch(layout, payload.targetBranch);
//     if (curNode.type !== 'stack') {
//       console.log("check branch curNode", curNode)
//       throw new Error("check branch curNode", curNode)
//     }
//     let newTabs = curNode.tabs.filter((tab: string) => tab !== payload.winId)
//     const safeIndex = payload.index < 0 ? newTabs.length : payload.index;
//     newTabs = [
//       ...newTabs.slice(0, safeIndex),
//       payload.winId,
//       ...newTabs.slice(safeIndex),
//     ]
//     console.log("newTabs", newTabs)
//     const patch = makePatch(payload.targetBranch, {
//       $set: {
//         type: 'stack',
//         tabs: newTabs,
//         active: payload.winId,
//       }
//     })
//
//     return update(layout, patch)
//   } else {
//     const newLayout = removeWin(layout, {
//       branch: sourceBranch,
//       winId: payload.winId
//     })
//
//     return insertWin(newLayout, {
//       branch: payload.targetBranch,
//       winId: payload.winId,
//       direction: 'row',
//       pos: 'stack',
//       index: payload.index
//     })
//   }
// }
//
// export function moveSplit(layout: JustNode | null, payload: JustPayloadMoveSplit): JustNode | null {
//   const newLayout = insertWin(layout, {
//     branch: payload.targetBranch,
//     winId: payload.winId,
//     direction: payload.direction,
//     pos: payload.split,
//     index: -1,
//   });
//   return removeWin(newLayout, {
//     branch: payload.sourceBranch,
//     winId: payload.winId
//   })
// }

function getBranch(layout: JustNode | null, winId: string, branch: JustBranch): JustBranch | null {
  if( layout === null) return null
  if (layout.type === 'stack') {
    if (layout.tabs.includes(winId)) {
      return branch
    } else {
      return null
    }
  } else {
    const branchFirst = getBranch(layout.first, winId, [...branch, 'first'])
    if (branchFirst != null) {
      return branchFirst
    }
    const branchSecond = getBranch(layout.second, winId, [...branch, 'second'])
    if (branchSecond != null) {
      return branchSecond
    }
    return null
  }
}

function getBranchByWinId(layout: JustNode | null, winId: string): JustBranch | null {
  return getBranch(layout, winId, [])
}

function getNodeByWinId(layout: JustNode | null, winId: string): JustNode | null {
  if( layout === null) return null
  if (layout.type === 'stack') {
    if (layout.tabs.includes(winId)) {
      return layout
    } else {
      return null
    }
  } else {
    const nodeFirst = getNodeByWinId(layout.first, winId)
    if (nodeFirst != null) {
      return nodeFirst
    }
    const nodeSecond = getNodeByWinId(layout.second, winId)
    if (nodeSecond != null) {
      return nodeSecond
    }
    return null
  }
}

function getNodeByBranch<T extends JustNode>(obj: JustNode, path: JustBranch): T {
  return path.reduce((acc: any, key) => (acc == null ? undefined : acc[key]), obj)
}

function makePatch(path: JustBranch, value:any): any {
  return path.reduceRight((acc, key) => ({ [key]: acc }), value)
}

function updateNodeOfBranch(layout: JustNode | null, branch: JustBranch, value: any): JustNode | null {
  if (layout == null) return null;
  return update(layout, makePatch(branch, value))
}

function updateNodeOfWinId(layout: JustNode | null, winId: string, value: any): JustNode | null {
  if (layout == null) return null;
  const branch = getBranchByWinId(layout, winId)
  if (branch == null) return layout;
  const patch = makePatch(branch, value)
  return update(layout, patch)
}
