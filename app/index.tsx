// Import hooks
import { usePokemon } from './hooks/usePokemon';

// Import react native components
import { FlatList, Text, View } from "react-native";

// Import custom components
import PokemonCard from './components/PokemonCard';

export default function Index() {

  // Fetch pokemon from API
  const pokemon = usePokemon();

  return (
    <View className="flex-1 justify-center items-center px-4 mt-20">
      {/* Header section */}
      <View className="w-full flex p-4 gap-2">
        <Text className="font-bold text-4xl">Pokedex</Text>
        <Text>View a list of all pokemon below ordered by regional dex number.</Text>
      </View>

      {/* Scroll View to contain all pokemon */}
      <FlatList
        className="w-full"
        data={pokemon}
        keyExtractor={(item) => item.dexNumber.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}
      />

    </View>
  );
}
