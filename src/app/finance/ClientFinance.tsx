'use client';

import { IFinanceQuoteResponse } from "../utils/types/finance.type";

export const ClientFinance = ({ currentQuote }: { currentQuote: IFinanceQuoteResponse }) => {

  return (
    <div>
        <h2>{currentQuote.results[0].longName}</h2>
    </div>
  );
}   