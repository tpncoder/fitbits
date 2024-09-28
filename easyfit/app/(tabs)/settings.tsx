import InputField from "@/components/InputField";
import { getObjectData } from '@/scripts/store';
import { getUserData, updateUserData } from '@/scripts/userData';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import { Button, H1, Text, XStack, YStack } from "tamagui";

interface SettingsProps {
  onUpdate: () => void; // Callback prop to trigger data re-fetch
}

export default function Settings({ onUpdate }: SettingsProps) {
  const [u_name, setU_name] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getObjectData("u_data");
      if (storedData && storedData.u_name) {
        setU_name(storedData.u_name);
        const userData = await getUserData(storedData.u_name);
        if (userData) {
          setPassword(userData.password);
          setGoal(userData.goal);
          setHeight(userData.height);
          setWeight(userData.weight);
          setAge(userData.age);
          setGender(userData.gender);
        }
      }
      setLoading(false); // Set loading to false after data fetching
    };

    fetchData();
  }, []);

  // Settings screen
  return (
    <ImageBackground 
      source={require('@/assets/images/gradient.png')} // Your background image
      style={{ flex: 1, padding: 20 }}
    >
      <YStack
        flex={1}
        justifyContent='center'
        alignSelf='center'
      >
        <H1 color="white" marginBottom="$4">Settings</H1>

        {loading ? (
          <YStack alignItems="center" justifyContent="center" flex={1}>
            <ActivityIndicator size="large" color="#blue8Dark" />
            <Text color="white">Loading settings...</Text>
          </YStack>
        ) : (
          <YStack gap="$2">
            <XStack alignItems="center" space="$4">
              <Text color="white">Password:</Text>
              <InputField store={password} update={setPassword} placeholder="Password" secureTextEntry={true} />
            </XStack>

            <XStack alignItems="center" space="$4">
              <Text color="white">Your Goal:</Text>
              <InputField store={goal} update={setGoal} placeholder="Your Goal" />
            </XStack>

            <XStack alignItems="center" space="$4">
              <Text color="white">Height (in cm):</Text>
              <InputField store={height} update={setHeight} placeholder="Your Height (in cm)" />
            </XStack>

            <XStack alignItems="center" space="$4">
              <Text color="white">Weight (in kg):</Text>
              <InputField store={weight} update={setWeight} placeholder="Your Weight (in kg)" />
            </XStack>

            <XStack alignItems="center" space="$4">
              <Text color="white">Age:</Text>
              <InputField store={age} update={setAge} placeholder="Your Age" />
            </XStack>

            <XStack alignItems="center" space="$4">
              <Text color="white">Gender:</Text>
              <InputField store={gender} update={setGender} placeholder="Your Gender" />
            </XStack>

            <Button
              onPress={async () => {
                // Validate fields before updating
                if (!u_name || !password || !goal || !height || !weight || !age || !gender) {
                  alert('Please fill in all fields.');
                  return;
                }

                const updateSuccess = await updateUserData({ u_name, password, goal, height, weight, age, gender });
                if (updateSuccess) {
                  alert('Profile updated successfully!');
                  onUpdate(); // Call the callback to notify AccountScreen to fetch data
                } else {
                  alert('Failed to update profile.');
                }
              }}
              backgroundColor={"#303030"}
              marginTop="$4"
              color={"white"}
            >
              Update
            </Button>
          </YStack>
        )}
      </YStack>
    </ImageBackground>
  );
}
