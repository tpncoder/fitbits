import { useEffect, useState } from 'react';
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, ImageBackground } from 'react-native';

import LibraryCard from '@/components/LibraryCard';
import { H1, YStack, ScrollView, Text, H3,H6} from 'tamagui';

export default function Library() {
  const [libraryPlans, setLibraryPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLibraryPlans = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "library_plans"));
      const plans = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLibraryPlans(plans);
      console.log("Fetched Library Plans:", plans);
    } catch (error) {
      console.error("Error fetching library plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryPlans();
  }, []);

  return (
    <ImageBackground 
      source={require("@/assets/images/gradient.png")}
      style={{ flex: 1, width: null, height: null }}
    >
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 80, flexGrow: 1, paddingTop: 0 }}
        >
          <H1 alignSelf='center' margin={"$4"} marginTop={"$9"} fontWeight={800} color="white">Library</H1>
          <H6 alignSelf='center' color={'white'} textAlign='center' margin={"$3"}>Curated, pre-made workouts to choose from!</H6>

          {loading ? (
            <YStack alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" color="#blue8Dark" />
              <Text color={"$white075"}>Loading Library Plans...</Text>
            </YStack>
          ) : (
            <YStack flex={1} gap={"$2"} marginLeft={"$3"} alignItems='center'>
              {libraryPlans.length > 0 ? (
                libraryPlans.map((plan) => (
                  <LibraryCard
                    key={plan.id}
                    title={plan.title}
                    link={`library/${plan.id}`} // Link to library workout page
                  />
                  
                ))
              ) : (
                <H3 ml={"$7"} color={"white"}>No library plans available.</H3>
              )}
            </YStack>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
