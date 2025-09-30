import StockRepository from '../repositories/stock.repository';

class StockService {
  static async getAllStocks() {
    const data = await StockRepository.findAllStocks();
    return data;
  }

  static async getStockByTicker(ticker: string) {
    const data = await StockRepository.findStockByTicker(ticker);
    return data;
  }
}

export default StockService;