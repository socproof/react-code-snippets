import {useState} from "react";
import {usePrevious} from "../../api/hooks";

export const PreviousCall = () => {
  const [count, setCount] = useState<number>(0);
  const prevCount = usePrevious<number>(count);

  return (
    <div>
      <h1>Now: {count}, before: {prevCount}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
