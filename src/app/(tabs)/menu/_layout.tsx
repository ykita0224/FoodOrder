import { Stack } from "expo-router";

// look at react navigation
export default function MenuStack () {
    return <Stack>
        <Stack.Screen name = "index" options={{title : 'Menu'}}/>
    </Stack>
}