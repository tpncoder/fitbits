import { useEffect, useState } from 'react';
import { getPosts } from '@/scripts/getCommunityPosts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FitnessCard from '@/components/FitnessCard';
import { H1, H2, YStack, Button, ScrollView, Text } from 'tamagui';
import { ActivityIndicator, ImageBackground} from "react-native"

export default function Page() {
  const [plans, setPlans] = useState<any[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();  // For navigating to post details

  const listPlans = async () => {
    try {
      const plansFromDb = await getPosts();
      if (plansFromDb) {
        const newPlans = plansFromDb.map(plan => plan.data());
        const newTitles = plansFromDb.map(title => title.id);
        setIds(newTitles);
        setPlans(newPlans);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listPlans();
  }, []);

  return (
    <ImageBackground 
      source={require("@/assets/images/gradient.png")}
      style={{ flex: 1, width: null, height: null }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 0,
            paddingHorizontal: 20,
            paddingBottom: 100,
            flexGrow: 1, // Ensures content fills the screen
          }}
        >
          <H1 alignSelf='center' margin={"$4"} marginTop={"$9"} fontWeight={800} color="white">Community</H1>
          {loading ? (
            <YStack alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" color="#blue8Dark" />
              <Text color={"$white075"}>Fetching Community Posts...</Text>
            </YStack>
          ) : plans.length === 0 ? (
            <YStack alignItems="center" justifyContent="center" flex={1}>
              <Text color="white">No posts found</Text>
            </YStack>
          ) : (
            <YStack flex={1} alignSelf='center' space="$4">
              {plans.map((plan, index) => (
                <FitnessCard
                  key={ids[index]}
                  title={plan.title}
                  link={`post/${ids[index]}`}
                  id={ids[index]}
                  dbName='posts'
                  onDeleted={listPlans}
                  hideDeleted={true}
                />
              ))}
            </YStack>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
