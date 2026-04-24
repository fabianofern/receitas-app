import prisma from '../../config/database';
import { AppError } from '../../shared/middlewares/error.middleware';
import { UpdateUsuarioInput } from './usuarios.types';

export const getUsuarioById = async (userId: string) => {
  const user = await prisma.usuario.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      nome: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError('Usuário não encontrado', 404);
  }

  return user;
};

export const updateUsuario = async (userId: string, data: UpdateUsuarioInput) => {
  const user = await prisma.usuario.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      nome: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

// Preferências foram removidas para simplificação modular. 
// Mantendo o tipo vazio para não quebrar a API de perfil por enquanto, 
// mas sem lógica de atualização de campos que não existem mais.
export const updatePreferencias = async (userId: string, _data: any) => {
  return getUsuarioById(userId);
};
