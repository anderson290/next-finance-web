import { Router } from 'express';
import StockController from '../controllers/stock.controller';

const router = Router();

router.get('/', StockController.getAllStocks); // GET /api/stocks
router.get('/:ticker', StockController.getStockByTicker); // GET /api/stocks/:ticker

export default router;