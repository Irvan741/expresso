export default function errorHandler(err, req, res, next) {
  console.error(err.message);
  res.status(400).json({
    status: 'error',
    message: err.message || 'Something went wrong',
  });
}
