import { Router } from 'express';
import { createExecucao, getExecucoes, getDashboardFinanceiro } from './execucoes.controller';

const router = Router();



router.post('/', createExecucao);
router.get('/', getExecucoes);
router.get('/dashboard', getDashboardFinanceiro);

export default router;
