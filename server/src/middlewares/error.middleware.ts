import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  res.status(500).json(errorResponse(err.message || 'Internal server error'));
};
