import React from 'react';
import {Offer, useBuyWithFinancing, useOffers} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {formatEther} from "ethers/lib/utils";

const UseBuyWithFinancing: React.FC = () => {

    const {data, isFetched} = useOffers({
        collection: '0xa5ae59eee379fc02206d715b9431ffa53507c152',
        includeExpired: false
    });

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>

        <ConnectButton/>

        <div style={{fontWeight: 'bold', marginBottom: '30px'}}>{data?.length} Offers</div>

        <div>{data?.map((offer: Offer, idx) => {
            return <div key={idx}>
                {offer.status} - {`${formatEther(offer.offer.price)} ETH`}<ExecuteOffer offer={offer}/>
            </div>
        })}</div>
    </div>
}

interface Props {
    offer: Offer;
}

const ExecuteOffer: React.FC<Props> = ({offer}) => {

    // Docs https://niftyapes.readme.io/reference/usebuywithfinancing
    // Executes a loan
    const {write} = useBuyWithFinancing({
        offer: offer,
        signature: offer.signature,
    })

    if (offer.status === "ACTIVE") {
        return <button onClick={() => write?.()}>Buy with Financing</button>
    }
    return null;
}


export default UseBuyWithFinancing;
