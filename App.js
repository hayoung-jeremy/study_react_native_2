import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  city: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "#eee",
    fontSize: 42,
    fontWeight: "600",
  },
  weather: {
    flex: 3,
    backgroundColor: "#242424",
  },
  day: {
    flex: 1,
    backgroundColor: "#282828",
    alignItems: "center",
  },
  temp: {
    marginTop: 20,
    fontSize: 160,
    color: "#eee",
  },
  description: {
    marginTop: -30,
    fontSize: 60,
    color: "#eee",
  },
});
