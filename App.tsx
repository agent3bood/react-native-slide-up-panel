import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SlideUp from "./SlideUp";
import MyComponent from "./MyComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>!</Text>
      <SlideUp
        openedHeight={200}
        closedHeight={32}
        openDistance={40}
        closeDistance={4}
      >
        <MyComponent />
      </SlideUp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
