import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { View, Text, StyleSheet } from 'react-native';


function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <Text>
        Connected to {address}
        <Text onClick={() => disconnect()}>Disconnect</Text>
      </Text>
    )
  return <Text onClick={() => connect()}>Connect Wallet</Text>
}

export default Profile