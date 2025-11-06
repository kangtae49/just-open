import "./JustLayoutView.css"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useAppDispatch} from "@/app/hooks.ts";
import JustWinView from "./JustWinView.tsx";
// import {useJustLayout} from "@/app/just-layout/justLayoutSelectors.ts";
// import {useEffect} from "react";
import {justLayoutActions} from "../justLayoutSlice.ts";
import useOnload from "@/hooks/useOnload.ts";

interface Props {

}

export function JustLayoutView({}: Props) {
  const {onLoad} = useOnload();
  // const justLayoutState = useJustLayout()
  const dispatch = useAppDispatch();
  onLoad(() => {
    dispatch(justLayoutActions.insertNode({ branch: null, winId: "winId01" }))
    dispatch(justLayoutActions.removeNode({ branch: null, winId: "winId01" }))
    dispatch(justLayoutActions.insertNode({ branch: null, winId: "winId01" }))
    dispatch(justLayoutActions.insertNode({ branch: null, winId: "winId02" }))
    dispatch(justLayoutActions.insertNode({ branch: null, winId: "winId03" }))

  })
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="just-layout">
        <JustWinView winId={""} />
        <JustWinView winId={""} />
      </div>
    </DndProvider>
  )
}

export default JustLayoutView
