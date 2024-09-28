import { H1, XStack, Button, YStack, H3, Text} from "tamagui";
import { ImageBackground } from "react-native";
import { router } from "expo-router";

const image = { uri: "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}

export default function Greeting() {
    return (
        <ImageBackground 
            source={{uri: 'https://images.unsplash.com/photo-1517963628607-235ccdd5476c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
            style={{ flex: 1,
                width: null,
                height: null,
        }}>
            <YStack padding="$5" position="absolute" bottom={"$11"} gap="$3">
                <H1 color={"white"}>FITBITS</H1>
                <H3 width={280} color={"$white075"}>Your encouraging space to get fit.</H3>
                <XStack gap="$2">
                    <Button variant="outlined" borderRadius={"$8"} onPress={() => {router.push("/login")}}>
                        <Text color={"$black12"}>Login</Text>
                    </Button>
                    <Button variant="outlined" borderRadius={"$8"} onPress={() => {router.push("/register")}}>
                        <Text color={"$black12"}>Register</Text>
                    </Button>
                </XStack>
            </YStack>
        </ImageBackground >
    )
}