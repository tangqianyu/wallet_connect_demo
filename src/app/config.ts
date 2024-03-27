'use client';

import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// const OKXConnector = injected({
//     target() {
//         return {
//             id: 'okxProvider',
//             name: 'OKX Wallet',
//             icon:'/okx.webp',
//             provider: (window as any)?.okxwallet
//         };
//     }
// });


//wagmi is depends on evm, not support unisat!.
// const UnisatConnector = injected({
//     target() {
//         return {
//             id: 'unisatProvider',
//             name: 'Unisat Wallet',
//             icon:'/unisat.png',
//             provider: (window as any)?.unisat,
//         };
//     }
// });

export const config = createConfig({
    chains: [mainnet, sepolia],
    multiInjectedProviderDiscovery: false, 
    connectors: [],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http()
    }
});
