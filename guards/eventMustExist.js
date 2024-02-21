const db = require("../model/helper");

const eventMustExist = async function (req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(`SELECT * FROM eventlist WHERE id = ${id}`);
    if (results.data.length) {
      req.event = results.data[0];
      next();
    } else {
      res.status(404).send({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = eventMustExist;
