import React, {useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";
import WebView from "react-native-webview";

function Profile({navigation}) {
  const githubUsername = navigation.getParam("github_username");

  return (
    <WebView style={styles.webview} source={{uri: `https://github.com/${githubUsername}`}}/>
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1
  }
});

export default Profile;