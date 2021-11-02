import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

// 기기 사이즈 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH);

// 이런 정보는 반드시 서버에 두어야하며, 현재는 무제한 생성가능한 무료 API_KEY 이기 때문에 편의상 application 내부에 저장
const API_KEY = "4202a96e6da9b590dc2f1b421ceb72f6";

// icons
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Rain: "rains",
  Snow: "snow",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    // user 에게 위치 정보 제공 동의 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    // 제공 동의 시, 위치 좌표 가져오기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // 가져온 위치 좌표로 도시명 가져오기
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        indicatorStyle="white"
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator size="large" style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={60}
                  color="#ccc"
                  style={{ marginTop: 40, marginLeft: 20 }}
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.subDescription}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  city: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "#eee",
    fontSize: 42,
    fontWeight: "600",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 40,
  },
  temp: {
    marginTop: 20,
    fontSize: 120,
    color: "#eee",
    borderTopWidth: 20,
    borderTopColor: "#fff",
  },
  description: {
    marginTop: -10,
    marginLeft: 20,
    fontSize: 40,
    color: "#fff",
  },
  subDescription: {
    fontSize: 20,
    marginLeft: 20,
    color: "#aaa",
  },
});
