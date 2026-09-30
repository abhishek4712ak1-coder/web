export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: 'Resource not found.',
    path: req.originalUrl,
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong.',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
