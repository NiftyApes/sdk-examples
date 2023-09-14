import React from 'react';
import {Offer, useCancelOffer, useOffers} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {formatEther} from "ethers/lib/utils";

const UseCancelOffer: React.FC = () => {

    const collection = '0xa5ae59eee379fc02206d715b9431ffa53507c152'
    const {data, isFetched} = useOffers({collection, includeExpired: false});

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>

        <ConnectButton/>

        <div style={{marginTop: '30px'}}>{data?.length} offers</div>

        <div>{data?.map((offer: Offer) => {
            return <div>{offer.status} - {`${formatEther(offer.offer.price)} ETH`}<CancelOffer offer={offer}/></div>
        })}</div>
    </div>
}

interface Props {
    offer: Offer;
}

const CancelOffer: React.FC<Props> = ({offer}) => {

    const {write} = useCancelOffer({
        offer: offer.offer,
        signature: offer.signature,
    })

    if (offer.status === "ACTIVE") {
        return <button onClick={() => write?.()}>Cancel Offer</button>
    }
    return null;
}


export default UseCancelOffer;
