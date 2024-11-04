import React, { useContext } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { useLogin } from '@/hooks/useLogin';
import LoginContext from '@/hooks/loggedInContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  const { loading } = useLogin();
  const { loggedIn: contextLoggedIn } = useContext(LoginContext);

  const tabsScreenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      paddingHorizontal: 10,
      height: 60,
      backgroundColor: '#303030',
    },
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              <View style={[styles.iconContainer, focused && styles.highlight]}>
                <MaterialIcons name="home" size={24} color={focused ? 'salmon' : color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.highlight]}>
                <MaterialIcons name="explore" size={24} color={focused ? 'salmon' : color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="newPost"
          options={{
            title: 'Community Post',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.highlight]}>
                <AntDesign name="pluscircle" size={24} color={focused ? 'salmon' : color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.highlight]}>
                <MaterialIcons name="account-circle" size={24} color={focused ? 'salmon' : color}  />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.highlight]}>
                <Ionicons name="settings" size={24} color={focused ? 'salmon' : color} />
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
        <Tabs.Screen name="library" options={{ title: "Library", tabBarButton: () => null }} />
        <Tabs.Screen name="progress" options={{ title: "Progress", tabBarButton: () => null }} />
      </Tabs>
    );
  }

  return <Redirect href="/greeting" />;
}

const styles = {
  iconContainer: {
    padding: 8,
    borderRadius: 15,
  },
  highlight: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light blue background for the selected tab
  },
};
