import { useState } from "react";
import { Text, YStack, Button, XStack, H1 } from "tamagui";
import { router } from 'expo-router';

import InputField from "@/components/InputField";
import { addUser } from "@/scripts/addUser";

export default function Login() {
  const [u_name, setU_name] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [goal, setGoal] = useState<string>("")
  const [height, setHeight] = useState<string>()
  const [weight, setWeight] = useState<string>()
  const [age, setAge] = useState<string>()
  const [gender, setGender] = useState<string>()
  const [bloodPressure, setBloodPressure] = useState<string>()
  const [lipidProfile, setLipidProfile] = useState<string>()
  const [bloodGlucose, setBloodGlucose] = useState<string>()

  // Login Screen
  return (
    <YStack 
      minHeight={250}
      overflow="hidden"
      gap="$2"
      margin="$3"
      flex={1}
      padding="$2"
      justifyContent='center'
      alignSelf='center'
    >
      <H1>Register</H1>
      <InputField store={u_name} update={setU_name} placeholder="Username" />
      <InputField store={password} update={setPassword} placeholder="Password" secureTextEntry={true} />
      <InputField store={goal} update={setGoal} placeholder="Your Goal" />
      <InputField store={height} update={setHeight} placeholder="Your Height (in cm)" />
      <InputField store={weight} update={setWeight} placeholder="Your Weight (in kg)" />
      <InputField store={age} update={setAge} placeholder="Your Age" />
      <InputField store={gender} update={setGender} placeholder="Your Gender" />
      <InputField store={bloodPressure} update={setBloodPressure} placeholder="Blood Pressure (e.g., 120/80)" />
      <InputField store={lipidProfile} update={setLipidProfile} placeholder="Lipid Profile" />
      <InputField store={bloodGlucose} update={setBloodGlucose} placeholder="Blood Glucose Levels (mg/dL)" />
      
      <Button 
        onPress={async () => {
          const loginSuccess = await addUser({
            u_name, password, goal, height, weight, age, gender, bloodPressure, lipidProfile, bloodGlucose
          });
          if (loginSuccess) {
            router.replace("/login")
          }
        }} 
        bordered 
        backgroundColor={"#fff"}
      >
        Register
      </Button>
      
      <XStack>
        <Text color={"$white10"}>Already Have An Account?</Text>
        <Text color={"$blue11Dark"} onPress={() => router.push("/login")}> Login</Text>
      </XStack>
    </YStack>
  );
}
