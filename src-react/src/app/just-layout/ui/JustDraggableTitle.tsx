import type {JustBranch, WinInfo} from "@/app/just-layout/justLayoutSlice.ts";
import {type DragSourceMonitor, useDrag} from "react-dnd";
import * as React from "react";
import classnames from "classnames";

export interface DragItem {
  justBranch: JustBranch
  winId: string
}

interface Prop {
  justBranch: JustBranch
  winId: string
  winInfo: WinInfo
}

function JustDraggableTitle(props: Prop) {
  const { winInfo, justBranch, winId } = props;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'DRAG-SOURCE-JUST-TITLE',
      canDrag: true,
      item: {
        justBranch,
        winId
      } as DragItem,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
  )

  return (
    <div
      className={classnames("just-draggable-title", {"dragging": isDragging})}
      ref={drag as unknown as React.Ref<HTMLDivElement>}
    >
      <div className="just-icon">{winInfo.icon}</div>
      <div className="just-title">{winInfo.title}({winId})</div>
    </div>
  )
}

export default JustDraggableTitle
