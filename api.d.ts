export interface ApiError {
  ok: false;
  error_code: number;
  description: string;
}

export interface ApiSuccess<T> {
  ok: true;
  result: T;
}

export type ApiResponse<T> = ApiError | ApiSuccess<T>;
