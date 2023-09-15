import React from 'react';
import {Loan, useMakePayment, useLoans} from "@niftyapes/sdk";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {formatEther} from "ethers/lib/utils";
import {BigNumber} from "ethers";

const UseMakePayment: React.FC = () => {

    // Docs https://niftyapes.readme.io/reference/useloans
    // Loan loans for a given wallet address
    const {data, isFetched} = useLoans({buyer: '0x1d671d1B191323A38490972D58354971E5c1cd2A'});

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>

        <ConnectButton/>

        <div style={{fontWeight: 'bold', marginBottom: '30px'}}>{data?.length} Loans</div>

        <div>{data?.map((loan: Loan) => {
            return <div>{loan.offer.offer.nftId}: {`${formatEther(loan.offer.offer.price)} ETH`} <MakePayment
                loan={loan}/></div>
        })}</div>
    </div>
}

interface Props {
    loan: Loan;
}

const MakePayment: React.FC<Props> = ({loan}) => {

    // Docs https://niftyapes.readme.io/reference/usemakepayment
    // Make payment on an existing loan
    const {write} = useMakePayment({
        paymentAmount: BigNumber.from(loan.loan.minimumPrincipalPerPeriod),
        nftContractAddress: loan.offer.offer.nftContractAddress,
        nftId: BigNumber.from(loan.offer.offer.nftId)
    })

    if (loan.status === "ACTIVE") {
        return <button onClick={() => write?.()}>Make Payment</button>
    }
    return null;
}


export default UseMakePayment;
