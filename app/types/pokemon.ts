import { PokemonType } from "./pokemonType";

// Define Pokemon Type
export interface Pokemon {
    name: string;
    url: string;
    imageURL: string;
    types: PokemonType[];
    dexNumber: number
}