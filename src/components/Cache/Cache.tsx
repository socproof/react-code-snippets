import {Suspense, useEffect, useRef, useState} from "react";
import {fetchPokemon} from "../../api/api";

interface Pokemon {
  name: string;
}

export const Cache = () => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [info, setInfo] = useState<Pokemon>();
  const cache = useRef<any>();

  useEffect( () => {
    if(cache.current?.[pokemonName]) {
      setInfo(cache.current[pokemonName])
    } else {
      fetchPokemon(pokemonName).then((pokemon) => cache.current[pokemonName] = pokemon);
    }
  }, [pokemonName]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPokemonName(e.target.elements.pokemonName.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="pokemonName"/>
      </form>
      {
        info ? (
          <Suspense fallback={<div>Loading...</div>}>
            <pre>{JSON.stringify(info)}</pre>
          </Suspense>
        ) : null
      }
    </div>

  );
}

