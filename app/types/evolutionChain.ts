
export interface Evolution {
    id: number;
    name: string;
    sprite: string | null;
    evolvesTo: string;
    evolvesToId: number;
    evolvesToSprite: string | null;
    minLevel: number | null;
    trigger: string | null;
    item: string | null;
  };
  

// Define Pokemon Type
export interface EvolutionChain {
    evolutions: Evolution[]
}