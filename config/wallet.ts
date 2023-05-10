import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from "wagmi/providers/public"
import { arbitrumGoerli } from 'wagmi/chains'

// Beh project id
const projectId = "97263eb6c360ac56719d0fe491cf0d6f"

// testnet config
export const { chains, publicClient } = configureChains([arbitrumGoerli], [
    publicProvider(),
]);

const { connectors } = getDefaultWallets({
    appName: 'Beh staking pool',
    projectId,
    chains,
});

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})
