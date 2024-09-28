import { useEffect, useState } from 'react';
import { getPlans } from '@/scripts/getFitnessPlans';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPosts } from '@/scripts/getUserPosts';
import FitnessCard from '@/components/FitnessCard';
import { H1, YStack, ScrollView, SizableText } from 'tamagui';
import { ActivityIndicator, ImageBackground} from "react-native"

export default function Page() {
  const [plans, setPlans] = useState<any[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const listPlans = async () => {
    setLoading(true); // Start loading
    const plansFromDb = await getPosts();
    if (plansFromDb) {
      const newPlans = plansFromDb.map(plan => plan.data());
      const newTitles = plansFromDb.map(title => title.id);
      setIds(newTitles);
      setPlans(newPlans);
    }
    setLoading(false); // Stop loading
  };

  useEffect(() => {
    listPlans();
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/gradient.png')} // Your background image
      style={{ flex: 1, padding: 20 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <H1 alignSelf='center' margin={"$4"} color="white">Your Posts</H1>
          
          {loading ? (
            <YStack flex={1} alignItems='center' justifyContent='center'>
              <ActivityIndicator size="large" color="#blue8Dark" />
              <SizableText color="white">Loading posts...</SizableText>
            </YStack>
          ) : (
            <YStack flex={1} alignSelf='center'>
              {plans.map((plan, index) => (
                <FitnessCard
                  key={ids[index]}
                  title={plan.title}
                  link={`post/${ids[index]}`}
                  id={ids[index]}
                  dbName='posts'
                  onDeleted={listPlans}
                />
              ))}
            </YStack>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
