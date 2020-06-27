import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

const Loader = ({active}) => {

  return (
    <AnimatedLoader
      visible={active}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("./modes.json")}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});

export default Loader;
