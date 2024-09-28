import { useEffect, useState } from 'react';
import { getPlans } from '@/scripts/getFitnessPlans';
import { db } from "@/firebaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"; 
import { getObjectData } from '@/scripts/store';
import { generatePlan } from '@/scripts/generateFitness';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, ImageBackground } from 'react-native';

import FitnessCard from '@/components/FitnessCard';
import { H1, H2, YStack, Button, ScrollView, SizableText, Text } from 'tamagui';

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
      console.log("Plans from DB after deletion:", plansFromDb); // Log fetched plans
      if (plansFromDb) {
        const newPlans = plansFromDb.map(plan => ({
          ...plan.data(),
          id: plan.id // Ensure each plan object has an id property
        }));
        setPlans(newPlans);
        console.log("Updated Plans State:", newPlans); // Log updated plans
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
          {loading || fetching ? (
            <YStack alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" color="#blue8Dark" />
              <Text color={"$white075"}>{loading ? "Generating Your Plan..." : "Fetching Your Plans..."}</Text>
            </YStack>
          ) : (
            <>
              <Button margin={"$4"} marginLeft={"$8"} width={200} borderRadius={"$7"} backgroundColor="#303030" onPress={addPlan} color={"white"}>
                <SizableText fontWeight={"800r"} color="white">Generate New Plan</SizableText>
              </Button>
              <YStack flex={1} gap={"$2"} marginLeft={"$3"}>
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <FitnessCard
                      key={plan.id} // Use plan.id directly as the key
                      title={plan.title}
                      link={`plan/${plan.id}`} // Use plan.id for the link as well
                      id={plan.id} // Pass the plan.id to the FitnessCard
                      onDeleted={() => deletePlan(plan.id)} // Call deletePlan with plan.id
                    />
                  ))
                ) : (
                  <Text>No plans available.</Text> // Show message if no plans
                )}
              </YStack>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
