const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post("/data", (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pan = req.body.pan;
    const age = req.body.age;
    const pass = req.body.pass;

    const sql = 'INSERT INTO data (name,email,pan,age,password) VALUES (?,?,?,?,?)';
    const delet = 'DROP TABLE data';
    if (name === "" || email === "" || pan === "" || age === "" || pass === "") {
        res.send(false);
    }
    pool.query(sql, [name,email,pan,age,pass], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            // console.log("Success");
            res.send(true);
        }
        return;
    })
})

router.post("/check", (req, res) => {
    const pan = req.body.pan;
    const pass = req.body.pass;
    const sql = "SELECT * FROM data WHERE pan = ? AND password = ?";

    pool.query(sql, [pan,pass], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
    
        if (results.length > 0) {
          return res.send(true);
        } else {
          return res.send(false);
        }
      });
})

router.post("/profile", (req, res) => {
  const pan = req.body.pan;
  const pass = req.body.pass;
    const sql = "SELECT * FROM data WHERE pan = ? AND password = ?";

    pool.query(sql, [pan,pass], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
    
        if (results.length > 0) {
          // console.log(results);
          return res.send(results);
        } else {
          return res.send(false);
        }
      });
})

module.exports = router;