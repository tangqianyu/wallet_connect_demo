'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { message } from 'antd';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

export type WalletType = 'okx' | 'unisat';

export interface WalletContextProps {
    currentWallet: WalletType | null;
    setCurrentWallet: Dispatch<SetStateAction<WalletType | null>>;
    connected: boolean;
    setConnected: Dispatch<SetStateAction<boolean>>;
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    publicKey: string;
    setPublicKey: Dispatch<SetStateAction<string>>;
    accounts: string[];
    setAccounts: Dispatch<SetStateAction<string[]>>;
}

export const WalletContext = createContext({} as WalletContextProps);

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
    const [currentWallet, setCurrentWallet] = useState(null as WalletType | null);
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [accounts, setAccounts] = useState([] as string[]);

    const value: WalletContextProps = {
        currentWallet,
        setCurrentWallet,
        connected,
        setConnected,
        address,
        setAddress,
        publicKey,
        setPublicKey,
        accounts,
        setAccounts
    };

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
