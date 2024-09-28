import { useLogin } from "@/hooks/useLogin";
import { Text, YStack, Button, XStack, H1 } from "tamagui";
import { useContext, useEffect, useState } from "react";
import { router } from 'expo-router';
import { storeObject } from "@/scripts/store";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import InputField from "@/components/InputField";
import LoginContext from '@/hooks/loggedInContext';

export default function Login() {
  const { u_name, setU_name, password, setPassword, loggedIn, loading, handleLogin } = useLogin();
  const { loggedIn: contextLoggedIn, logOut, logIn } = useContext(LoginContext);
  const [u_data, setU_data] = useState<object>();

  useEffect(() => {
    console.log('LoggedIn Context after update: ', contextLoggedIn);
  }, [contextLoggedIn]);

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
      <H1>Login</H1>
      <InputField store={u_name} update={setU_name} placeholder="Username" />
      <InputField store={password} update={setPassword} placeholder="Password" secureTextEntry={true} />
      <Button 
        onPress={async () => {
          const loginSuccess = await handleLogin();
          if (loginSuccess) {
            const d = await getDocs(query(collection(db, "user_data"), where("u_name", "==", u_name)));
            const docs = await d.docs;
            const data = docs.map((doc) => doc.data());

            // Log the fetched data directly
            console.clear();
            console.log(data[0]);  // Log data before setting it to state

            // Store the fetched data directly instead of relying on state update
            storeObject(data[0], "u_data");

            // Update the state afterwards
            setU_data(data[0]);
            logIn();
            router.replace("/");
          }
        }} 
        bordered 
        backgroundColor={"#fff"}
      >
        Login
      </Button>
      <XStack>
        <Text color={"$white10"}>Don't Have An Account?</Text>
        <Text color={"$blue11Dark"} onPress={() => router.push("/register")}> Register</Text>
      </XStack>
    </YStack>
  );
}
