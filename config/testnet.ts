import { Chain } from "viem";

export const testnet = {
    id: 9174,
    name: 'Beh testnet',
    network: 'arbitrum fork',
    nativeCurrency: { name: 'BB ETH', symbol: 'BBETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.buildbear.io/future-chewbacca-1a5b024e'],
        },
        public: {
            http: ['https://rpc.buildbear.io/future-chewbacca-1a5b024e'],
        },
    },
    blockExplorers: {
        etherscan: { name: 'Buildbear scan', url: 'https://explorer.buildbear.io/future-chewbacca-1a5b024e' },
        default: { name: 'Buildbear scan', url: 'https://explorer.buildbear.io/future-chewbacca-1a5b024e' },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 7654707,
        },
    },
} as const satisfies Chain
