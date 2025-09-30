import { Request, Response, NextFunction } from 'express';
import StockService from '../services/stock.service';

class StockController {
  static async getAllStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const stocks = await StockService.getAllStocks();
      res.json(stocks);
    } catch (err) {
      next(err);
    }
  }

  static async getStockByTicker(req: Request, res: Response, next: NextFunction) {
    try {
      const ticker = req.query.ticker as string;
      if (!ticker) {
        return res.status(400).json({ message: 'Ticker is required' });
      }
      const stock = await StockService.getStockByTicker(ticker);
      res.json(stock);
    } catch (err) {
      next(err);
    }
  }
}

export default StockController;