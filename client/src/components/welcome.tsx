import React, { ChangeEvent, Context, useContext } from "react";
import { Icon } from "@iconify/react";
import { truncateAddr } from "utils/helper";
import { Loader } from "./loader";
import { TransactionContext } from "context/transactionContext";
import { TxnContextType } from "utils/types";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

export const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    setFormData,
    formData,
    createTxn,
    submitting,
  } = useContext(TransactionContext as Context<TxnContextType>);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;
    createTxn(formData);
  };

  return (
    <div className="container">
      <div className="flex mf:flex-row flex-col items-start justify-between md:py-20 py-12">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 ">
          <h1 className="text-sxl sm:text-5xl text-gradient py-1">
            Share crypto orange <br /> spread the juice
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Squeeze the Potential, Spread the Wealth: Unleash the Crypto Orange!
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex-row justify-center my-5 btn btn-blue p-3"
            >
              <span>Connect Wallet</span>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>WEB 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end item-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glasmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <Icon fontSize={21} icon="fa-brands:ethereum" color="white" />
                </div>
                <Icon fontSize={17} icon="ph:info-bold" color="white" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {currentAccount ? truncateAddr(currentAccount): 'Connect Wallet'}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {[
              {
                placeHolder: "Which address are you sending to?",
                name: "addressTo",
              },
              {
                placeHolder: "Enter Amount to send in ETH",
                name: "amount",
                step: "0.0001",
                type: "number",
              },
              {
                placeHolder: "Enter the keyword",
                name: "keyword",
                type: "text",
              },
              {
                placeHolder: "Enter Message",
                name: "message",
                type: "text",
              },
            ].map(({ placeHolder, name, step, type }) => (
              <input
                key={name}
                type={type || "text"}
                placeholder={placeHolder}
                name={name}
                value={(formData as any)[name]}
                onChange={(e) => handleChange(e, name)}
                step={step || ""}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent border-none text-white text-sm white-glassmorphism"
              />
            ))}
            <div className="h=[1px] w-full bg-gray-400 my-2" />

            <button
              className="btn flex justify-center gap-4 items-center w-full mt-2 border-[1px] border-[#3d4f7c]"
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
            >
              Send Now
              {submitting && <Loader classNames="h-6 w-6" noPadding={true} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
