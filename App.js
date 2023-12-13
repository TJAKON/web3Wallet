import '@walletconnect/react-native-compat';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Button, TextInput, Image, StyleSheet } from 'react-native';
import { WalletConnectModal, useWalletConnectModal, } from '@walletconnect/modal-react-native';
import { WagmiConfig, useNetwork, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

// import { mainnet, polygon, arbitrum } from 'viem/chains'
// import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'

import Profile from './Profile';
import ActiveChain from './ActiveChain';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'cdb9a60a993e763524a7dcff53fd9a13'
// const chains = [mainnet, polygon, arbitrum]
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}


export default function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [chainid, setChain] = useState('0x1');
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const { isOpen, open, close, isConnected, address, provider } = useWalletConnectModal();
  // const { chain, chains } = useNetwork()

  const handleConnect = async () => {
    try {
      if (!isConnected) {
        await open();
      } else {
        // Handle disconnection if already connected
        await provider?.disconnect();
        setWalletAddress(''); // Clear the stored wallet address on disconnection
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  
  useEffect(() => {
    // Automatically set the wallet address when connected
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  return (
    <>
        <View style={styles.container}>
          <Text style={styles.heading}>WalletConnect</Text>
          <Pressable onPress={handleConnect} style={styles.connectButton}>
            <Text>{isConnected ? address : 'Connect'}</Text>
          </Pressable>

          <WalletConnectModal projectId={projectId} providerMetadata={metadata} />
        </View> 
      
      {/* <WagmiConfig config={config}>
        <Profile/>
        <ActiveChain/>
      </WagmiConfig> */}
    </>
  )
}



// import '@walletconnect/react-native-compat';
// import { WagmiConfig } from 'wagmi'
// import { mainnet, polygon, arbitrum } from 'viem/chains'
// import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
// import { View, Text, Pressable, Button, TextInput, Image, StyleSheet } from 'react-native';
// import ConnectView from './ConnectView';

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = 'cdb9a60a993e763524a7dcff53fd9a13'

// // 2. Create config
// const metadata = {
//   name: 'Web3Modal RN',
//   description: 'Web3Modal RN Example',
//   url: 'https://web3modal.com',
//   icons: ['https://avatars.githubusercontent.com/u/37784886'],
//   redirect: {
//     native: 'YOUR_APP_SCHEME://',
//     universal: 'YOUR_APP_UNIVERSAL_LINK.com'
//   }
// }

// const chains = [mainnet, polygon, arbitrum]

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// // 3. Create modal
// createWeb3Modal({
//   projectId,
//   chains,
//   wagmiConfig
// })

// export default function App() {
//   return (
//     <WagmiConfig config={wagmiConfig}>
//       <Web3Modal />
//       <ConnectView/>
//     </WagmiConfig>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 10,
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