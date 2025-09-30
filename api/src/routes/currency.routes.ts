import { Router } from 'express';
import CurrencyController from '../controllers/currency.controller';

const router = Router();

router.get('/list', CurrencyController.getAllCurrenciesComparedToBRL);

export default router;