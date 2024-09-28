import { useState, useEffect } from "react";
import { SafeAreaView, Image } from "react-native";
import { YStack, H1, Card, SizableText, Text, XStack, Separator, H6 } from "tamagui";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 
import { ScrollView } from "tamagui";
import { ImageBackground } from "react-native";

export default function Page() {
    const [fitnessPlan, setFitnessPlan] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [goals, setGoals] = useState<string[]>([]);
    const { id } = useLocalSearchParams();

    const getFitnessPlan = async (collectionName, documentName) => {
        const docRef = doc(db, collectionName, documentName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    };

    useEffect(() => {
        const storeDocument = async () => {
            const data = await getFitnessPlan("posts", id);
            if (data !== null) {
                setFitnessPlan(data.content);
                setAuthor(data.u_name);
                setTitle(data.title);
                setGoals(data.goals || []);
            }
        };
        storeDocument();
    }, [id]);

    return (
        <ImageBackground 
            source={require("@/assets/images/gradient.png")}
            style={{ 
                flex: 1, 
                width: '100%', // Ensure the background image takes full width
                height: '100%', // Ensure the background image takes full height
            }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}> 
                <ScrollView>
                    <YStack padding="$4" gap="$2" alignItems="center" marginTop={"$9"}>
                        <H1 marginBottom={"$0"} color={"white"}>{title}</H1>
                        <H6 color={"white"}>BY - {author}</H6>
    
                        <Card bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
                            <YStack padding="$3">
                                <XStack alignItems="center">
                                    <MaterialIcons name="bar-chart" size={24} color="#4caf50" />
                                    <SizableText size="$6" fontWeight="bold">Progress</SizableText>
                                </XStack>
                                <Text style={{ color: '#555', fontSize: 16, marginTop: 5 }}>{fitnessPlan}</Text> 
                            </YStack>
                        </Card>
    
                        <Separator />
    
                        {/* Goals List */}
                        <Card bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
                            <YStack padding="$3">
                                <XStack alignItems="center">
                                    <MaterialIcons name="star" size={24} color="#ff9800" />
                                    <SizableText size="$6" fontWeight="bold">Goals</SizableText>
                                </XStack>
                                <YStack gap="$0">
                                    {goals.length > 0 ? (
                                        goals.map((goal: string, index: number) => (
                                            <XStack key={index} alignItems="center">
                                                <SizableText style={{ color: '#333' }}>• {goal}</SizableText>
                                            </XStack>
                                        ))
                                    ) : (
                                        <Text>No goals provided</Text>
                                    )}
                                </YStack>
                            </YStack>
                        </Card>
    
                        <Separator />
    
                        <Card bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
                            <YStack padding="$3">
                                <SizableText size="$6" fontWeight="bold">Upcoming Challenges</SizableText>
                                <Text style={{ color: '#555' }}>Stay tuned for new challenges coming soon!</Text>
                            </YStack>
                        </Card>
                    </YStack>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );    
}
