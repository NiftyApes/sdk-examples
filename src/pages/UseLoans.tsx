import React from 'react';
import {Loan, useLoans} from "@niftyapes/sdk";

const UseLoans: React.FC = () => {

    const buyer = '0x1d671d1B191323A38490972D58354971E5c1cd2A'
    const {data, isFetched} = useLoans({buyer});

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>
        <div>{data?.length} loans</div>

        <div>{data?.map((loan: Loan) => {
            return <div>{loan.status} - Remaining Principal - {loan.loan.remainingPrincipal}</div>
        })}</div>

    </div>
}

export default UseLoans;