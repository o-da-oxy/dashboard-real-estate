export const handleErrors = (err, res) => {
  if (err.name === 'SequelizeValidationError' && err.errors[0].type === 'notNull Violation') {
    const errorMessage = err.errors[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  if (err.name === 'SequelizeValidationError') {
    if (err.errors && err.errors.length > 0) {
      const notNullError = err.errors.find(e => e.validatorKey === 'notNull');
      if (notNullError) {
        // Обработка ошибки notNull
        console.log(notNullError.message);
        return res.status(400).json({ error: notNullError.message });
      } else {
        // Обработка других ошибок валидации
        return res.status(400).json({ error: 'Validation error' });
      }
    }
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    // Обработка ошибки уникальности
    const errorMessage = err.errors[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  console.log(err.message);
  return res.status(500).json({ error: 'Internal server error' });
};
