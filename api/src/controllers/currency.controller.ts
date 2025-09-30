import { Request, Response, NextFunction } from 'express';
import CurrencyService from '../services/currency.service';

class CurrencyController {
  static async getAllCurrenciesComparedToBRL(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CurrencyService.getAllCurrenciesComparedToBRL();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default CurrencyController;