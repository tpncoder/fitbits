import { useLogin } from "@/hooks/useLogin";
import { Text, YStack, Button, XStack, H1 } from "tamagui";
import { useState } from "react";
import { addUser } from "@/scripts/addUser";
import { router } from 'expo-router';

import InputField from "@/components/InputField";
import LoginContext from '@/hooks/loggedInContext';

export default function Login() {
  const [u_name, setU_name] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [goal, setGoal] = useState<string>("")
  const [height, setHeight] = useState<string>()
  const [weight, setWeight] = useState<string>()
  const [age, setAge] = useState<string>()
  const [gender, setGender] = useState<string>()

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
      <InputField store={height} update={setHeight} placeholder="Your Height(in cm)" />
      <InputField store={weight} update={setWeight} placeholder="Your Weight(in kg)" />
      <InputField store={age} update={setAge} placeholder="Your Age" />
      <InputField store={gender} update={setGender} placeholder="Your Gender" />
      <Button 
        onPress={async () => {
          const loginSuccess = await addUser({u_name, password, goal, height, weight, age, gender})
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