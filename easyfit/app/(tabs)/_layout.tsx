import React, { useContext } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useLogin } from '@/hooks/useLogin';
import LoginContext from '@/hooks/loggedInContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

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
      height: 55,
      border: 'transparent',
      borderRadius: 30,
      backgroundColor: '#303030',
      marginHorizontal: '5%',
      justifyContent: 'center',
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
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <MaterialIcons name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Ionicons name="library" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <MaterialIcons name="explore" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="newPost"
          options={{
            title: 'Community Post',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <AntDesign name="pluscircle" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <MaterialIcons name="account-circle" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Entypo name="line-graph" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Ionicons name="settings" size={24} color={color} />
              </View>
            ),
          }}
        />
        {/* Hidden routes without tab icons */}
        <Tabs.Screen name="plan/[id]" options={{ title: "Fitness Plan", tabBarButton: () => null }} />
        <Tabs.Screen name="post/[id]" options={{ title: "Fitness Post", tabBarButton: () => null }} />
        <Tabs.Screen name="user_posts" options={{ title: "Shared Posts", tabBarButton: () => null }} />
        <Tabs.Screen name="feedback" options={{ title: "Feedback", tabBarButton: () => null }} />
        <Tabs.Screen name="library/[id]" options={{ title: "Library Post", tabBarButton: () => null }} />
      </Tabs>
    );
  }

  return <Redirect href="/greeting" />;
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 5,
  },
  activeTab: {
    backgroundColor: '#505050', // Highlight color for active tab
    paddingVertical: 10,        // Increase vertical padding for a taller highlight
    paddingHorizontal: 20,      // Increase horizontal padding for a wider highlight
    borderRadius: 25,           // Larger border radius for a rounded look
  },
});