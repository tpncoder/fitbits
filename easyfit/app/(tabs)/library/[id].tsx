import { useState, useEffect } from "react";
import { ScrollView } from "tamagui";
import { YStack, H2, Card } from "tamagui";
import { ImageBackground } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function Page() {
  const [sections, setSections] = useState([]);
  const [title, setTitle] = useState("");
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();

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
      const data = await getFitnessPlan("library_plans", id);
      if (data !== null) {
        setTitle(data.title);

        // Use a regex to split the HTML content by <section> tags
        const htmlSections = data.content.split(/<\/?section>/i);
        const parsedSections = htmlSections
          .map((section, index) => {
            const trimmedSection = section.trim();
            return trimmedSection ? { content: `<section>${trimmedSection}</section>`, key: index } : null;
          })
          .filter(section => section !== null); // Remove any null values (empty sections)

        setSections(parsedSections);
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
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60, flexGrow: 1, paddingTop: 0 }}>
          <YStack padding="$5" gap="$4">
            {/* Title Card */}
            <Card bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
              <YStack padding="$3" alignItems="center">
                <H2 textAlign="center">{title}</H2>
              </YStack>
            </Card>

            {/* Render each section in its own card */}
            {sections.map((section) => (
              <Card key={section.key} bordered style={{ width: '100%', backgroundColor: '#fff', borderRadius: 16 }}>
                <YStack padding="$3">
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: section.content }}
                  />
                </YStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
