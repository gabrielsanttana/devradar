import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";
import MapView, {Marker, Callout} from "react-native-maps";
import {requestPermissionsAsync, getCurrentPositionAsync} from "expo-location";
import {MaterialIcons} from "@expo/vector-icons";

import api from "../services/api";
import {connect, disconnect} from "../services/socket";

function Main({navigation}) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState("");
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadInitialPosition() {
      const {granted} = await requestPermissionsAsync();

      if (granted) {
        const {coords} = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const {latitude, longitude} = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);

  function setupWebSocket() {
    const {latitude, longitude} = currentRegion;
    
    connect(latitude, longitude, techs);
  }

  async function loadNearbyDevs() {
    const {latitude, longitude} = currentRegion;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
    setupWebSocket();
  }

  async function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView initialRegion={currentRegion} onRegionChangeComplete={handleRegionChange} style={styles.map}>
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }}
          >
            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

            <Callout onPress={() => {
              navigation.navigate("Profile", { github_username: dev.github_username });
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.serachInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={(text) => setTechs(text)}
        />
        <TouchableOpacity onPress={() => { techs && loadNearbyDevs() }} style={styles.searchButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },

  callout: {
    width: 260,
  },

  devName: {
    fontSize: 16,
    fontWeight: "bold"
  },

  devBio: {
    color: "#666",
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  },

  searchForm: {
    position: "absolute",
    top: 30,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },

  serachInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 2
  },

  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: "center",
    marginLeft: 10
  }
});

export default Main;