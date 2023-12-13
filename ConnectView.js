import { Pressable, Text, StyleSheet, Button, TextInput, Image, View } from 'react-native'
import { useWeb3Modal } from '@web3modal/wagmi-react-native'

function ConnectView() {
  const {isOpen, open, close, isConnected, address, provider  } = useWeb3Modal()

  const handleConnect = async () => {
    try {
      if (!isConnected) {
        await open();
      } else { open, provider, 
        // Handle disconnection if already connected
        await provider?.disconnect();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  
  return (
    <>
      <Pressable
      onPress={handleConnect}
    //   onClick={() => open()}
      >
        <Text 
        style={styles.inputContainer}
        >Open Connect Modal</Text>
      </Pressable>
      
    </>
  )
}

export default ConnectView

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    connectButton: {
      marginTop: 16,
      padding: 10,
      backgroundColor: '#3498db',
      borderRadius: 5,
      alignItems: 'center',
    },
    nftContainer: {
      margin: 20,
    },
    nftHeading: {
      fontSize: 23,
      fontWeight: '700',
    },
    inputContainer: {
      marginVertical: 100,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      width: 80,
    },
    input: {
      borderWidth: 1,
      flex: 1,
      padding: 5,
    },
    resultsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    resultRow: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    resultItem: {
      width: 70,
      margin: 5,
      alignItems: 'center',
    },
    resultImage: {
      width: 70,
      height: 70,
      borderRadius: 5,
      marginTop: 10,
    },
    resultText: {
      fontSize: 10,
    },
    picker: {
      flex: 1,
      height: 40,
    },
  });