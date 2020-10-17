module.exports.getSecret = (req, res) => {
    res.status(200).send({ data: `Good job, your id is ${req.user.id}!` });
  };