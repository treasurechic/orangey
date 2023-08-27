import { SetStateAction } from "react";

export interface Formdata {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

export interface TxnContextType {
  connectWallet: () => Promise<void>;
  createTxn: (f: Formdata) => Promise<void>;
  currentAccount: string;
  formData: Formdata;
  setFormData: React.Dispatch<SetStateAction<Formdata>>;
  submitting: boolean;
  allTxns: Transaction[];
}

export interface Transaction {
  id: number;
  timeStamp: string;
  addressFrom: string;
  addressTo: string;
  amount: string;
  message: string;
  keyword: string;
}
