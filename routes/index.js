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

// GET WHOLE EVENT by id
router.get("/events/:id", eventMustExist, async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(
      `SELECT e.*, f.firstname, f.lastname, f.email, f.confirmed 
      FROM eventlist as e 
      INNER JOIN friendlist AS f ON e.id = f.eventid 
      WHERE e.id = ${id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST EVENT and invitees
router.post("/events", async function (req, res, next) {
  const { event, friends } = req.body;
  try {
    await db(
      `INSERT INTO eventlist (eventname, location, date) VALUES ("${event.eventname}", "${event.location}", "${event.date}");`
    );
    const results = await db(
      `SELECT id from eventlist order by id desc limit 1;`
    );
    const eventid = results.data[0].id;
    for (const friend of friends) {
      await db(
        `INSERT INTO friendlist (firstname, lastname, email, confirmed, eventid) VALUES ("${friend.firstname}", "${friend.lastname}","${friend.email}", 0, ${eventid});`
      );
    }
    res.status(201).send({ message: "Event added!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE EVENT
router.delete("/events/:id", eventMustExist, async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(`DELETE FROM eventlist WHERE id = ${id}`);
    res.send(results.data);
    res.status(201).send({ message: "Event deleted!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//endpoint send invitation that sends email with nodemailer loop // contains url
// create page Confirmation,

// UPDATE ENDPOINT FOR THE EMAIL /friends/id
router.put("/friends/:id", eventMustExist, async (req, res, next) => {
  const { id } = req.params;
  try {
    await db(
      `UPDATE friendlist SET confirmed = !confirmed WHERE eventid = ${id};`
    );
    res.status(201).send({ message: "Friend will come to the event!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
