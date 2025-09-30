import { Router } from 'express';
import stockRoutes from './stock.routes';

const router = Router();
router.use('/stocks', stockRoutes);

export default router;