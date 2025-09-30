import StockRepository from '../repositories/stock.repository';

class StockService {
  static async getAll(ticker: string) {
    // Aqui você poderia filtrar ou formatar os dados antes de devolver
    const data = await StockRepository.findAll(ticker);
    return data;
  }
}

export default StockService;