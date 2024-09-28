import React, { useContext } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useLogin } from '@/hooks/useLogin';
import LoginContext from '@/hooks/loggedInContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const { u_name, setU_name, password, setPassword, loggedIn, loading, handleLogin } = useLogin();
  
  const { loggedIn: contextLoggedIn, logOut, logIn } = useContext(LoginContext);

  const tabsScreenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 20,
      width: '90%',
      height: 55, // Set a specific height for the tab bar
      border: 'transparent',
      borderRadius: 30,
      backgroundColor: '#303030',
      marginHorizontal: '5%', // Center it horizontally
      justifyContent: 'center', // Center items vertically
    }
    
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (contextLoggedIn) { 
    return (
      <Tabs screenOptions={tabsScreenOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'FitBits',
            tabBarIcon: ({ color }) => <MaterialIcons name='home' size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <MaterialIcons name='explore' size={24} color={color} />,
          }}
        />
         <Tabs.Screen
          name="newPost"
          options={{
            title: 'Community Post',
            tabBarIcon: ({ color }) => <AntDesign name="pluscircle" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <MaterialIcons name='account-circle' size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="plan/[id]"
          options={{
            title: "Fitness Plan",
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="post/[id]"
          options={{
            title: "Fitness Post",
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="user_posts"
          options={{
            title: "Shared Posts",
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="feedback"
          options={{
            title: "Feedback",
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    );
  }

  return (
    <Redirect href="/greeting"/>
  )
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
