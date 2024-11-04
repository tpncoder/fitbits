import { useEffect, useState } from 'react';
import { getPlans } from '@/scripts/getFitnessPlans';
import { db } from "@/firebaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"; 
import { getObjectData } from '@/scripts/store';
import { generatePlan } from '@/scripts/generateFitness';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, ImageBackground } from 'react-native';

import FitnessCard from '@/components/FitnessCard';
import { H1, H2, YStack, Button, ScrollView, SizableText, Text, Card, H4, H3 } from 'tamagui';
import { router } from 'expo-router';

export default function TabOneScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false); 

  const addPlan = async () => {
    try {
      setLoading(true);
      const u_data = await getObjectData("u_data");
      console.log("User Data:", u_data); 

      const [plan, titleP] = await generatePlan(u_data);
      console.log("Generated Plan:", plan); 
      console.log("Generated Title:", titleP); 

      await addDoc(collection(db, "fitness_plans"), {
        content: plan,
        title: titleP,
        u_name: u_data.u_name
      });
      await listPlans(); 
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: string) => {
    try {
      await deleteDoc(doc(db, "fitness_plans", id)); // Delete the document
      console.log(`Plan with ID: ${id} deleted successfully.`);

      // Update local state to remove the deleted plan
      setPlans(currentPlans => currentPlans.filter(plan => plan.id !== id));
      
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const listPlans = async () => {
    try {
      setFetching(true);
      const plansFromDb = await getPlans();
      console.log("Plans from DB after deletion:", plansFromDb);
      if (plansFromDb) {
        const newPlans = plansFromDb.map(plan => ({
          ...plan.data(),
          id: plan.id
        }));
        setPlans(newPlans);
        console.log("Updated Plans State:", newPlans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    listPlans();
  }, []);

  return (
    <ImageBackground 
      source={require("@/assets/images/gradient.png")}
      style={{ flex: 1,
        width: null,
        height: null
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 80, flexGrow: 1, paddingTop: 0 }}
        >
          <H1 margin="$4" marginLeft={"$8"} fontWeight={800} marginTop={"$9"} color="white" >HI THERE,👋</H1>
          <H2 marginLeft={"$8"} fontWeight={100} color="white">Your Plans</H2>
          <Card width={320} padded borderRadius={"$10"} ml={"$3"} mt={"$3"}>
            <YStack gap={"$4"}>
              <H4>Want to get your daily feedback?</H4>
              <Button bg={"$red9Dark"} borderRadius={"$9"} fontWeight={800} color="white" onPress={() => router.push("/feedback")}>Let's Go!</Button>
            </YStack>
          </Card>
          {loading || fetching ? (
            <YStack alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" color="#blue8Dark" />
              <Text color={"$white075"}>{loading ? "Generating Your Plan..." : "Fetching Your Plans..."}</Text>
            </YStack>
          ) : (
            <>
              <Button margin={"$4"} marginLeft={"$8"} width={200} borderRadius={"$7"} bg={"$red9Dark"} onPress={addPlan} color={"white"}>
                <SizableText fontWeight={"800r"} color="white">Generate New Plan</SizableText>
              </Button>
              <YStack flex={1} gap={"$2"} marginLeft={"$3"}>
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <FitnessCard
                      key={plan.id}
                      title={plan.title}
                      link={`plan/${plan.id}`}
                      id={plan.id}
                      onDeleted={() => deletePlan(plan.id)}
                    />
                  ))
                ) : (
                  <H3 ml={"$7"} color={"white"}>No plans available.</H3> // Show message if no plans
                )}
              </YStack>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
