import * as React from "react";
import {createRef, useEffect} from "react";
import type {JustBranch, JustDirection} from "@/app/just-layout/justLayoutSlice.ts";
import classNames from "classnames";

interface Props {
  direction: JustDirection
  justBranch: JustBranch
  onChange?: (splitPercentage: number) => void;
  onRelease?: (splitPercentage: number) => void;
}

function JustSplit({ onRelease }: Props) {
  const refSplit = createRef<HTMLDivElement>();
  const [listenersBound, setListenersBound] = React.useState(false);

  const bindListeners = () => {
    if (!listenersBound) {
      refSplit.current!.ownerDocument!.addEventListener('mousemove', onMouseMove, true);
      refSplit.current!.ownerDocument!.addEventListener('mouseup', onMouseUp, true);
      setListenersBound(true)
    }
  }

  const unbindListeners = () => {
    if (refSplit.current) {
      refSplit.current.ownerDocument!.removeEventListener('mousemove', onMouseMove, true);
      refSplit.current.ownerDocument!.removeEventListener('mouseup', onMouseUp, true);
      setListenersBound(false);
    }
  }
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    bindListeners();
  };

  const onMouseUp = (event: MouseEvent) => {
    console.log("onMouseUp", event)
    unbindListeners();
    // const percentage = calculateRelativePercentage(event);
    const percentage = 25;
    onRelease!(percentage);
  };

  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();

    // throttledUpdatePercentage(event);
  };

  useEffect(() => {

  })

  return (
    <div
      ref={refSplit}
      className={classNames("just-splitter")}
      onMouseDown={onMouseDown}
    />
  )
}

export default JustSplit