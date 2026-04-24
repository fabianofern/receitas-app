export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export const successResponse = <T>(data: T, message: string = 'Sucesso'): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const paginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string = 'Sucesso'
): ApiResponse<T[]> => ({
  success: true,
  message,
  data,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
});

export const errorResponse = (message: string): ApiResponse => ({
  success: false,
  message,
});
