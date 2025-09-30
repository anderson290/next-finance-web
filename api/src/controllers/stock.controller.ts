import { Request, Response, NextFunction } from 'express';
import StockService from '../services/stock.service';

class StockController {
  static async getAllStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const ticker = req.query.ticker as string;
      if (!ticker) {
        return res.status(400).json({ message: 'Ticker is required' });
      }
      const stocks = await StockService.getAll(ticker);
      res.json(stocks);
    } catch (err) {
      next(err);
    }
  }
}

export default StockController;