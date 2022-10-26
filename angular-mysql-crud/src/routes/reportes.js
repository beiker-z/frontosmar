const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configuration/db-conf');

//Obtener top 10 de productos
router.get("/TOPPRODUCTO", (req, res) => {
    mysqlConnection.query('CALL sp_top10platillos', (err, rows) => {
        if (!err) { 
            res.send(rows[0]); 
        } else {
            console.log(err);
            res.send('error' + err);    
        }
    });
});



module.exports = router;