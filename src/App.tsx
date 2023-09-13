import React from 'react';
import {NiftyApesProvider} from "@niftyapes/sdk";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {publicProvider} from 'wagmi/providers/public'
import * as allChains from 'wagmi/chains'
import {getDefaultWallets} from "@rainbow-me/rainbowkit";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UseOffers from "./pages/UseOffers";
import UseLoans from "./pages/UseLoans";
import UseCreateOffer from "./pages/UseCreateOffer"

const CHAIN_ID = 5
const INTEGRATION_CONTRACT = '0xfa800eb4512a57f1dffe62f3ead634139dbb8547'

const envChain = Object.values(allChains).find(
    (chain) => chain.id === +(CHAIN_ID || allChains.mainnet)
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>NiftyApes SDK</div>,
    },
    {
        path: "/useOffers",
        element: <UseOffers/>,
    },
    {
        path: "/useCreateOffer",
        element: <UseCreateOffer/>,
    },
    {
        path: "/useLoans",
        element: <UseLoans/>,
    },
]);


function App() {
    return (
        <NiftyApesProvider config={{
            chainId: CHAIN_ID,
            integrationContractAddress: INTEGRATION_CONTRACT,
            theme: 'dark'
        }}>
            <WagmiConfig client={wagmiClient}>
                <RouterProvider router={router}/>
            </WagmiConfig>
        </NiftyApesProvider>
    );
}

export default App;
