import {FormEvent, useEffect, useState} from "react";
import {useDebounce} from "../../api/hooks";
import {searchCharacters} from "../../api/api";

interface Item {
  id: string;
  title: string;
  thumbnail: {
    path: 'string',
    extension: 'string'
  }
}

export const Search = () => {
  const [term, setTerm] = useState<string>('');
  const [result, setResult] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedTerm = useDebounce<string>(term, 500);

  useEffect(() => {
      setResult([]);
      if(debouncedTerm) {
        setIsLoading(true);
        searchCharacters(debouncedTerm).then((result) => {
          setIsLoading(false);
          setResult(result);
        })
      }
  }, [debouncedTerm]);


  return (
    <>
      <input
        placeholder="search"
        // @ts-ignore
        onChange={(e: FormEvent<HTMLInputElement>) => setTerm(e.target.value)}
      />
      {isLoading && `Loading...`}

      {result.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <img src={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`} />
        </div>
      ))}
    </>
  );
}
