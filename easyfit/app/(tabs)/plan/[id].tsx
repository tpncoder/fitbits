import { useState, useEffect } from "react";
import { ScrollView } from "tamagui";
import { YStack, H2, Separator, Card, SizableText, XStack } from "tamagui";
import { ImageBackground } from "react-native";
import Markdown from 'react-native-markdown-display';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const [fitnessPlan, setFitnessPlan] = useState("");
  const [title, setTitle] = useState("");
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
      const data = await getFitnessPlan("fitness_plans", id);
      if (data !== null) {
        setFitnessPlan(data.content);
        setTitle(data.title);
      }
    };
    storeDocument();
  }, [id]);

  return (
    <ImageBackground 
        source={require("@/assets/images/gradient.png")}
        style={{ 
            flex: 1, 
            width: '100%', 
            height: '100%', 
        }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 60, flexGrow: 1, paddingTop: 0 }}>
          <YStack padding="$5" gap="$4">
            {/* Title Card */}
            <Card bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
              <YStack padding="$3" alignItems="center">
                <H2 textAlign="center">{title}</H2>
              </YStack>
            </Card>
            {/* Fitness Plan Card */}
            <Card bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
              <YStack padding="$3">
                <XStack alignItems="center">
                  <MaterialIcons name="fitness-center" size={24} color="#4caf50" />
                  <SizableText size="$6" fontWeight="bold">Fitness Plan</SizableText>
                </XStack>
                <Markdown>
                  {fitnessPlan}
                </Markdown>
              </YStack>
            </Card>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
