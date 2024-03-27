'use client';

import { WalletContext, WalletType } from '@/app/providers';
import { formatAddress } from '@/utils/common';
import { Modal, message } from 'antd';
import { log } from 'console';
import { useContext, useState } from 'react';

export default function ConnectButton() {
    const { currentWallet, setCurrentWallet, connected, setConnected, address, setAddress, publicKey, setPublicKey, accounts, setAccounts } = useContext(WalletContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const handleOpenConnectWalletModal = () => {
        setIsModalOpen(true);
    };

    const handleConnect = async (wallet: WalletType) => {
        if (wallet === 'unisat') {
            let unisat = (window as any).unisat;
            if (!unisat) {
                messageApi.error('Please install unisat wallet!');
                return;
            }

            const res = await unisat.requestAccounts();
            setCurrentWallet(wallet);
            setConnected(true);
            setAddress(res[0]);
            setIsModalOpen(false);
        } else if (wallet == 'okx') {
            let okx = (window as any).okxwallet;
            if (!okx) {
                messageApi.error('Please install unisat wallet!');
                return;
            }

            console.log(okx);

            const res = await okx.bitcoin.connect();
            setCurrentWallet(wallet);
            setConnected(true);
            setAddress(res.address);
            setIsModalOpen(false);
        }
    };

    const handleDisConnect = () => {
        setCurrentWallet(null);
        setConnected(false);
        
        setAddress('');
    };

    return (
        <>
            {contextHolder}
            {!connected ? (
                <div className="text-indigo-700 border cursor-pointer py-4 px-6 rounded-2xl inline-flex items-center hover:border-indigo-600" onClick={handleOpenConnectWalletModal}>
                    Connect
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <div className="mb-3 font-bold">{formatAddress(address)}</div>
                        <div
                            className="text-indigo-700 border cursor-pointer py-4 px-6 rounded-2xl inline-flex items-center hover:border-indigo-600"
                            onClick={() => {
                                handleDisConnect();
                            }}
                        >
                            Disconnect
                        </div>
                    </div>
                </>
            )}
            <Modal
                title={<div className="text-center font-bold text-xl mb-5">Connect wallet</div>}
                open={isModalOpen}
                cancelText={null}
                footer={null}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                <div className="flex flex-col items-center gap-6">
                    <div
                        className="w-80 border border-black rounded-2xl h-12 flex items-center cursor-pointer gap-3 pl-6 hover:border-indigo-600"
                        onClick={() => {
                            handleConnect('okx');
                        }}
                    >
                        <img src="/okx.webp" alt="" />
                        <div className="font-blod">OKX Wallet</div>
                    </div>
                    <div
                        className="w-80 border border-black rounded-2xl h-12 flex items-center cursor-pointer gap-3 pl-6 hover:border-indigo-600"
                        onClick={() => {
                            handleConnect('unisat');
                        }}
                    >
                        <img src="/unisat.png" alt="" />
                        <div className="font-blod">Unisat Wallet</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
