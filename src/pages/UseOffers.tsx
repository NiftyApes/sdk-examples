import React from 'react';
import {useOffers, Offer} from "@niftyapes/sdk";

const UseOffers: React.FC = () => {

    const collection = '0xa5ae59eee379fc02206d715b9431ffa53507c152'
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