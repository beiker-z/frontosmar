const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configuration/db-conf');




//Obtener persona
router.get("/login", (req, res) => {
    console.log("Obteniendo Lista login");
    mysqlConnection.query('CALL login', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

module.exports = router;
