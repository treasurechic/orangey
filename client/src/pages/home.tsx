import React from "react";

//Custom components
import { Navbar } from "../components/navbar";
import { Welcome } from "../components/welcome";
import { Services } from "../components/services";
import { Transactions } from "../components/transactions";
import { Footer } from "../components/footer";

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};
