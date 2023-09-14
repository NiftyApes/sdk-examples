import React, {useState} from 'react';
import {Offer, useBuyWithFinancing, useOffers} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const UseBuyWithFinancing: React.FC = () => {

    const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
    const collection = '0xa5ae59eee379fc02206d715b9431ffa53507c152'
    const {data, isFetched} = useOffers({collection, includeExpired: false});

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>

        <ConnectButton/>
        <div style={{marginTop: '30px'}} />

        <div>{data?.length} offers</div>

        {activeOffer && <ExecutelOffer offer={activeOffer}/>}

        <div>{data?.map((offer: Offer, idx) => {
            return <div key={idx}>{offer.status} - Price - {offer.offer.price} - <button
                onClick={() => setActiveOffer(offer)}>Select Offer</button></div>
        })}</div>

    </div>
}

interface Props {
    offer: Offer;
}

const ExecutelOffer: React.FC<Props> = ({offer}) => {

    const { write } = useBuyWithFinancing({
        offer: offer,
        signature: offer.signature,
    })

    return <button onClick={() => write?.()}>Buy with Financing ${offer.offer.price}</button>
}


export default UseBuyWithFinancing;
