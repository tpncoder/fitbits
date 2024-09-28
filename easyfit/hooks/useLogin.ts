import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { checkCredentials } from '@/scripts/loginUser';
import { storeObject, getObjectData } from '@/scripts/store';

export function useLogin() {
  const [u_name, setU_name] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle login
  const handleLogin = async () => {
    const userData = await checkCredentials(u_name, password);
    if (userData) {
      setLoggedIn(true);
      storeObject(userData, 'u_data');
      return true
    } else {
      console.log('Invalid credentials');
      return false
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('u_data'); // Clear stored user data
      setLoggedIn(false); // Update login state
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const userData = await getObjectData('u_data');
      if (userData) {
        setLoggedIn(true);
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  return { u_name, setU_name, password, setPassword, loggedIn, loading, handleLogin, handleLogout };
}
