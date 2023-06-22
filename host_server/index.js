const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
const port = 8080;
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const crypto = require('crypto');
const localstorage = {};
const sessionstorage = {};
const verificationstorage = {};
const cookieParser = require('cookie-parser');
const email = require('./email');
const fs = require('fs');


app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "192.168.0.124:19000",
  ],
  credentials: true
}
))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.on('uncaughtException', function (req, res, route, err) {
  log.info('******* Begin Error *******\n%s\n*******\n%s\n******* End Error *******', route, err.stack);
  if (!res.headersSent) {
    return res.send(500, { ok: false });
  }
  res.write('\n');
  res.end();
});


const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
});

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/menu/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, "_"));
  }
});

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/home/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const uploadhome = multer({ storage: storage2 });



//Route connections
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/order');
const menuRoute = require('./routes/menu');
const misc = require('./routes/misc');


app.post("/api/image", upload.single('image'), (req, res) => {
  console.log(req);
  //res.status(200).send('Upload successful');
});



app.post("/api/auth/resetpass", function (req, res) {
  let key = req.body.key;
  let pass = req.body.password;

  if (typeof localstorage[key] === "undefined") {
    res.json({ message: "Authentication token expired! Please try again." });
    return;
  }

  let email = localstorage[key];

  con.query(`UPDATE users SET password=SHA2(?,0) WHERE email=?`, [pass, email], function (err) {
    if (err !== null) {
      console.log(err);
      res.json(err);
    } else
      delete localstorage[key];
    res.json({ message: "Password reset successfully!" });
  });
});




app.post("/api/email", function (req, res) {
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});



