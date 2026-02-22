import { PokemonAbility } from "./pokemonAbility";
import { PokemonStat } from "./pokemonStat";
import { PokemonType } from "./pokemonType";


// Define type Type
export interface PokemonDetails {
    name: string,
    frontSpriteURL: string,
    backSpriteURL: string,
    types: PokemonType[],
    dexNumber: string,
    stats: PokemonStat[],
    abilities: PokemonAbility[]
}