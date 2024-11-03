import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLegend } from 'victory-native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebaseConfig'; // Adjust based on your Firebase setup
import { getObjectData } from "@/scripts/store"; // Assuming this retrieves u_id
import { H1 } from 'tamagui';

export default function Progress() {
  const [data, setData] = useState<{ weightData: { x: string, y: number }[], heightData: { x: string, y: number }[] }>({
    weightData: [],
    heightData: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const u_data = await getObjectData("u_data");
      const u_id = u_data?.u_name;

      if (!u_id) {
        console.error("User ID is undefined.");
        return;
      }

      try {
        const q = query(collection(db, "fitness_snapshot"), where("u_id", "==", u_id));
        const snapshot = await getDocs(q);

        const weightData = [];
        const heightData = [];

        snapshot.forEach((doc) => {
          const { weight, height, time } = doc.data();
          const date = new Date(time.toDate());

          weightData.push({ x: date, y: weight });
          heightData.push({ x: date, y: height });
        });

        // Sort data by date (oldest to newest)
        weightData.sort((a, b) => a.x - b.x);
        heightData.sort((a, b) => a.x - b.x);

        // Convert dates to readable format for Victory chart
        const formattedWeightData = weightData.map(item => ({ x: item.x.toLocaleDateString(), y: item.y }));
        const formattedHeightData = heightData.map(item => ({ x: item.x.toLocaleDateString(), y: item.y }));

        setData({ weightData: formattedWeightData, heightData: formattedHeightData });
      } catch (error) {
        console.error("Error fetching snapshots: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/gradient.png')} // Path to your gradient image
      style={styles.background}
    >
      <View style={styles.container}>
        <H1 color={'white'} margin={"$4"}>Progress</H1>

        {data.weightData.length > 0 ? (
          <>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>Weight Progress</Text>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLegend 
                  x={Dimensions.get("window").width / 2 - 50}
                  orientation="horizontal"
                  gutter={20}
                  data={[{ name: "Weight", symbol: { fill: "#FF6384" } }]}
                />
                <VictoryAxis dependentAxis />
                <VictoryAxis />
                <VictoryLine
                  data={data.weightData}
                  style={{ data: { stroke: "#FF6384" } }}
                  interpolation="natural"
                />
              </VictoryChart>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Height Progress</Text>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLegend 
                  x={Dimensions.get("window").width / 2 - 50}
                  orientation="horizontal"
                  gutter={20}
                  data={[{ name: "Height", symbol: { fill: "#36A2EB" } }]}
                />
                <VictoryAxis dependentAxis />
                <VictoryAxis />
                <VictoryLine
                  data={data.heightData}
                  style={{ data: { stroke: "#36A2EB" } }}
                  interpolation="natural"
                />
              </VictoryChart>
            </View>
          </>
        ) : (
          <Text style={styles.noDataText}>No progress data available</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',
    marginBottom: 15,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDataText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
