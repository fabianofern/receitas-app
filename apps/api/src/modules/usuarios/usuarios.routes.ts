import { Router } from 'express';
import { getMe, updateMe, updatePreferences } from './usuarios.controller';

const router = Router();

router.get('/me', getMe);
router.put('/me', updateMe);
router.put('/me/preferencias', updatePreferences);

export default router;
