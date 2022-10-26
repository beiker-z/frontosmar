const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configuration/db-conf');


//crear detalles
router.post('/detalles_compra', (req, res) => {
    let per = req.body;
    console.log('Creando detalle')
    const prueba = mysqlConnection.query('insert into detalles_compra (id_detalle,id_orden,id_producto,cantidad,precio,) values (?,?,?,?,?,?,?)',
        [per.id_detalle, per.id_orden,per.id_producto,per.cantidad,per.precio], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send(prueba[0]);
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});


//Obtener detalles
router.get("/detalles_compra", (req, res) => {
    console.log("Obteniendo Lista detalles");
    mysqlConnection.query('SELECT * FROM libreria.detalles_compra;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener persona por id
router.get("/detalles_compra/:id_detalle", (req, res) => {
    console.log("Obteniendo detalles");
     mysqlConnection.query('Select * from detalles_compra where id_detalle= ?', [req.params.Nit], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar cliente
router.put("/detalles_compra/:id_detalle", (req, res) => {
    console.log("Actualizando detalles");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update detalles_compra set  id_orden = ?, id_producto = ?, cantidad = ?,precio=? where id_detalle= ?',
        [ est.id_orden,est.id_producto,est.cantidad,est.precio, req.params.id_detalle], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("detalles Actualizados ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar detalees
router.delete("/detalles_compra/:id_detalle", (req, res) => {
    console.log("Eliminando detalles");
    mysqlConnection.query('delete from detalles_compra where detalles_compra.id_detalle = ?',
        [req.params.Nit], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("detalles Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;