module.exports = (req, res, next) => {
  const secretWord = req.searchParams.get('secret');
  if (secretWord !== 'trump2024') {
    throw { status: 401, message: 'Go away and stick your dirty nose elsewhere'};
  }

  next();
};
