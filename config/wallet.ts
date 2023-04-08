import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { publicProvider } from "wagmi/providers/public"
import { arbitrumGoerli } from 'wagmi/chains'

// testnet config
export const { chains, provider } = configureChains([arbitrumGoerli], [
    publicProvider(),
]);

const { connectors } = getDefaultWallets({
    appName: 'Staking pool test',
    chains
});

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})
