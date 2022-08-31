import {useEffect, useState} from "react";
import {useIsMounted} from "../api/hooks";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Child = () => {
  const [data, setData] = useState('loading');
  const isMounted = useIsMounted();

  useEffect(() => {
    void delay(3000).then(() => {
      if(isMounted()) {
        setData('OK');
      }
    })
  }, [isMounted]);
  return <p>{data}</p>
}

export const MountedComponent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(state => !state);

  return (
    <>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>
      {isVisible && <Child />}
    </>
  )
}
