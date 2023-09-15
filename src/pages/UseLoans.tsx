import React from 'react';
import {Loan, useLoans} from "@niftyapes/sdk";
import {formatEther} from "ethers/lib/utils";

const UseLoans: React.FC = () => {

    // Docs https://niftyapes.readme.io/reference/useloans
    // Loan loans for a given wallet address
    const {data, isFetched} = useLoans({buyer: '0x1d671d1B191323A38490972D58354971E5c1cd2A'});

    if (!isFetched) {
        return <div>Loading...</div>
    }

    return <div>
        <div style={{fontWeight: 'bold', marginBottom: '30px'}}>{data?.length} Loans</div>

        <div>{data?.map((loan: Loan, idx) => {
            return <div key={`loan-${idx}`}>{loan.status}
                <span style={{margin: '10px'}}>Total {`${formatEther(loan.offer.offer.price)} ETH`}</span>
                <span style={{margin: '10px'}}>Payments {loan.paymentHistory.length}</span>
                <span style={{margin: '10px'}}>Principal {`${formatEther(loan.loan.remainingPrincipal)} ETH`}</span>
            </div>
        })
        }
        </div>
    </div>
}

export default UseLoans;