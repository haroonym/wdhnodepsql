const errorHandler = (err, req, res) => {
  console.log(`Error ====> ${err.message}`.red);
  res.status(500).json({
    code: 500,
    data: 'Server error',
  });
};

const notFoundHandler = (req, res) => {
  console.log(`Not Found ====> ${req.originalUrl}`.blue);
  res.status(404).json({
    code: 404,
    data: 'The requested route does not exist on this server',
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
