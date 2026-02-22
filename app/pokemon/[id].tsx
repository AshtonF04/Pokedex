import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { POKEMON_TYPE_COLORS } from '../constants/pokemonTypeColors'
import { usePokemonDetails } from '../hooks/usePokemonDetails'

import { capitalizeFirstLetter } from '../utils/stringUtils'

export default function PokemonDetails() {
    // Access pokemon dex number from route parameters
    const { id } = useLocalSearchParams()

    // Fetch pokemon details
    const pokemon = usePokemonDetails(id)


    // Modify navigation options to set header title dynamically
    const navigation = useNavigation()
    useEffect(() => {
        if (pokemon === undefined) return
        navigation.setOptions({
            title: ``
        })
    }, [pokemon])

    // Component JSX
    if (pokemon === undefined) return <Text>Loading</Text>
    return (
        <View className="flex-1 p-4 items-center">
            {/* Header Section */}
            <Text className="font-bold text-3xl">{pokemon.name}</Text>
            <Text className="text-lg font-light">{pokemon.dexNumber.toString().padStart(3, '0')}</Text>

            {/* Images */}
            <View className="flex-row">
                <Image source={{uri: pokemon.frontSpriteURL}} style={{width: 175, height: 175}}></Image>
                <Image source={{uri: pokemon.backSpriteURL}} style={{width: 175, height: 175}}></Image>
            </View>

            {/* Types Display */}
            <View className="flex-row gap-5 mt-8">
                {pokemon.types.map((type) => (
                    <Text 
                    key={type.name}
                    className="w-40 p-2 text-center rounded-full shadow-sm elevation-sm text-white font-bold"
                    style={{backgroundColor: POKEMON_TYPE_COLORS[type.name]}}
                    >
                        {capitalizeFirstLetter(type.name)}
                    </Text>
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
                                    className="h-3 bg-red-600 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                    />
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})