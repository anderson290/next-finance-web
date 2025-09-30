import yahooFinance from "yahoo-finance2";

class StockRepository {
  static brazilianTickers = [
    "PETR4.SA",
    "VALE3.SA",
    "ITUB4.SA",
    "BBDC4.SA",
    "ABEV3.SA",
    "BBAS3.SA",
    "ELET3.SA",
    "ELET6.SA",
    "MGLU3.SA",
    "WEGE3.SA",
  ];

  static async findAllStocks() {
    try {
      const results = await Promise.all(
        this.brazilianTickers.map((ticker) =>
          yahooFinance.quoteSummary(ticker, {
            modules: ["price", "summaryDetail"],
          })
        )
      );
      return results;
    } catch (err: any) {
      throw new Error(err.message || "Failed to fetch Brazilian stocks");
    }
  }

  static async findStockByTicker(ticker: string) {
    try {
      const data = await yahooFinance.quoteSummary(ticker, {
        modules: ["price", "summaryDetail"],
      });
      return data;
    } catch (err: any) {
      throw new Error(err.message || "Failed to fetch stock data");
    }
  }
}

export default StockRepository;
