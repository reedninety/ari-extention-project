const express = require("express");
const router = express.Router();
const db = require("../model/helper");

const eventMustExist = async function (req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(`SELECT * FROM eventlist WHERE id = ${id}`);
    if (results.data.length) {
      // req.event = results.data[0];
      next();
    } else {
      res.status(404).send({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

// GET EVENTLIST
router.get("/events", async function (req, res, next) {
  try {
    const results = await db("SELECT * FROM eventlist ORDER BY id ASC;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST EVENT
router.post("/events", async function (req, res, next) {
  try {
    const { eventname, location, date } = req.body;
    await db(
      `INSERT INTO eventlist (eventname, location, date) VALUES ("${eventname}", "${location}"," ${date}");`
    );
    res.status(201).send({ message: "Event added!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE EVENT
router.delete("/events/:id", eventMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    // DELETE IN sql
    await db(`DELETE FROM eventlist WHERE id = ${id}`);
    res.status(201).send({ message: "Event deleted!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST INVITEE

router.post("/friends/:id", eventMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, confirmed } = req.body;
    await db(
      `INSERT INTO friends (firstname, lastname, email, confirmed, eventid) VALUES ("${firstname}", "${lastname}", "${email}", 0, ${id});`
    );
    res.status(201).send({ message: "Friends added!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE ENDPOINT FOR THE EMAIL
router.put("/friends/:id/:friendid", eventMustExist, async (req, res, next) => {
  try {
    const { id, friendid } = req.params;

    await db(
      `UPDATE friends SET confirmed = !confirmed WHERE id = ${friendid};`
    );
    res.status(201).send({ message: "Friend will come to the event!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
