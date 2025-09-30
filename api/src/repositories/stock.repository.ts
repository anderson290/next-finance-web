import axios from 'axios';

class StockRepository {
  static async findAll(ticker: string) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        ticker
      )}?range=1y&interval=1d`;

      const response = await axios.get(url);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to fetch stock data');
    }
  }
}

export default StockRepository;