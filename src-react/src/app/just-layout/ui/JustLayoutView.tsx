import "./JustLayoutView.css"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useAppDispatch, useDynamicSlice} from "@/store/hooks.ts";
import {createJustLayoutSlice, type JustLayoutActions, type JustLayoutState} from "../justLayoutSlice.ts";
import useOnload from "@/hooks/useOnload.ts";
import {JustNodeView} from "@/app/just-layout/ui/JustNodeView.tsx";

interface Props {

}

export function JustLayoutView({}: Props) {
  const layoutId = "just-layout"
  const {onLoad} = useOnload();
  const {
    state: justLayoutState,
    actions: justLayoutActions
  } = useDynamicSlice<JustLayoutState, JustLayoutActions>(layoutId, createJustLayoutSlice)
  const dispatch = useAppDispatch();
  onLoad(() => {
    dispatch(justLayoutActions.insertNode({ branch: [], winId: "winId01" }))
    dispatch(justLayoutActions.removeNode({ branch: [], winId: "winId01" }))
    dispatch(justLayoutActions.insertNode({ branch: [], winId: "winId01" }))
    dispatch(justLayoutActions.insertNode({ branch: [], winId: "winId02" }))
    dispatch(justLayoutActions.insertNode({ branch: [], winId: "winId03" }))

  })
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="just-layout">
        {justLayoutState && <JustNodeView node={justLayoutState.layout} justBranch={[]} />}
      </div>
    </DndProvider>
  )
}

export default JustLayoutView
