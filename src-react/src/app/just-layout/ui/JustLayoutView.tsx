import "./JustLayoutView.css"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function JustLayoutView() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="just-layout">
        JustLayoutView
      </div>
    </DndProvider>
  )
}

export default JustLayoutView
