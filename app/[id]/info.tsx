import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getDefensiveMatchups } from '../constants/pokemonTypeChart'
import { POKEMON_TYPE_COLORS } from '../constants/pokemonTypeColors'
import { TYPE_ICONS } from '../constants/pokemonTypeIcons'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { capitalizeFirstLetter, capitalizeWords } from '../utils/stringUtils'

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
  

export default function PokemonDetails() {
    // Access pokemon dex number from route parameters
    const { id } = useLocalSearchParams()

    // Fetch pokemon details
    const pokemon = usePokemonDetails(id)

    // Component JSX
    if (pokemon === undefined) return <Text>Loading</Text>
    return (
        <>
        <ScrollView className="p-4 " contentContainerClassName='pb-32'>
            {/* Header Section */}
            <Text className="font-bold text-3xl text-center">{capitalizeWords(pokemon.name)}</Text>
            <Text className="text-lg font-light text-center">{pokemon.dexNumber.toString().padStart(3, '0')}</Text>

            {/* Images */}
            <View className="flex-row items-center justify-center">
                <Image source={{uri: pokemon.frontSpriteURL}} style={{width: 175, height: 175}}></Image>
                <Image source={{uri: pokemon.backSpriteURL}} style={{width: 175, height: 175}}></Image>
            </View>
            
            {/* Types Display */}
            <View className="flex-row gap-5 mt-8 items-center justify-center">
                {pokemon.types.map((type) => (
                    <View key={type.name} className='flex-row items-center gap-2 w-40 p-2 rounded-full shadow-sm elevation-sm' style={{backgroundColor: POKEMON_TYPE_COLORS[type.name]}}>
                        <Image source={TYPE_ICONS[type.name]} style={{width: 15, height: 15}}></Image>
                        <Text 
                        className="text-center text-white font-bold"
                        >
                            {type.name.toUpperCase()}
                        </Text>
                    </View>

                ))}
            </View>

            {/* Stats Display */}
            <View className="w-full mt-8">
                <Text className="text-xl font-bold mb-4">Stats</Text>
                <View className="flex items-center gap-3">
                    {/* Load in stats from pokemon */}
                    {pokemon.stats.map((stat) => {
                        let percentage
                        if (stat.name == "TOT"){
                            percentage = (stat.baseStat / 780) * 100;
                        } else {
                            percentage = (stat.baseStat / 255) * 100;
                        }

                        return(
                            <View className="flex-row items-center" key={stat.name}>
                                <Text className="w-16 text-lg font-bold color-red-600">{capitalizeFirstLetter(stat.name)}</Text>
                                <Text className="w-10 text-lg">{stat.baseStat}</Text>
                                <View className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
                                    {/* Filled portion */}
                                    <View
                                    className="h-3 rounded-full"
                                    style={{ width: `${percentage}%`, backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].name]}}
                                    />
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>

            {/* Weaknesses & Resistances */}
            <View className="w-full mt-8">
            <Text className="text-xl font-bold mb-4">Type Matchups</Text>

            {(() => {
                const matchups = getDefensiveMatchups(pokemon.types.map(t => t.name));

                return (
                <View className="flex gap-4 w-full">
                    {[4, 2, 0.5, 0.25, 0].map(multiplier => {
                    const types = matchups[multiplier];
                    if (types.length === 0) return null;

                    let label = '';
                    if (multiplier === 4) label = '4×';
                    else if (multiplier === 2) label = '2×';
                    else if (multiplier === 0.5) label = '½×';
                    else if (multiplier === 0.25) label = '¼×';
                    else if (multiplier === 0) label = '0×';

                    let labelColor = "#222"; // default black for 0
                    if (multiplier > 1) {
                        labelColor = "#9CCF8A"; // green for weakness
                    } else if (multiplier < 1 && multiplier > 0) {
                        labelColor = "#F87171"; // red for resistance
                    } else if (multiplier === 0) {
                        labelColor = "#222"; // solid black/very dark for immunity
                    }

                    return (
                        <View key={multiplier} className="flex-row flex-wrap items-center gap-3">
                            <View className="bg-gray-200 w-10 h-10 rounded-full flex-row justify-center items-center mr-4">
                                <Text className="font-bold" style={{ color: labelColor }}>{label}</Text>
                            </View> 
                            {types.map(type => (
                                <View
                                key={type}
                                className="flex-row items-center gap-1 px-2 py-2 rounded-full"
                                style={{ backgroundColor: POKEMON_TYPE_COLORS[type] }}
                                >
                                <Image source={TYPE_ICONS[type]} style={{ width: 20, height: 20 }} />
                                </View>
                            ))}
                        </View>
                    );
                    })}
                </View>
                );
            })()}
            </View>


            {/* Abilities Display */}
            <View className="flex-1 gap-4 w-full mt-8">
                <Text className="font-bold text-xl">Abilities</Text>
                {pokemon.abilities.map((ability) => {
                    if (!ability.isHidden){
                        return (
                        <View className="bg-gray-200 rounded w-full p-4 flex gap-1" style={[shadowMdStyle]} key={ability.name}>
                            <Text className="font-bold text-lg">{capitalizeFirstLetter(ability.name)}</Text>
                            <Text>{ability.effect}</Text>
                        </View>
                        )
                    } else {
                        return (
                        <View className="bg-gray-200 rounded w-full p-4 flex gap-1" style={[shadowMdStyle]} key={ability.name}>
                            <View className="flex-row items-center justify-between">
                                <Text className="font-bold text-lg">{capitalizeFirstLetter(ability.name)}</Text>
                                <Text className="font-bold text-yellow-500">⭐</Text>
                            </View>
                            <Text>{ability.effect}</Text>
                        </View>
                        )
                    }
                })}
            </View>
        </ScrollView>
        {/* Menu Bar */}

        </>
    )
}

const styles = StyleSheet.create({})