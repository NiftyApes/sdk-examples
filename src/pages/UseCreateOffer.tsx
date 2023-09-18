import React from 'react';
import {useCreateOffer, useERC721Approve} from "@niftyapes/sdk";
import {BigNumber} from "ethers";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const UseCreateOffer: React.FC = () => {

    const nftId = "1"
    const nftContractAddress = "0x5c20670e19e557930fcc76908c500ff870967087"

    const terms = {
        price: BigNumber.from("11000000000000000"),
        downPayment: BigNumber.from("2200000000000000"),
        durationSeconds: 2592000,
        payPeriodSeconds: 604800,
        expirationSeconds: 1696096115,
        apr: 0.33,
        collectionOfferLimit: 1
    }

    // Docs https://niftyapes.readme.io/reference/usecreateoffer
    // Create an offer for a given NFT
    const {isLoading, isSuccess, isError, signAndSaveOffer} = useCreateOffer({
        nftId, nftContractAddress, terms
    });

    const {hasCheckedApproval, hasApproval, write} = useERC721Approve({nftId, nftContractAddress})
    const approvalRequired = hasCheckedApproval && !hasApproval

    return <div>
        <ConnectButton/>

        <div style={{marginTop: '30px'}}>
            {approvalRequired && <button onClick={() => write?.()}>Approve Transfer</button>}
            <button disabled={approvalRequired} onClick={signAndSaveOffer}>Create Offer</button>
        </div>
        <div>{isLoading && 'Loading'}</div>
        <div>{isSuccess && 'Offer created'}</div>
        <div>{isError && 'Unable to create offer'}</div>
    </div>
}

export default UseCreateOffer;