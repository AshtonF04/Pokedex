import { useGlobalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { POKEMON_TYPE_COLORS } from '../constants/pokemonTypeColors'
import { TYPE_ICONS } from '../constants/pokemonTypeIcons'
import { usePokemonMoves } from '../hooks/usePokemonMoves'
import { capitalizeWords } from '../utils/stringUtils'

export default function moves() {
  const { id } = useGlobalSearchParams()

  const moves = usePokemonMoves(id)
  
  return (
    <ScrollView contentContainerClassName='flex items-center gap-4 m-4 pb-32'>
      {moves.map((move) => {
        return (
          <View className="w-full rounded p-4 flex gap-2" style={{backgroundColor: POKEMON_TYPE_COLORS[move.type]}} key={move.name}>
            <View className="flex-row items-center justify-between">
              {move.learn_method == "level-up" ? (
                <Text className='font-bold text-xl'>{capitalizeWords(move.name)} | Level {move.learn_level}</Text>
              ) : (
                <Text className='font-bold text-xl'>{capitalizeWords(move.name)} | {capitalizeWords(move.learn_method)}</Text>
              )}
              
              <Image source={TYPE_ICONS[move.type]} style={{width: 25, height: 25}}></Image>
            </View>

            {move.power ? (
              <Text>{move.flavor_text}</Text>
            ) : (
              <Text>{move.effect_text}</Text>
            )}

            <View className="flex-row justify-start gap-8">
              {move.power && (
                <>
                  <Text className="font-bold">Power: {move.power}</Text>
                  <Text className="font-bold">Accuracy: {move.accuracy}</Text>
                </>
              )}

              <Text className="font-bold">PP: {move.pp}</Text>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}