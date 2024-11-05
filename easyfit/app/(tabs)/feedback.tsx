import { generateFeedback } from "@/scripts/feedBack";
import { Text, YStack, XStack, Button, H1, Card, ScrollView, H6 } from "tamagui";
import InputField from "@/components/InputField";
import { useState, useEffect } from 'react';
import { getObjectData, storeObject } from "@/scripts/store"; // assuming you have a setObjectData function
import { ImageBackground, ActivityIndicator } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from "@/firebaseConfig"; // Assuming you have a config file for Firebase

export default function Feedback() {
    const [newHeight, setNewHeight] = useState<string>("");
    const [newWeight, setNewWeight] = useState<string>("");

    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [goal, setGoal] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);
    const [feedback, setFeedback] = useState<string>("");

    useEffect(() => {
        const getPlans = async () => {
            const u_data = await getObjectData("u_data");
            setHeight(u_data.height);
            setWeight(u_data.weight);
            setGoal(u_data.goal);
            console.log("loaded");
            setLoading(false);
        };
        getPlans();
    }, []);

    const handleFeedbackSubmit = async () => {
        setLoading(true);
        if (!goal || !height || !weight || !newHeight || !newWeight) {
            alert('Please fill in all fields.');
            setLoading(false);
            return;
        }

        try {
            // Generate feedback
            const feedbackAI = await generateFeedback({
                previous: {
                    height: parseInt(height),
                    weight: parseInt(weight),
                },
                current: {
                    height: parseInt(newHeight),
                    weight: parseInt(newWeight),
                    goal: goal,
                },
            });
            setFeedback(feedbackAI);

            // Update local cache
            const u_data = await getObjectData("u_data");
            const updatedUserData = {
                ...u_data,
                height: newHeight,
                weight: newWeight,
            };
            await storeObject(updatedUserData, "u_data");

            // Add snapshot to Firestore
            const u_id = u_data.u_name;
            await addDoc(collection(db, "fitness_snapshot"), {
                height: parseInt(newHeight),
                weight: parseInt(newWeight),
                u_id: u_id,
                time: serverTimestamp(),
            });

            // Update user document in Firestore (if you have a separate user document)
            const userDocRef = doc(db, "user_data", u_id); // Assumes user data is stored in "users" collection
            await updateDoc(userDocRef, {
                height: parseInt(newHeight),
                weight: parseInt(newWeight),
            });

            console.log("Cache and Firestore successfully updated!");
        } catch (error) {
            console.error("Error updating cache or Firestore: ", error);
        }

        setLoading(false);
    };

    return (
        <ImageBackground
            source={require('@/assets/images/gradient.png')}
            style={{ flex: 1, padding: 20 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 80, flexGrow: 1, paddingTop: 0 }}
                >
                    <YStack
                        flex={1}
                        justifyContent='center'
                        alignSelf='center'
                    >
                        <H1 color="white" marginBottom="$4">Get Feedback</H1>
                        <H6 alignSelf='center' color={'white'} textAlign='center' margin={"$3"}>
                            AI Feedback based on your progress!
                        </H6>
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
                                    onPress={handleFeedbackSubmit}
                                    backgroundColor={"$red9Dark"}
                                    marginTop="$4"
                                    color={"white"}
                                    width={180}
                                    borderRadius={"$10"}
                                    fontWeight={800}
                                >
                                    Get Feedback Now!
                                </Button>
                                {feedback && (
                                    <Card padded>
                                        <Card.Header>
                                            <H1>AI Feedback</H1>
                                        </Card.Header>
                                        <Markdown>{feedback}</Markdown>
                                    </Card>
                                )}
                            </YStack>
                        )}
                    </YStack>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}
