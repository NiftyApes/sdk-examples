import React from 'react';
import {useOffers, Offer} from "@niftyapes/sdk";
import {formatEther} from "ethers/lib/utils";

const UseOffers: React.FC = () => {

    // Docs https://niftyapes.readme.io/reference/useoffers
    // Loads all active offers for a given collection
    const {data, isFetched} = useOffers({
        collection: '0xa5ae59eee379fc02206d715b9431ffa53507c152',
        includeExpired: false
    });

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>
        <div style={{fontWeight: 'bold', marginBottom: '30px'}}>{data?.length} Offers</div>
        <div>{data?.map((offer: Offer, idx) => {
            return <div key={`offer-${idx}`}>{offer.status}
                <span style={{margin: '10px'}}>Token #{offer.offer.nftId}</span>
                <span style={{margin: '10px'}}>{`${formatEther(offer.offer.price)} ETH`}</span>
            </div>
        })}</div>
    </div>
}

export default UseOffers;