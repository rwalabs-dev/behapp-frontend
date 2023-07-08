import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from "wagmi/providers/public"
import { arbitrum } from 'wagmi/chains'
import { testnet } from "./testnet";

// select the chain
const chain = process.env.NEXT_PUBLIC_APP_ENV === "prod" ? arbitrum : testnet

// Beh project id
const projectId = "97263eb6c360ac56719d0fe491cf0d6f"

// testnet config
export const { chains, publicClient } = configureChains([chain], [
    publicProvider(),
]);

const { connectors } = getDefaultWallets({
    appName: 'Beh staking pool',
    projectId,
    chains,
});

// const connectors = connectorsForWallets([
//     {
//         groupName: 'Partner',
//         wallets: [
//             imotaWallet({ projectId, chains }),
//         ],
//     },
//     ...wallets,
// ]);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})
