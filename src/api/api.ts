import {Item} from "../models/item";
import items from './items';

export const fetchData = () => new Promise<Item[]>(resolve => {
  setTimeout(resolve, 100, items);
});

export const searchCharacters = (search: string) => {
  const apiKey = "f9dfb1e8d466d36c27850bedd2047687";

  return fetch(`https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then(({data}) => data.res)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export const fetchPokemon = (name: string) => {
  const pokemonQuery = `
      query ($name: String) {
        pokemon(name: $name) {
          id
          number
          name
          attacks {
            special {
              name
              type
              damage
            }
          }
        }
      }
    `;
  return fetch('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: {name},
    }),
  })
    .then(r => r.json())
    .then(response => response.data.pokemon);
}
