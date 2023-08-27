import React from "react";

import { HomePage } from "./pages/home";
import { TransactionProvider } from "context/transactionContext";

const App = () => {
  return (
    <TransactionProvider>
      <HomePage />
    </TransactionProvider>
  );
};

export default App;
