import * as React from "react";
import {type DropTargetMonitor, useDrop} from "react-dnd";
// import {type CSSProperties, useMemo, useState} from "react";
import classnames from 'classnames';
import {
  createJustLayoutSlice,
  type JustBranch,
  type JustLayoutActions,
  type JustLayoutState,
  type JustStack,
  type WinInfo
} from "@/app/just-layout/justLayoutSlice.ts";
import JustDraggableTitle, {type DragItem} from "@/app/just-layout/ui/JustDraggableTitle.tsx";
import {useAppDispatch, useDynamicSlice} from "@/store/hooks.ts";
import {LAYOUT_ID} from "@/app/just-layout/ui/JustLayoutView.tsx";

// const style: CSSProperties = {
//   border: '1px dashed gray',
//   padding: '0.5rem',
//   margin: '0.5rem',
// }

interface Prop {
  justBranch: JustBranch
  justStack: JustStack
  viewMap: Record<string, WinInfo>
}

function JustWinTitleView({justBranch, justStack, viewMap}: Prop) {
  const {
    // state: justLayoutState,
    actions: justLayoutActions
  } = useDynamicSlice<JustLayoutState, JustLayoutActions>(LAYOUT_ID, createJustLayoutSlice)
  const dispatch = useAppDispatch();





  const onDrop = (itemType: any, item: DragItem) => {
    console.log("onDrop(JustWinTitle)", itemType, item)
    dispatch(justLayoutActions.moveWin({
      sourceBranch: item.justBranch,
      targetBranch: justBranch,
      winId: item.winId,
      index: item.index,
    }))
  }

  // const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['DRAG-SOURCE-JUST-TITLE'],
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop(_item: DragItem, monitor) {
        // console.log("drop item", item, monitor.getItem())
        onDrop(monitor.getItemType(), monitor.getItem())
        return undefined
      },
    }),
  )
  // const onToggleForbidDrag = useCallback(() => {
  //   setForbidDrag(!forbidDrag)
  // }, [forbidDrag, setForbidDrag])

  // const containerStyle = useMemo(
  //   () => ({
  //     ...style,
  //     backgroundColor: '#efefef',
  //     opacity: isDragging ? 0.4 : 1,
  //     cursor: forbidDrag ? 'default' : 'move',
  //   }),
  //   [isDragging, forbidDrag],
  // )


  return (
    <div
      className={classnames("just-win-title", {"isOver": isOver})}
      ref={drop as unknown as React.Ref<HTMLDivElement>}
    >

      {justStack.tabs.map(winId =>
        <JustDraggableTitle
          key={[...justBranch, winId].join(",")}
          winId={winId}
          justBranch={justBranch}
          justStack={justStack}
          winInfo={viewMap[winId]}
        />
      )}
    </div>
  )
}

export default JustWinTitleView
