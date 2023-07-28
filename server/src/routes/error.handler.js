export const errorHandler = (err, req, res) => {
  console.error(err.stack);
  res.json({
    errors: [err.message],
  });
};
