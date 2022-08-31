import {useAsync} from "../../api/hooks";

const myFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10;
      rnd < 6
      ? resolve('Submitted successfully 🙌')
      : reject('there was an error 😞');
    }, 1000);
  });
}

export const AsyncCall = () => {
  const { execute, status, value, error } = useAsync(myFunction);

  return (
    <div>
      {status === 'idle' && <span>Click the button</span>}
      {status === 'success' && <span>{value}</span>}
      {status === 'error' && <span>{error?.message}</span>}
      <br/>
      <button onClick={execute} disabled={status === 'pending'}>
        {status !== 'pending' ?  'Click me' : 'Loading...'}
      </button>
    </div>
  )
}
