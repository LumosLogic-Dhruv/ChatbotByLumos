export const successResponse = (reply: string) => ({
  success: true,
  reply,
});

export const errorResponse = (message: string) => ({
  success: false,
  error: message,
});
