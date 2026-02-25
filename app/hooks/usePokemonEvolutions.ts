import { useEffect, useState } from "react";
import { Evolution } from "../types/evolutionChain";

export function usePokemonEvolutions(pokemonId: number | string | undefined) {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchEvolutions = async () => {
      try {
        setLoading(true);

        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        const speciesData = await speciesRes.json();

        const chainRes = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainRes.json();

        const results: Evolution[] = [];

        async function getSpriteAndId(name: string) {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const data = await res.json();
          return {
            sprite: data.sprites.front_default,
            id: data.id as number,
          };
        }

        async function traverse(node: any) {
          const fromName = node.species.name;

          for (const evo of node.evolves_to) {
            const details = evo.evolution_details[0] || {};

            // Fetch sprites and ids for both pokemon
            const [fromData, toData] = await Promise.all([
              getSpriteAndId(fromName),
              getSpriteAndId(evo.species.name),
            ]);

            // Only add to results if it is a kanto pokemon
            if (toData.id <= 151 && fromData.id <= 151){
              results.push({
                id: fromData.id,
                name: fromName,
                sprite: fromData.sprite,
                evolvesTo: evo.species.name,
                evolvesToId: toData.id,
                evolvesToSprite: toData.sprite,
                minLevel: details.min_level ?? null,
                trigger: details.trigger?.name ?? null,
                item: details.item?.name ?? null,
              });
            }

            await traverse(evo);
          }
        }

        await traverse(chainData.chain);

        console.log(results)

        setEvolutions(results);
      } catch (error) {
        console.error("Failed to fetch evolutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutions();
  }, [pokemonId]);

  return { evolutions, loading };
}
