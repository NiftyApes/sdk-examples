import React from 'react';
import {useERC721Approve} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useWaitForTransaction} from "wagmi";

const UseERC721Approve: React.FC = () => {

    const nftId = "8"
    const nftContractAddress = "0xa608475ec077e10d71db7476745d85f9e860e540"

    // Docs - https://niftyapes.readme.io/reference/useerc721approval
    const {hasCheckedApproval, hasApproval, write, data} = useERC721Approve({nftId, nftContractAddress})
    const approvalRequired = hasCheckedApproval && !hasApproval

    const {
        isLoading: isApproving,
        isSuccess: isApproved,
        isError,
    } = useWaitForTransaction({hash: data?.hash})

    return <div>
        <ConnectButton/>

        <div style={{marginTop: '30px'}}>
            {approvalRequired && <button onClick={() => write?.()}>Approve Transfer</button>}
        </div>
        <div>{isApproving && 'Approving'}</div>
        <div>{isApproved && 'Transfer Approved'}</div>
        <div>{isError && 'Usable to approve transfer at this time'}</div>
    </div>
}

export default UseERC721Approve;