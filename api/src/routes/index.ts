import { Router } from 'express';
import stockRoutes from './stock.routes';

const router = Router();

router.use('/stocks', stockRoutes);
router.use('/', (_, res) => {
  res.send('API is running');
});
export default router;