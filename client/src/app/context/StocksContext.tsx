'use client'
import React, { createContext, useState, useEffect, useContext } from "react";

export interface Stock {
  change: number;
  close: number;
  logo?: string;
  name: string;
  stock: string;
}

interface StocksContextType {
  stocks: Stock[];
  loading: boolean;
  error: string | null;
}

const StocksContext = createContext<StocksContextType>({
  stocks: [],
  loading: true,
  error: null,
});

export const StocksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("https://brapi.dev/api/quote/list");
        const data = await response.json();
        if (data.stocks) {
          setStocks(data.stocks);
        }
      } catch (err) {
        setError("Failed to fetch stocks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <StocksContext.Provider value={{ stocks, loading, error }}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocks = () => useContext(StocksContext);