# Owl Mail

Ever thought about how much time and effort it takes just to invite friends for a pizza? Long messages back and forth, waiting anxiously for their response... Well, say goodbye to all that hassle! Introducing the Owl App, designed to simplify event planning and make inviting friends in few clicks!

## Built with

- React.js (^18.2.0)
- React Router (^6.22.1)
- HTML, CSS, Bootstrap, Font Awesome
- MySQL (^2.18.1)
- Node.js (20.9.0)
- Express.js (^4.16.1)
- Nodemailer (^6.9.10)

## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server). Check if the following dependencies are installed, otherwise install with the commands in the parenthesis:

- Express.js (`npm install express`)
- Nodemon (`nnpm install -g nodemon`)
- Nodemailer (`npm install nodemailer`)

`cd client` and run `npm install` install dependencies related to React (the client). Check if React Router is installed, otherwise `npm install react-router-dom`.

### Database Prep

[database](db-modeling.png)

Create `.env` file in project directory and add

```
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=invitations
  DB_PASS=YOUR_PASSWORD
  EMAIL_USER=YOUR_EMAIL
  EMAIL_PASS=EMAIL
```

(replace `YOUR_PASSWORD` with your actual password and `YOUR_EMAIL` with your email address)

Type `mysql -u root -p` in the terminal to access MySQL and type your password.

In the MySQL terminaL, type `CREATE database invitations;` to create a database in MySQL.

Run `npm run migrate` in your terminal in the project folder. This will create 2 tables, the eventlist and the friendlist.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.

### Note for Gmail service

If you use Gmail to send the email, you need an App Password your gmail account. Please follow the instructions [here](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628).
