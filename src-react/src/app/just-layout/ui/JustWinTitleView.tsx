import * as React from "react";
import {type DragSourceMonitor, useDrag} from "react-dnd";
// import {type CSSProperties, useMemo, useState} from "react";
import classnames from 'classnames';

// const style: CSSProperties = {
//   border: '1px dashed gray',
//   padding: '0.5rem',
//   margin: '0.5rem',
// }

interface Prop {
  winId: string
}

function JustWinTitleView({}: Prop) {
  // const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'DRAG-SOURCE-JUST-TITLE',
      canDrag: true,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
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
      className={classnames("just-win-title", {"dragging": isDragging})}
      ref={drag as unknown as React.Ref<HTMLDivElement>}
    >
      TabWinTitleView
    </div>
  )
}

export default JustWinTitleView
