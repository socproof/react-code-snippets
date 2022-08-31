import {useCallback, useState} from "react";
import {useEventListener} from "../../api/hooks";

export const MousePosition = () => {
  const [coords, setCoords] = useState({x: 0, y: 0});

  const handler = useCallback(({clientX: x, clientY: y}: { clientX: number, clientY: number }) => {
    setCoords({x, y})
  }, [coords]);

  useEventListener('mousemove', handler);

  return (
    <div>
      The mouse position is ({coords.x}, {coords.y})
    </div>
  )
}
