import { TransactionContext } from "context/transactionContext";
import { useFetch } from "hooks/useFetch";
import React, { Context, useContext } from "react";
import { truncateAddr } from "utils/helper";
import { Transaction, TxnContextType } from "utils/types";

export const Transactions = () => {
  const { currentAccount, allTxns } = useContext(
    TransactionContext as Context<TxnContextType>
  );

  return (
    <div className="gradient-bg-transactions">
      <div className="flex w-full justify-center items-center container">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {currentAccount ? (
            <h3 className="text-white text-3xl my-2">Latest Transactions</h3>
          ) : (
            <h3 className="text-white text-3xl my-2">
              Connect your account to see latest transactions
            </h3>
          )}
          <div className="flex flex-wrap justify-center items-center mt-10">
            {allTxns
              .slice()
              .reverse()
              .map((transaction) => (
                <TransactionCard {...transaction} key={transaction.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionCard = ({
  message,
  timeStamp,
  addressFrom,
  amount,
  addressTo,
  keyword,
}: Transaction) => {
  const gifUrl = useFetch({ query: keyword });
  return (
    <div className="bg-[#181918] m-4 flex flex-1  lg:max-w-[300px] md:max-w-[500px] min-w-[300px] max-w-[100%] flex-col  p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <p className="text-white text-base">
            Sender:{" "}
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blanc"
              rel="noopener noreferrer"
              className="hover:text-orange-400"
            >
              {truncateAddr(addressFrom)}
            </a>
          </p>
          <p className="text-white text-base">
            Receiver:{" "}
            <a
              href={`https://sepolia.etherscan.io/address/${addressTo}`}
              target="_blanc"
              rel="noopener noreferrer"
              className="hover:text-orange-400"
            >
              {truncateAddr(addressTo)}
            </a>
          </p>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl}
          alt="Gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover "
        />
        <div className="bg-black p-3 px-5 rounded-3xl w-max -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timeStamp}</p>
        </div>
      </div>
    </div>
  );
};
