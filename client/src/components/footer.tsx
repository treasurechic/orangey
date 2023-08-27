import React from "react";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between flex-col items-center p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <Logo />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Market
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Exchange
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Tutorials
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Wallet
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 flex-col mt-5 text-white text-sm">
        <p>Come join us</p> <p>Orangey@crypto.com</p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
      <div className="sm:w-[90%] w-full flex justify-between items-center text-white text-sm mt-5">
        <p>@crypto.com {new Date().getFullYear()}</p>
        <p>All Right Reserved</p>
      </div>
    </div>
  );
};
