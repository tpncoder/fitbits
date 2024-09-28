import { useEffect, useState, useContext } from 'react';
import { getUserData } from '@/scripts/getUserData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { Card, H2, H6, YGroup, Image, XGroup, H3, Button, H1, YStack } from 'tamagui';
import { router } from 'expo-router';

import LoginContext from '@/hooks/loggedInContext';

export default function AccountScreen() {
  const [UData, setUData] = useState([]);
  const { logOut } = useContext(LoginContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const returnUData = async () => {
      try {
        const querySnapshot = await getUserData();
        if (querySnapshot) {
          const data = querySnapshot.map(doc => doc.data());
          setUData(data);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };
    
    returnUData();
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/gradient.png')} // Add your gradient image here
      style={{ flex: 1, width: null, height: null }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          {loading ? (
            <YStack alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" color="#blue8Dark" />
              <H1 color="white">Loading user data...</H1>
            </YStack>
          ) : UData.length > 0 ? (
            <Card
              padded
              bordered
              alignSelf='center'
              margin={"$5"}
              width={280}
              borderRadius={"$10"}
            >
              <Card.Header>
                <H2>{UData[0].u_name}</H2>
              </Card.Header>
              <YGroup>
                <YGroup.Item>
                  <H6 fontWeight={100}>Height: {Number(UData[0].height / 30.48).toPrecision(2)} ft</H6>
                  <H6 fontWeight={100}>Weight: {Math.floor(UData[0].weight)} kg</H6>
                  <H6 fontWeight={100}>Goal: {UData[0].goal.charAt(0).toUpperCase() + UData[0].goal.slice(1)}</H6>
                  <H6>Member since {UData[0].created_on.toDate().toDateString()}</H6>
                  <H6>Age: {UData[0].age}</H6>
                  <H6>Gender: {UData[0].gender}</H6>
                </YGroup.Item>
              </YGroup>
            </Card>
          ) : (
            <H1 color="white">No user data available</H1>
          )}
          <XGroup alignSelf='center'>
          <Card
            padded
            bordered={false} // Ensure the border is disabled
            width={280}
            height={150}
            borderRadius={"$radius.2"}
            onPress={() => { router.push("/(tabs)/user_posts") }}
            style={{ 
              overflow: 'hidden', 
              backgroundColor: 'transparent', // Ensure the card itself has a transparent background
              borderWidth: 0, // Set border width to 0
              borderColor: 'transparent' // Set border color to transparent
            }} 
          >
            <Card.Background>
              <Image
                borderRadius={"$radius.2"} // Match the card's border radius
                source={{
                  width: 300,
                  height: 150,
                  uri: 'https://plus.unsplash.com/premium_photo-1665329006985-04f95dd59402?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }}
                style={{ width: '100%', height: '100%' }} // Ensure image fits the card
              />
            </Card.Background>
            <Card.Footer style={{ backgroundColor: 'transparent' }}>
              <H3 fontWeight={800} color={"whitesmoke"} shadowColor={"$gray1Dark"}>YOUR POSTS</H3>
            </Card.Footer>
          </Card>
          </XGroup>
          <Button 
            onPress={() => { logOut() }} 
            backgroundColor={"$red8Dark"} 
            width={130} 
            fontWeight={800} 
            color={"whitesmoke"} 
            shadowColor={'$gray1Dark'} 
            alignSelf='center' 
            marginTop={"$5"}
          >
            Log Out
          </Button>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
