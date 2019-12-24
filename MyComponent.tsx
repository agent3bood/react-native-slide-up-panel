import React from "react";
import { View, StyleSheet, Text } from "react-native";

const MyComponent = props => {
  return (
    <View style={styles.container}>
      <Text>{`Hello O_O\nHello again\n\n\n\nnow you see me`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "#775555"
  }
});

export default MyComponent;
