import React, { Context, ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "utils/constants";
import { Formdata, Transaction, TxnContextType } from "utils/types";

const { ethereum } = window;

const ErrorMsgs = {
  INSTALL_METAMASK: "Please install metamask",
  NO_ETH_OBJ: "No ethereum object.",
  SAME_WALLET: "You are sending to the same account you're connected to",
  USER_DENIED: "User denied transaction signature",
};

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const txnContract = new ethers.Contract(contractAddress, contractAbi, signer);
  return txnContract;
};

export const TransactionContext: Context<TxnContextType | {}> = createContext(
  {}
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [allTxns, setAllTxns] = useState<Transaction[]>([]);
  const intialFormValues = {
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  };
  const [formData, setFormData] = useState<Formdata>(intialFormValues);

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert(ErrorMsgs.INSTALL_METAMASK);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTxns();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert(ErrorMsgs.INSTALL_METAMASK);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error(ErrorMsgs.NO_ETH_OBJ);
    }
  };

  const clearForm = () => {
    setFormData(intialFormValues);
  };

  const createTxn = async (formData: Formdata) => {
    try {
      if (!ethereum) return alert(ErrorMsgs.INSTALL_METAMASK);
      const { addressTo, amount, keyword, message } = formData;
      if (addressTo.toLowerCase() === currentAccount.toLowerCase()) {
        alert(ErrorMsgs.SAME_WALLET);
        return;
      }
      setSubmitting(true);
      const parsedAmount = ethers.parseEther(amount);

      const txnContract = await getEthereumContract();

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //21,000 GWEI
            value: ethers.hexlify(ethers.toUtf8Bytes(amount)),
          },
        ],
      });

      const txn = await txnContract.createTxn(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      await txn.wait();

      const newTxn = {
        addressTo,
        addressFrom: currentAccount,
        timeStamp: new Date().toLocaleString(),
        amount,
        message,
        keyword,
        id: Number(new Date()),
      };
      setAllTxns((prev) => [...prev, newTxn]);
      const _txnCount = await txnContract.getTxnCount();
      console.log({ _txnCount });
      setSubmitting(false);
      clearForm();
    } catch (error: any) {
      setSubmitting(false);
      console.error(error);
      if (/User denied transaction signature/.test(error.message)) {
        alert(ErrorMsgs.USER_DENIED);
      }
    }
  };

  const getAllTxns = async () => {
    try {
      if (!ethereum) return alert(ErrorMsgs.INSTALL_METAMASK);
      const txnContract = await getEthereumContract();
      const txn = await txnContract.getAllTxns();
      const formattedTxn = txn.map((t: any) => ({
        addressTo: t.receiver,
        addressFrom: t.sender,
        timeStamp: new Date(Number(t.timeStamp) * 1000).toLocaleString(),
        amount: ethers.formatEther(t.amount),
        message: t.message,
        keyword: t.keyword,
        id: Number(t.timeStamp),
      }));

      setAllTxns(formattedTxn);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        createTxn,
        submitting,
        allTxns,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
