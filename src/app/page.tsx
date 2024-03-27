'use client';

import ConnectButton from '@/components/connectButton';

export default function Home() {
    return (
        <main className="min-h-screen p-20">
            <div className="flex justify-between">
                <div className="mb-5 font-bold text-2xl">Wallet demo</div>
                <ConnectButton />
            </div>
        </main>
    );
}
