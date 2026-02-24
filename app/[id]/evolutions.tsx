import { FontAwesome6 } from '@expo/vector-icons'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { usePokemonEvolutions } from '../hooks/usePokemonEvolutions'

import { capitalizeWords } from '../utils/stringUtils'

const Evolutions = () => {
  const { id } = useGlobalSearchParams()
  const router = useRouter()
  const pokemonId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined

  const { evolutions, loading } = usePokemonEvolutions(pokemonId)

  if (loading) return <></>

  const goToPokemon = (pokemonId: number) => {
    router.replace(`/${pokemonId}/info`)
  }

  return (
    <View className="p-5 flex gap-5">
      {evolutions.map((evo, index) => (
        <View key={evo.evolvesTo}>
          {evo.trigger == "use-item" && (
            <Text className="font-bold text-xl">{capitalizeWords(evo.item!)}</Text>
          )}
          {evo.trigger == "level-up" && (
            <Text className="font-bold text-xl">Level {evo.minLevel}</Text>
          )}
          {evo.trigger == "trade" && (
            <Text className="font-bold text-xl">Trade</Text>
          )}
          <View className="flex-row bg-gray-200 items-center justify-center rounded-lg" key={evo.evolvesTo}>
            <Pressable onPress={() => goToPokemon(evo.id)}>
              <Image source={{uri: evo.sprite!}} style={{width: 150, height: 150}} />
            </Pressable>
            <FontAwesome6 name="arrow-right" size={30} />
            <Pressable onPress={() => goToPokemon(evo.evolvesToId)}>
              <Image source={{uri: evo.evolvesToSprite!}} style={{width: 150, height: 150}} />
            </Pressable>
          </View>  
        </View>
      ))}
    </View>
  )
}

export default Evolutions
