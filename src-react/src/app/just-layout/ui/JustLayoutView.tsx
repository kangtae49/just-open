import "./JustLayoutView.css"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useAppDispatch, useDynamicSlice} from "@/store/hooks.ts";
import JustWinView from "./JustWinView.tsx";
import {createJustLayoutSlice, type JustLayoutState} from "../justLayoutSlice.ts";
import useOnload from "@/hooks/useOnload.ts";

interface Props {

}

export function JustLayoutView({}: Props) {
  const layoutId = "just-layout"
  const {onLoad} = useOnload();
  const {
    // state: justLayoutState,
    actions: justLayoutActions
  } = useDynamicSlice<JustLayoutState>(layoutId, createJustLayoutSlice)
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
