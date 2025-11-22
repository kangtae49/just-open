import * as React from "react";
import {type DropTargetMonitor, useDrop} from "react-dnd";
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
    dispatch(
      justLayoutActions.moveWin({
        branch: justBranch,
        winId: item.winId,
        direction: item.direction,
        pos: 'stack',
        index: item.index
      })
    )
  }

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
