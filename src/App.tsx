import React from 'react';

import {NiftyApesProvider} from "@niftyapes/sdk";

import {configureChains, createClient, WagmiConfig} from "wagmi";
import {publicProvider} from 'wagmi/providers/public'
import * as allChains from 'wagmi/chains'

import {getDefaultWallets} from "@rainbow-me/rainbowkit";


const GOERLI_CHAIN_ID = 5

const envChain = Object.values(allChains).find(
    (chain) => chain.id === +(GOERLI_CHAIN_ID || allChains.mainnet)
)

const {chains, provider} = configureChains(
    envChain ? [envChain] : [allChains.mainnet],
    [publicProvider()]
)

const {connectors} = getDefaultWallets({
    appName: 'NiftyApes SDK',
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

function App() {
    return (
        <NiftyApesProvider config={{
            chainId: 2,
            integrationContractAddress: '0xfa800eb4512a57f1dffe62f3ead634139dbb8547',
            theme: 'dark'
        }}>
            <WagmiConfig client={wagmiClient}>
                <div className="App">
                    <header className="">NiftyApes SDK</header>
                </div>
            </WagmiConfig>
        </NiftyApesProvider>
    );
}

export default App;