//Handling select queries
app.post("/api/select", function (req, res) {
  //Permission check for admin and manager, disabled for mobile compatibility
  /* if(!(req.cookies.userID == 1 || req.cookies.userID == 2)){
    res.status(401).send();
    return;
  }

  if (typeof sessionstorage[req.cookies.auth] === "undefined"){
    res.status(401).send();
    return;
  } */

  let sql = ``;
  let columns = req.body.select.replace(/;|'|"|`|-/g, '');
  let table = req.body.from.replace(/;|'|"|`|-/g, '');
  if (typeof req.body.where === 'undefined')
    sql = `SELECT ${columns} FROM ${table};`;
  else {
    let where = req.body.where.replace(/;|'|`|-/g, '')
    sql = `SELECT ${columns} FROM ${table} WHERE ${where} ;`;
  }
  con.query(sql, function (err, result) {
    if (err !== null) {
      console.log(err);
      res.status(500).send();
    } else
      res.json(result);
  });
});

//GET endpoints




app.use("/api/customer", customerRoute);
app.use("/api/order", orderRoute);
app.use("/api/menu", menuRoute);
app.use("/api/misc", misc);






//Handling insert queries
app.post("/api/insert", function (req, res) {

  //Permission check for admin and manager, disabled for mobile compatibility
  /* if(!(req.cookies.userID == 1 || req.cookies.userID == 2)){
    res.status(401).send();
    return;
  }

  if (typeof sessionstorage[req.cookies.auth] === "undefined"){
    res.status(401).send();
    return;
  } */

  let sql = ``;
  let values = req.body.values.replace(/;|'|`/g, '');
  let table = req.body.table.replace(/;|'|"|`/g, '');
  sql = `INSERT INTO ${table} VALUES ${values};`;
  con.query(sql, [req.params.where], function (err, result, fields) {
    if (err !== null) {
      console.log(err);
      res.json(err);
    } else
      res.json(result.insertId);
  });
});



app.post("/api/insert-menu-item", upload.single('image'), (req, res) => {

  //Permission check for admin and manager, disabled for mobile compatibility
  /* if(!(req.cookies.userID == 1 || req.cookies.userID == 2)){
    res.status(401).send();
    return;
  }

  if (typeof sessionstorage[req.cookies.auth] === "undefined"){
    res.status(401).send();
    return;
  } */

  let sql = ``;
  let values = req.body.values.replace(/;|'|`|\?/g, '');
  let table = req.body.table.replace(/;|'|"|`/g, '');
  sql = `INSERT INTO ${table} VALUES ${values};`;
  con.query(sql, values, function (err, result, fields) {
    if (err !== null) {
      console.log(err);
      res.json(err);
    } else
      res.json(result.insertId);
  });
});



//Handling update queries
app.post("/api/update", function (req, res) {
  //Permission check for admin and manager, disabled for mobile compatibility
  /* if(!(req.cookies.userID == 1 || req.cookies.userID == 2)){
    res.status(401).send();
    return;
  }

  if (typeof sessionstorage[req.cookies.auth] === "undefined"){
    res.status(401).send();
    return;
  } */

  let sql = ``;
  let columns = req.body.columns.replace(/;|'|`/g, '');
  let table = req.body.table.replace(/;|'|"|`/g, '');
  if (typeof req.body.where === 'undefined')
    sql = `UPDATE ${table} SET ${columns};`;
  else {
    let where = req.body.where.replace(/;|'|`/g, '');
    sql = `UPDATE ${table} SET ${columns} WHERE ${where} ;`;
  }

  con.query(sql, function (err, result, fields) {
    if (err !== null) {
      console.log(err);
      res.json(err);
    } else
      res.json(result);
  });
});


app.post("/api/auth", (req, res) => {
  let sql = ``;
  let randomkey;
  let email = req.body.email;
  let password = req.body.password;
  sql = `SELECT userID FROM users WHERE email=? AND password=SHA2(?,0) ;`;
  con.query(sql, [email, password], function (err, result) {
    if (err !== null) {
      console.log(err);
      res.json({ error: "Mysql error" });
      return;
    }
    if (result.length === 0)
      res.json({ error: "User not found" });
    else if (typeof result !== "undefined") {
      /* if (sessions.username===result[0].username){
        console.log("Session already exists");
        return;
      } */
      randomkey = crypto.randomBytes(20).toString('hex');
      sessionstorage[randomkey] = result[0].userID;
      res.status(200).cookie("auth", randomkey, {
        sameSite: 'strict',
        path: "/",
        secure: true,
        expires: new Date(new Date().getTime() + 100000 * 1000),
        httpOnly: true
      });
      res.status(200).cookie("userID", result[0].userID, {
        sameSite: 'strict',
        path: "/",
        secure: true,
        expires: new Date(new Date().getTime() + 100000 * 1000),
        httpOnly: true
      });
      res.send({ userID: result[0].userID });
    } else {
      res.json({ error: "User not found" });
    }

  });
});



app.get("/api/auth/read", (req, res) => {
  res.send(req.cookies.userID);
});



app.post("/api/auth/validate", (req, res) => {
  const auth = req.cookies.auth;
  if (typeof sessionstorage[auth] === "undefined") {
    res.status(202).clearCookie("auth");
    res.status(202).clearCookie("userID");
    res.send("Expired");
  } else {
    res.status(202).cookie("userID", sessionstorage[auth], {
      sameSite: 'strict',
      path: "/",
      secure: true,
      expires: new Date(new Date().getTime() + 100000 * 1000),
      httpOnly: true
    });
    res.send({ userID: sessionstorage[auth] })
  }
});

app.post("/api/auth/logout", (req, res) => {
  const auth = req.cookies.auth;
  res.status(202).clearCookie("auth");
  res.status(202).clearCookie("userID");
  res.send();
});


app.post("/api/auth/confirmemail", async (req, res) => {
  try {
    //Check if email is valid
    let useremail = req.body.email;
    if (typeof useremail === "undefined") {
      return;
    }

    const exists = await con.promise().query(`SELECT userID FROM users WHERE email=?`, [useremail]).then(([result, fields]) => {
      console.log(result.length);
      if (result.length != 0)
        return true;
      else
        return false;
    }).catch((err) => { console.log(err); return true; });

    if (exists) { //Email already exists
      res.status(418).send();
      return;
    }

    //Generate code
    let code = Math.floor(100000 + Math.random() * 900000);
    verificationstorage[code] = useremail;

    //Setup email
    let mailOptions = {
      from: process.env.EMAIL2_USER,
      to: useremail,
      subject: "Verify your email!",
      text: email.validateEmailText(code),
      html: email.validateEmailHtml(code)
    }

    //Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(504).send();
        return;
      }
    });

    setTimeout(() => { delete verificationstorage[code]; }, 10000000) //Expire code after 10 minutes
    res.status(202).send();
  } catch (err) {
    console.log(err);
  }
});


app.post("/api/auth/registration", (req, res) => {
  try {
    var reg = req.body;

    //Check for valid code
    if (typeof reg.code === "undefined") {
      res.status(504).send({ error: "Invalid code provided!" });
      return;
    }

    if (reg.email !== verificationstorage[reg.code]) {
      res.status(504).send({ error: "Invalid code provided!" });
      return;
    }



    if (reg.specialInstructions === "")
      reg.specialInstructions = null;

    if (reg.buildingName === "")
      reg.buildingName = null;

    if (reg.flatNumber === "")
      reg.flatNumber = null;

    console.log(reg);
    //Execute transaction
    con.getConnection(function (err, conn) {
      if (err) { throw err; }
      conn.beginTransaction(function (err) {
        if (err) { throw err; }

        conn.execute("INSERT INTO users VALUES (DEFAULT,?,SHA2(?,0))", [reg.email, reg.password], function (err, result) {
          if (err) {
            console.log(err);
            conn.rollback();
            res.send("Something went wrong!");
            throw new Error("Something went wrong in users!");
          }
          conn.execute("INSERT INTO customers VALUES (?,?,?,DEFAULT)", [result.insertId, reg.firstName, reg.lastName], function (err) {
            if (err) {
              console.log(err);
              conn.rollback();
              res.send("Something went wrong!");
              throw new Error("Something went wrong in customers!");
            }
          });
          conn.execute("INSERT INTO address VALUES (?,?,?,?,?,?,?,?,?,?)", [result.insertId, reg.street, reg.streetNumber,
          reg.city, reg.area, reg.postal, reg.phone, reg.buildingName, reg.flatNumber, reg.specialInstructions], function (err) {
            if (err) {
              console.log(err);
              conn.rollback();
              res.send("Something went wrong!");
              throw new Error("Something went wrong in address!");
            }
          });
        });
        conn.commit();
      });
      conn.release();
    });
    delete verificationstorage[reg.code];
    res.status(200).send({ status: "success" })

  } catch (error) {
    console.log(error);
  }

});


app.post("/api/auth/reset", (req, res) => {
  let useremail = req.body.email;
  if (typeof useremail === "undefined" || useremail === "" || useremail === null) {
    res.status(418).send();
    return;
  }
  con.query("SELECT email,firstName FROM users NATURAL JOIN customers WHERE email=? LIMIT 1", useremail, function (err, result) {
    if (result.length === 0) //check for null returns
      return;
    if (result[0].email === useremail) {

      let code = Math.floor(100000 + Math.random() * 900000);
      verificationstorage[code] = useremail;
      let user = result[0].firstName;


      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: useremail,
        subject: "Request to reset your password",
        text: email.resetEmailText(user, code),
        html: email.resetEmailHtml(user, code)
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error)
          console.log(error);
      });

      setTimeout(() => { delete verificationstorage[code]; }, 10000000) //Expire code after 10 minutes
      res.status(202).send();
    } else {
      return;
    }
  });
});

app.post("/api/auth/reset-code", (req, res) => {
  const code = req.body.code;
  const email = req.body.email;
  if (typeof code === "undefined" || code === "" || code === null) {
    res.status(418).send();
    return;
  }
  if (typeof verificationstorage[code] === "undefined") {
    res.status(418).send();
    return;
  } else if (verificationstorage[code] === email) {
    res.status(200).json({ status: true });
  }
});

app.post("/api/auth/reset-pass", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const code = req.body.code;

  if (password.length < 8 || password.length > 16) {
    res.json({ message: "Password must be between 8 and 16 characters long!" });
    return;
  }

  if (typeof code === "undefined" || code === "" || code === null) {
    res.status(418).send();
    return;
  }
  if (typeof verificationstorage[code] === "undefined") {
    res.status(418).send();
    return;
  } else if (verificationstorage[code] === email) {
    con.execute("SELECT email FROM users WHERE password=SHA2(?,0) AND email=?", [password, email], function (err, result) {
      if (err) {
        console.log(err);
        res.status(503).send();
        return;
      }

      if (result.length > 0) {
        res.status(200).json({ message: "Your new password must be different from your old one!" });
        return;
      }
    });

    con.execute("UPDATE users SET password=SHA2(?,0) WHERE email=?", [password, email], function (err) {
      if (err) {
        console.log(err);
        res.status(503).send();
        return;
      }
      res.status(200).json({ status: true });
      delete verificationstorage[code];
    });
  }
});

app.get("/api/time", (req, res) => {
  const now = new Date();
  const object = {
    hours: now.getHours(),
    mins: now.getMinutes(),
    secs: now.getSeconds(),
    day: now.getDay(),
  }
  res.send(object);
})

//JSON Manipulation

app.post("/api/json/config", (req, res) => {
  if (req.cookies.userID !== "1")
    return;
  try {
    fs.readFile("../public/config/config.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(503).send();
        return;
      }
      let json = JSON.parse(data);
      json[req.body.key] = req.body.value;
      console.log(json);
      if (typeof req.body.key2 !== "undefined") {
        json[req.body.key2] = req.body.value2;
      }
      fs.writeFile("../public/config/config.json", JSON.stringify(json), (err) => {
        if (err) {
          console.log(err);
          res.status(503).send();
          return;
        }
      });
      res.status(200).send();
    });
  } catch (err) {
    console.log(err);
    res.status(503).send();
  }
});

app.post("/api/json/image", uploadhome.single('image'), (req, res) => {
  if (req.cookies.userID !== "1")
    return;
  try {
    fs.readFile("../public/config/config.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(503).send();
        return;
      }
      let json = JSON.parse(data);
      json[req.body.time] = req.body.imagename;
      fs.writeFile("../public/config/config.json", JSON.stringify(json), (err) => {
        if (err) {
          console.log(err);
          res.status(503).send();
          return;
        }
      });
      res.status(200).send();
    });
  } catch (err) {
    console.log(err);
    res.status(503).send();
  }
});


app.post("/api/editopen", (req, res) => {
  if (req.cookies.userID !== "1")
    return;
  try { 
    const sql = "UPDATE restaurant SET open=?";
    con.execute(sql, [req.body.open], function (err) {
      if (err) 
        console.log(err);
    });

    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});


app.listen(port, function () {
  console.log(process.env.DB_HOST);
  console.log(`Listening on port ${port}!`);
});