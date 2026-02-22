import { Link } from "expo-router";
import { Image, Platform, Text, View } from "react-native";

// Import types
import { POKEMON_TYPE_COLORS } from "../constants/pokemonTypeColors";
import { Pokemon } from "../types/pokemon";

// Custom props type
interface PokemonCardProps {
    pokemon: Pokemon;
}

// shadow-md equivalent via inline style (avoids NativeWind shadow-* navigation-context bug)
const shadowMdStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.75,
  },
  android: { elevation: 4 },
  default: {},
});

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    const typeColor = POKEMON_TYPE_COLORS[pokemon.types[0]?.name] ?? "#777"

    return (
        <Link href={`../pokemon/${pokemon.dexNumber}`} className="m-2 w-5/12">
            <View className="rounded-md p-2 justify-center items-center w-full" style={[shadowMdStyle, { backgroundColor: typeColor }]}>
                <Image
                    source={{ uri: pokemon.imageURL }}
                    style={{ width: 120, height: 120 }}
                />
                <Text className="font-bold text-xl">{pokemon.name}</Text>
                <Text className="font-extralight">{pokemon.dexNumber.toString().padStart(3, '0')}</Text>
            </View>
        </Link>

    );
};


export default PokemonCard