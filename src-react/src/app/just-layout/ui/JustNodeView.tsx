import type {JustBranch, JustNode} from "@/app/just-layout/justLayoutSlice.ts";
import JustWinView from "@/app/just-layout/ui/JustWinView.tsx";
import classNames from "classnames";
import * as React from "react";

interface Props {
  justBranch: JustBranch
  node: JustNode | null
}

export const JustNodeView: React.FC<Props> = ({ node, justBranch }) => {
  if (node?.type === 'stack') {
    return (
      <JustWinView justStack={node} justBranch={justBranch} />
    );
  }

  if (node?.type === 'split') {
    const splitPercentage = node.splitPercentage ?? 50;

    return (
      <div className={classNames(
        {
          "just-column": node.direction === 'column',
          "just-row": node.direction === 'row'
        }
      )}>
        <div
          className="just-first"
          style={{
            flexBasis: `calc(${splitPercentage}% - 2px)`,
            flexGrow: 0,
            flexShrink: 0,
          }}
        >
          <JustNodeView node={node.first} justBranch={[...justBranch, "first"]} />
        </div>
        <div className={classNames("just-splitter")}>
        </div>
        <div className="just-second">
          <JustNodeView node={node.second} justBranch={[...justBranch, "second"]} />
        </div>
      </div>
    );
  }

  return null;
};