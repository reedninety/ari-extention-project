const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const eventMustExist = require("../guards/eventMustExist");
require("dotenv").config();
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const nodemailer = require("nodemailer");

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
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// function to send email
function sendEmail(receiver, eventid, eventname, location, date, firstname) {
  let confirmationLink = `http://localhost:5173/events/${eventid}/confirm?email=${receiver}`;
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  try {
    const info = transporter.sendMail(
      {
        from: `Arianne Napa <${EMAIL_USER}>`,
        to: receiver,
        subject: "You are invited to a new event!",
        text: `
        Dear ${firstname},
        I am glad to invite you to join the ${eventname} event at ${location} on ${formattedDate}.
        Please confirm your presence to the event by clicking on the link: ${confirmationLink}`,
      },
      (error, info) => {
        if (error) {
          console.error("Error occurred:", error.message);
        } else {
          console.log("Email sent:", info.response);
        }
      }
    );
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

router.get("/send-email/:id", eventMustExist, async function (req, res, next) {
  const { id } = req.params;
  try {
    const results =
      await db(`SELECT e.eventname, e.location, e.date, f.firstname, f.email, f.confirmed 
    FROM eventlist AS e 
    LEFT JOIN friendlist AS f ON e.id = f.eventid 
    WHERE e.id = ${id} AND confirmed = 0;`);

    results.data.forEach(({ email, eventname, location, date, firstname }) => {
      sendEmail(email, id, eventname, location, date, firstname);
    });

    res.status(200).send("Emails sent successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//endpoint after they click on the link
router.put("/events/:id/:email", eventMustExist, async (req, res, next) => {
  const { id, email } = req.params;

  try {
    await db(
      `UPDATE friendlist SET confirmed = 1 WHERE eventid = ${id} AND email = "${email}";`
    );
    res.status(201).send({ message: "Friend will come to the event!" });
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;
