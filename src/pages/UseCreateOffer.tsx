import React from 'react';
import {useCreateOffer} from "@niftyapes/sdk";
import {Address} from "wagmi";
import {BigNumber} from "ethers";

const UseCreateOffer: React.FC = () => {

    const terms = {
        price: BigNumber.from("22000000000000000"),
        downPayment: BigNumber.from("5500000000000000"),
        durationSeconds: 2592000,
        payPeriodSeconds: 604800,
        expirationSeconds: 1696096115,
        apr: 21,
        collectionOfferLimit: 1
    }

    const {isLoading, isSuccess, isError, signAndSaveOffer} = useCreateOffer({
        nftId: "9",
        nftContractAddress: "0xa5ae59eee379fc02206d715b9431ffa53507c152" as Address,
        terms
    });

    return <div>
        <div>
            <button onClick={signAndSaveOffer}>Sign Financing Offer</button>
        </div>

        <div>{isLoading && 'Loading'}</div>
        <div>{isSuccess && 'Offer created'}</div>
        <div>{isError && 'Unable to create offer'}</div>

    </div>
}

export default UseCreateOffer;