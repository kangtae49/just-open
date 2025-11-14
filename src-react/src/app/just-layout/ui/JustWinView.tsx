import JustWinTitleView from "@/app/just-layout/ui/JustWinTitleView.tsx";
import JustWinBodyView from "@/app/just-layout/ui/JustWinBodyView.tsx";
import type {JustBranch, JustStack} from "@/app/just-layout/justLayoutSlice.ts";

interface Prop {
  justBranch: JustBranch
  justStack: JustStack
}

function JustWinView ({justStack}: Prop) {
  return (
    <div className="just-win">
      <JustWinTitleView justStack={justStack} />
      <JustWinBodyView  winId={justStack.active} />
    </div>
  )
}

export default JustWinView
