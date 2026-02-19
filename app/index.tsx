import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from "react-native";

// Define Pokemon Type
interface Pokemon {
  name: string;
  imageURL: string;
}

export default function Index() {

  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  // Fetch Pokemon from API on mount
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = (await response.json()).results;

      // Fetch details for each pokemon
      const detailedPokemon = await Promise.all(
        data.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            name: pokemon.name,
            imageURL: details.sprites.front_default,
          };
        })
      );

      setPokemon(detailedPokemon)
    }
    fetchPokemon();
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        {pokemon.map((pokemon) => (
          <View key={pokemon.name}>
            <Text>{pokemon.name}</Text>
            <Image
              source={{uri: pokemon.imageURL}}
              style={{width: 150, height:150}}
            ></Image>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
