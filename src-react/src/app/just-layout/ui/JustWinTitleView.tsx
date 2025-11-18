import * as React from "react";
import {type DropTargetMonitor, useDrop} from "react-dnd";
// import {type CSSProperties, useMemo, useState} from "react";
import classnames from 'classnames';
import type {JustBranch, JustStack, WinInfo} from "@/app/just-layout/justLayoutSlice.ts";
import JustDraggableTitle, {type DragItem} from "@/app/just-layout/ui/JustDraggableTitle.tsx";

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

  const onDrop = (itemType: any, item: DragItem) => {
    console.log("onDrop", itemType, item)
  }

  // const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['DRAG-SOURCE-JUST-TITLE'],
      drop(item: DragItem, monitor) {
        console.log("drop item", item)
        onDrop(monitor.getItemType(), monitor.getItem())
        return undefined
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
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
          winInfo={viewMap[winId]}/>
      )}
    </div>
  )
}

export default JustWinTitleView
