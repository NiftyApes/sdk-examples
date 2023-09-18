import React from 'react';
import {useUnderlyingNFTOwner} from "@niftyapes/sdk";

const UseUnderlyingNFTOwner: React.FC = () => {

    // Docs https://niftyapes.readme.io/reference/usenftownership
    // Loads all active offers for a given collection
    const {isEntitledToNft, activeLoanForNft} = useUnderlyingNFTOwner()

    const nftId = "359"
    const nftContractAddress = "0x79464a1f916877bb1402e94ae3d3dd4b9b1f477d"

    const isOwnedByNiftyApes = isEntitledToNft(nftContractAddress, nftId)
    const isActiveLoan = activeLoanForNft(nftContractAddress, nftId)

    return <div>
        <div style={{fontWeight: 'bold', marginBottom: '30px'}}>Checking loan status</div>
        <div>{(isOwnedByNiftyApes && isActiveLoan) ? "This NFT has an active loan" : "No active loans for this NFT"}</div>
    </div>
}

export default UseUnderlyingNFTOwner;