import { generateFeedback } from "@/scripts/feedBack";
import { Text, YStack, XStack, Button, H1, Card, ScrollView } from "tamagui";
import InputField from "@/components/InputField";
import { useState, useEffect } from 'react';
import { getObjectData } from "@/scripts/store";
import { ImageBackground, ActivityIndicator } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Feedback() {
    const [newHeight, setNewHeight] = useState<string>("");
    const [newWeight, setNewWeight] = useState<string>("");

    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [goal, setGoal] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true)

    const [feedback, setFeedback] = useState<string>("")

    useEffect(() => {
        const getPlans = async () => {
            const u_data = await getObjectData("u_data")
            setHeight(u_data.height)
            setWeight(u_data.weight)
            setGoal(u_data.goal)
            console.log("loaded")
            setLoading(false)
        }
        getPlans()
    }, [])

    return (
        <ImageBackground
            source={require('@/assets/images/gradient.png')} // Your background image
            style={{ flex: 1, padding: 20 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 80, flexGrow: 1, paddingTop: 0 }}
                >
                    <YStack
                        flex={1}
                        justifyContent='center'
                        alignSelf='center'
                    >
                        <H1 color="white" marginBottom="$4">Get FeedBack</H1>
                        {loading ? (
                            <YStack alignItems="center" justifyContent="center" flex={1}>
                                <ActivityIndicator size="large" color="#blue8Dark" />
                                <Text color="white">Loading...</Text>
                            </YStack>
                        ) : (
                            <YStack gap="$2">
                                <XStack alignItems="center" space="$4">
                                    <Text color="white">Height (in cm):</Text>
                                    <InputField store={newHeight} update={setNewHeight} placeholder="Your Height (in cm)" />
                                </XStack>
                                <XStack alignItems="center" space="$4">
                                    <Text color="white">Weight (in kg):</Text>
                                    <InputField store={newWeight} update={setNewWeight} placeholder="Your Weight (in kg)" />
                                </XStack>
                                <Button
                                    onPress={async () => {
                                        setLoading(true)
                                        if (!goal || !height || !weight) {
                                            alert('Please fill in all fields.');
                                            return;
                                        }
                                        const feedbackAI = await generateFeedback({
                                            previous: {
                                                height: parseInt(height),
                                                weight: parseInt(weight)
                                            },
                                            current: {
                                                height: parseInt(newHeight),
                                                weight: parseInt(newWeight),
                                                goal: goal
                                            }
                                        })
                                        setFeedback(feedbackAI)
                                        setLoading(false)
                                    }}
                                    backgroundColor={"#303030"}
                                    marginTop="$4"
                                    color={"white"}
                                    width={180}
                                    borderRadius={"$10"}
                                >
                                    Get FeedBack Now!
                                </Button>
                                {
                                    feedback ? (
                                        <Card padded>
                                            <Card.Header>
                                                <H1>AI FeedBack</H1>
                                            </Card.Header>
                                            <Markdown>{feedback}</Markdown>
                                        </Card>
                                    ) : (
                                        <Text></Text>
                                    )
                                }
                            </YStack>
                        )}
                    </YStack>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}