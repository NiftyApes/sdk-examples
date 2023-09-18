import React from 'react';
import {useSeizeAsset} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {BigNumber} from "ethers";
import {useWaitForTransaction} from "wagmi";

const UseSeizeAsset: React.FC = () => {

    // Docs - https://niftyapes.readme.io/reference/useseizeasset
    const {data, write} = useSeizeAsset(
        {
            nftId: BigNumber.from("2"),
            nftContractAddress: '0x5c20670e19e557930fcc76908c500ff870967087'
        }
    )

    const {isError, isLoading, isSuccess} = useWaitForTransaction({hash: data?.hash})

    return <div>
        <ConnectButton/>

        <div style={{fontWeight: 'bold', marginBottom: '30px'}}>Seize Asset</div>
        <button onClick={() => write?.()}>Seize Asset</button>
        {isLoading && "Seizing Asset..."}
        {isError && "Error Seizing Asset"}
        {isSuccess && "Asset Seized Successfully"}
    </div>

}

export default UseSeizeAsset;
