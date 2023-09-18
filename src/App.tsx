import React from 'react';
import {NiftyApesProvider} from "@niftyapes/sdk";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {publicProvider} from 'wagmi/providers/public'
import * as allChains from 'wagmi/chains'
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UseOffers from "./pages/UseOffers";
import UseLoans from "./pages/UseLoans";
import UseCreateOffer from "./pages/UseCreateOffer"
import UseCancelOffer from "./pages/UseCancelOffer";
import UseBuyWithFinancing from "./pages/UseBuyWithFinancing";
import UseMakePayment from "./pages/UseMakePayment";
import UseERC721Approve from "./pages/UseERC721Approve";
import UseERC721SetApprovalForAll from "./pages/UseERC721SetApprovalForAll";
import UseUnderlyingNFTOwner from "./pages/UseUnderlyingNFTOwner";
import UseSeizeAsset from "./pages/UseSeizeAsset";

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
        path: "/useCancelOffer",
        element: <UseCancelOffer/>,
    },
    {
        path: "/useLoans",
        element: <UseLoans/>,
    },
    {
        path: "/useBuyWithFinancing",
        element: <UseBuyWithFinancing/>,
    },
    {
        path: "/useMakePayment",
        element: <UseMakePayment/>,
    },
    {
        path: "/useERC721Approve",
        element: <UseERC721Approve/>,
    },
    {
        path: "/useERC721SetApprovalForAll",
        element: <UseERC721SetApprovalForAll/>,
    },
    {
        path: "/useUnderlyingNFTOwner",
        element: <UseUnderlyingNFTOwner/>,
    },
    {
        path: "/useSeizeAsset",
        element: <UseSeizeAsset/>,
    },
]);


function App() {
    return (
        <NiftyApesProvider config={{
            apiKey:'YOUR_API_KEY_HERE',
            chainId: CHAIN_ID,
            integrationContractAddress: INTEGRATION_CONTRACT,
            theme: 'dark',
        }}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <RouterProvider router={router}/>
                </RainbowKitProvider>
            </WagmiConfig>
        </NiftyApesProvider>
    );
}

export default App;
