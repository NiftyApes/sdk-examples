import React from 'react';
import {useOffers, Offer} from "@niftyapes/sdk";

const UseOffers: React.FC = () => {

    const collection = '0x01c7851ae4d42f7b649ce168716c78fc25fe3d16'
    const {data, isFetched} = useOffers({collection, includeExpired: false});

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>
        <div>{data?.length} offers</div>

        <div>{data?.map((offer: Offer) => {
            return <div>{offer.status} - Price - {offer.offer.price}</div>
        })}</div>

    </div>
}

export default UseOffers;