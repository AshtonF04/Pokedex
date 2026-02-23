import { useEffect, useState } from "react";
import { Pokemon } from "../types/pokemon";

import { capitalizeFirstLetter } from '../utils/stringUtils';

export function usePokemon(){
    const [pokemon, setPokemon] = useState<Pokemon[]>([])

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = (await response.json()).results;
      
            // Fetch details for each pokemon
            const detailedPokemon = await Promise.all(
              data.map(async (pokemon: Pokemon) => {
                const res = await fetch(pokemon.url);
                const details = await res.json();

                let types = details.types.map((type: any) => {
                  return type.type
                })  
      
                return {
                  name: capitalizeFirstLetter(details.name),
                  imageURL: details.sprites.front_default,
                  types: types,
                  dexNumber: details.id
                };
              })
            );
      
            setPokemon(detailedPokemon)
          }
          fetchPokemon();
    }, [])

    return pokemon
}