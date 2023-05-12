import { Chain, Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit';

export interface MyWalletOptions {
    projectId: string;
    chains: Chain[];
}

export const imotaWallet = ({ chains, projectId }: MyWalletOptions): Wallet => ({
    id: 'imota',
    name: 'Imota',
    iconUrl: '/imota-wallet-icon.png',
    iconBackground: '#5a8777',
    downloadUrls: {
        android: 'https://play.google.com/store/apps/details?id=com.nft5.imota&hl=vi&gl=VN&pli=1',
        ios: 'https://apps.apple.com/vn/app/imota/id6444327204',
        qrCode: 'https://www.imota.io/',
    },
    createConnector: () => {
        const connector = getWalletConnectConnector({ projectId, chains });

        return {
            connector,
            mobile: {
                getUri: async () => (await connector.getProvider()).connector.uri,
            },
            qrCode: {
                getUri: async () => (await connector.getProvider()).connector.uri,
                instructions: {
                    learnMoreUrl: 'https://www.imota.io/',
                    steps: [
                        {
                            description:
                                'We recommend putting My Wallet on your home screen for faster access to your wallet.',
                            step: 'install',
                            title: 'Open the My Wallet app',
                        },
                        {
                            description:
                                'After you scan, a connection prompt will appear for you to connect your wallet.',
                            step: 'scan',
                            title: 'Tap the scan button',
                        },
                    ],
                },
            },
            extension: {
                instructions: {
                    learnMoreUrl: 'https://www.imota.io/',
                    steps: [
                        {
                            description:
                                'We recommend pinning My Wallet to your taskbar for quicker access to your wallet.',
                            step: 'install',
                            title: 'Install the My Wallet extension',
                        },
                        {
                            description:
                                'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                            step: 'create',
                            title: 'Create or Import a Wallet',
                        },
                        {
                            description:
                                'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                            step: 'refresh',
                            title: 'Refresh your browser',
                        },
                    ],
                },
            },
        };
    },
});
