import { Router } from 'express';
import stockRoutes from './stock.routes';
import currencyRoutes from './currency.routes';

const router = Router();

router.use('/stocks', stockRoutes);
router.use('/currency', currencyRoutes);
router.use('/', (_, res) => {
  res.send('API is running');
});
export default router;