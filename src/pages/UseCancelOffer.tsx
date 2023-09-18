import React from 'react';
import {Offer, useCancelOffer, useOffers} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {formatEther} from "ethers/lib/utils";

const UseCancelOffer: React.FC = () => {

    const {data, isFetched} = useOffers({
        collection: '0xa5ae59eee379fc02206d715b9431ffa53507c152',
        includeExpired: false
    });

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>

        <ConnectButton/>

        <div style={{marginTop: '30px'}}>{data?.length} offers</div>

        <div>{data?.map((offer: Offer) => {
            return <div>{offer.status}: {`${formatEther(offer.offer.price)} ETH`} <CancelOffer offer={offer}/></div>
        })}</div>
    </div>
}

interface Props {
    offer: Offer;
}

const CancelOffer: React.FC<Props> = ({offer}) => {

    // Docs https://niftyapes.readme.io/reference/usecancellisting
    // Cancels an active offer
    const {write} = useCancelOffer({offer})

    if (offer.status === "ACTIVE") {
        return <button onClick={() => write?.()}>Cancel Offer</button>
    }
    return null;
}


export default UseCancelOffer;
