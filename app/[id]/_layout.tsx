import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function PokemonTabs() {
  return <Tabs screenOptions={{
     animation: "none",
     headerShown: false,
     tabBarShowLabel: false, // 🔥 removes text & blue indicator
     tabBarActiveTintColor: "#111",   // selected icon color
     tabBarInactiveTintColor: "#888", // unselected icon color
     tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        marginHorizontal: 20,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: 'rgba(255,255,255,0.5)', // fallback for blur
        borderRadius: 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.75,
      },
      // React Navigation's icon wrapper is 28px tall by default; 30px icons get cropped.
      tabBarIconStyle: { width: 60, height: 36 },
    }}>
        <Tabs.Screen
            name="info"
            options={{
            tabBarIcon: ({ color, focused }) => (
                <View className="flex justify-center items-center gap-1">
                    <FontAwesome6
                    name="circle-info"
                    size={30}
                    color={color}
                    />
                    <Text>Info</Text>
                </View>
            ),
            }}
        />

        <Tabs.Screen
            name="moves"
            options={{
            tabBarIcon: ({ color, focused }) => (
                <View className="flex justify-center items-center gap-1">
                    <FontAwesome6
                    name="bolt-lightning"
                    size={30}
                    color={color}
                    />
                    <Text>Moves</Text>
                </View>
            ),
            }}
        />

        <Tabs.Screen
            name="locations"
            options={{
            tabBarIcon: ({ color, focused }) => (
                <View className="flex justify-center items-center gap-1">
                    <FontAwesome6
                    name="location-dot"
                    size={30}
                    color={color}
                    />
                    <Text>Catch</Text>
                </View>
            ),
            }}
        />

        <Tabs.Screen
            name="evolutions"
            options={{
            tabBarIcon: ({ color, focused }) => (
                <View className="flex justify-center items-center gap-1">
                    <FontAwesome6
                    name="angles-up"
                    size={30}
                    color={color}
                    />
                    <Text>Evolution</Text>
                </View>
            ),
            }}
        />
    </Tabs>;
}
