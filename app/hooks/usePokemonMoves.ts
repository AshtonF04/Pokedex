import { useEffect, useState } from "react"
import { PokemonMove } from "../types/pokemonMove"

export const usePokemonMoves = (id: any) => {
    const [moves, setMoves] = useState<PokemonMove[]>([])

    useEffect(() => {
        const fetchPokemonMoves = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await response.json()

            const movesData = await Promise.all(
                data.moves.map(async (move: any) => {
                    // Extract move name and url
                    const name = move.move.name
                    const url = move.move.url
                    
                    // Fetch detailed move information from API
                    const response = await fetch(url)
                    const data = await response.json()

                    // If the move's version_group_details does not contain firered-leafgreen, skip this move
                    const hasFireRedLeafGreen = move.version_group_details.some(
                        (d: any) => d.version_group.name === "firered-leafgreen"
                    );
                    if (!hasFireRedLeafGreen) {
                        return null;
                    }

                    // Extract needed info from data
                    const accuracy = data.accuracy
                    const power = data.power
                    const type = data.type.name
                    const pp = data.pp

                    const rawFlavor = data.flavor_text_entries[0].flavor_text ?? ""
                    const rawEffect = data.effect_entries[1]?.effect ?? ""
                    
                    const flavor_text = rawFlavor.replace(/[\n\f]+/g, " ").trim()
                    const effect_text = rawEffect.replace(/[\n\f]+/g, " ").trim()

                    let learn_method = "";
                    let learn_level = null;
                    const versionDetail = move.version_group_details.find(
                        (d: any) => d.version_group.name === "firered-leafgreen"
                    );
                    if (versionDetail) {
                        learn_method = versionDetail.move_learn_method.name;
                        learn_level = versionDetail.level_learned_at;
                    }

                    const moveObj: PokemonMove = {name, type, power, accuracy, pp, flavor_text, effect_text, learn_method, learn_level}
                    return moveObj
                })
            )

            // remove nulls
            const filteredMoves = movesData.filter(
                (m): m is PokemonMove => m !== null
            )
            // Sort moves by learn_method: "level-up" first, then "machine", then "tutor"
            // Within "level-up", sort by learn_level ascending
            const learnMethodPriority = (method: string) => {
                if (method === "level-up") return 0;
                if (method === "machine") return 1;
                if (method === "tutor") return 2;
                return 3;
            };

            filteredMoves.sort((a, b) => {
                const methodDiff = learnMethodPriority(a.learn_method) - learnMethodPriority(b.learn_method);
                if (methodDiff !== 0) return methodDiff;
                if (a.learn_method === "level-up" && b.learn_method === "level-up") {
                    // Sort by learn_level, treating null as higher than any number
                    if (a.learn_level === null && b.learn_level !== null) return 1;
                    if (a.learn_level !== null && b.learn_level === null) return -1;
                    if (a.learn_level !== null && b.learn_level !== null) {
                        return a.learn_level - b.learn_level;
                    }
                }
                // Otherwise, keep original order
                return 0;
            });
            setMoves(filteredMoves)
        }
        fetchPokemonMoves()
    }, [])

    return moves
}