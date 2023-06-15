import { Chain } from "viem";

if (!process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID) throw Error("NEXT_PUBLIC_TESTNET_CHAIN_ID env variable must be set");
if (!process.env.NEXT_PUBLIC_TESTNET_RPC_URL) throw Error("NEXT_PUBLIC_TESTNET_RPC_URL env variable must be set");
if (!process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL) throw Error("NEXT_PUBLIC_TESTNET_EXPLORER_URL env variable must be set");

export const testnet = {
    id: parseInt(process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID),
    name: 'Beh testnet',
    network: 'arbitrum fork',
    nativeCurrency: { name: 'BB ETH', symbol: 'BBETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_TESTNET_RPC_URL],
        },
        public: {
            http: [process.env.NEXT_PUBLIC_TESTNET_RPC_URL],
        },
    },
    blockExplorers: {
        etherscan: { name: 'Buildbear scan', url: process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL },
        default: { name: 'Buildbear scan', url: process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 7654707,
        },
    },
} as const satisfies Chain
