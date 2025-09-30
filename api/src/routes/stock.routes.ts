import { Router } from 'express';
import StockController from '../controllers/stock.controller';

const router = Router();

router.get('/', StockController.getAllStocks); // GET /api/stocks?ticker=AAPL

export default router;