import JustWinTitleView from "@/app/just-layout/ui/JustWinTitleView.tsx";
import JustWinBodyView from "@/app/just-layout/ui/JustWinBodyView.tsx";

interface Prop {
  winId: string
}

function JustWinView ({winId}: Prop) {
  return (
    <div className="just-win">
      <JustWinTitleView winId={winId} />
      <JustWinBodyView  winId={winId} />
    </div>
  )
}

export default JustWinView
