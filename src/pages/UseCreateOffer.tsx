import React from 'react';
import {useCreateOffer} from "@niftyapes/sdk";
import {BigNumber} from "ethers";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const UseCreateOffer: React.FC = () => {

    const terms = {
        price: BigNumber.from("33000000000000000"),
        downPayment: BigNumber.from("1500000000000000"),
        durationSeconds: 2592000,
        payPeriodSeconds: 604800,
        expirationSeconds: 1696096115,
        apr: 0.33,
        collectionOfferLimit: 1
    }

    // Docs https://niftyapes.readme.io/reference/usecreateoffer
    // Create an offer for a given NFT
    const {isLoading, isSuccess, isError, signAndSaveOffer} = useCreateOffer({
        nftId: "9",
        nftContractAddress: "0xa5ae59eee379fc02206d715b9431ffa53507c152",
        terms
    });

    return <div>
        <ConnectButton/>
        <div style={{marginTop: '30px'}}>
            <button onClick={signAndSaveOffer}>Create Offer</button>
        </div>
        <div>{isLoading && 'Loading'}</div>
        <div>{isSuccess && 'Offer created'}</div>
        <div>{isError && 'Unable to create offer'}</div>
    </div>
}

export default UseCreateOffer;