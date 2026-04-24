import { Request, Response, NextFunction } from 'express';
import { updateUsuarioSchema, updatePreferenciasSchema } from './usuarios.types';
import { getUsuarioById, updateUsuario, updatePreferencias } from './usuarios.service';
import { successResponse } from '../../shared/utils/api-response';

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUsuarioById(req.user!.id);
    res.json(successResponse(user));
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = updateUsuarioSchema.parse(req.body);
    const user = await updateUsuario(req.user!.id, data);
    res.json(successResponse(user, 'Perfil atualizado com sucesso'));
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = updatePreferenciasSchema.parse(req.body);
    const user = await updatePreferencias(req.user!.id, data);
    res.json(successResponse(user, 'Preferências atualizadas com sucesso'));
  } catch (error) {
    next(error);
  }
};
