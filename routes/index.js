const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const eventMustExist = require("../guards/eventMustExist");

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

// POST EVENT and invitees
router.post("/events", async function (req, res, next) {
  const { event, friend } = req.body;
  try {
    await db(
      `INSERT INTO eventlist (eventname, location, date) VALUES ("${event.eventname}", "${event.location}", "${event.date}");`
    );

    const results = await db(
      `SELECT id FROM eventlist WHERE eventname = "${event.eventname}";`
    );
    const eventid = results.data[0].id;

    await db(
      `INSERT INTO friendslist (firstname, lastname, email, confirmed, eventid) VALUES ("${friend.firstname}", "${friend.lastname}","${friend.email}", 0, ${eventid});`
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

// UPDATE ENDPOINT FOR THE EMAIL /friends/id
router.put("/friends/:id", eventMustExist, async (req, res, next) => {
  const { id } = req.params;
  try {
    await db(
      `UPDATE friendslist SET confirmed = !confirmed WHERE eventid = ${id};`
    );
    res.status(201).send({ message: "Friend will come to the event!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
