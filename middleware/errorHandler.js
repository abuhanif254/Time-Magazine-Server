function errorHandler(err, req, res, next) {
  const statusCode = typeof err?.statusCode === 'number' ? err.statusCode : 500;
  const message = err?.message ?? 'Server error';

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };

