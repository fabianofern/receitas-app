import { create } from 'zustand';
import api from '../lib/api';

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  toolcenterId?: string;
  toolRole?: 'ADMINISTRADOR' | 'OPERADOR' | 'CONSULTA';
  orcamentoMensalMeta?: number | null;
}

interface UserState {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessDenied: boolean;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  accessDenied: false,
  fetchUser: async () => {
    try {
      const response = await api.get('/me');
      set({ user: response.data.data, isAuthenticated: true, isLoading: false, accessDenied: false });
    } catch (error: any) {
      if (error.response?.status === 403) {
        set({ user: null, isAuthenticated: false, isLoading: false, accessDenied: true });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false, accessDenied: false });
      }
    }
  },
  clearUser: () => set({ user: null, isAuthenticated: false, isLoading: false, accessDenied: false }),
}));
