import { useEffect, useState } from "react";
import { PokemonDetails } from "../types/pokemonDetails";

import { capitalizeFirstLetter } from '../utils/stringUtils';

const STAT_NAMES: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPE"
}

export function usePokemonDetails(id:any){
    const [pokemon, setPokemon] = useState<PokemonDetails>()

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await response.json()

            // Get Pokemon Types
            let types = data.types.map((type: any) => {
                return type.type
            })

            // Get Pokemon Stats
            let statTotal = 0
            let stats = data.stats.map((stat: any) => {
                const baseStat = stat.base_stat
                const name = STAT_NAMES[stat.stat.name]

                statTotal += baseStat

                return { baseStat, name }
            })
            stats.push({baseStat: statTotal, name: "TOT"})

            // Get Pokemon Abilities
            const abilities = await Promise.all(
                data.abilities.map(async (slot: any) => {
                    const { name, url } = slot.ability
                    const isHidden = slot.is_hidden
                    let effect = ""
                    try {
                        const res = await fetch(url)
                        const abilityData = await res.json()
                        const enEntry = abilityData.effect_entries?.find(
                            (e: any) => e.language?.name === "en"
                        )
                        effect = enEntry?.effect ?? ""
                    } catch {
                        effect = ""
                    }
                    return { name, effect, isHidden }
                })
            )
            
            const pokemon:PokemonDetails = {
                name: capitalizeFirstLetter(data.name),
                frontSpriteURL: data.sprites.front_default,
                backSpriteURL: data.sprites.back_default,
                types: types,
                dexNumber: id,
                stats: stats,
                abilities: abilities
            }

            setPokemon(pokemon)
        }
        fetchPokemon()
    }, [id])

    return pokemon
}