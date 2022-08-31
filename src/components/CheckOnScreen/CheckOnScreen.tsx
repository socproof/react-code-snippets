import {useRef} from "react";
import {useOnScreen} from "../../api/hooks";

export const CheckOnScreen = () => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
  const onScreen = useOnScreen<HTMLDivElement>(ref, '-300px');

  return (
    <div>
      <div style={{height: '100vh'}}>
        <h1>Scroll down</h1>
      </div>
      <div ref={ref} style={{height: "100vh", backgroundColor: onScreen ? "#23cebd" : "#efefef"}}>
        {onScreen
          ? <div>
              <h1>Hey I'm on the screen</h1>
              <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif"/>
            </div>
          : <h1>Scroll down 300px from the top of this section 👇</h1>}
      </div>
    </div>
  );
}
