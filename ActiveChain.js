import React from 'react';
import { useNetwork } from 'wagmi';
import { View, Text, StyleSheet } from 'react-native';

function ActiveChain() {
  const { chain, chains } = useNetwork();

  return (
    <View style={styles.container}>
      {chain && <Text style={styles.text}>Connected to {chain.name}</Text>}
      {chains && (
        <Text style={styles.text}>Available chains: {chains.map((chain) => chain.name)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ActiveChain;
