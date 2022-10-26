const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configuration/db-conf');


//crear cliente
router.post('/cliente', (req, res) => {
    let per = req.body;
    console.log('Creando cliente')
         mysqlConnection.query('insert into cliente (direccion,nombre,telefono,correo_electronico,NIT) values (?,?,?,?,?)',
        [per.direccion,per.nombre,per.telefono,per.correo_electronico,per.NIT], (err, result) => {
            if (!err) {
                res.status(201).send("cliente Creado ");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});


//Obtener cliente
router.get("/cliente", (req, res) => {
    console.log("Obteniendo Lista clente");
    mysqlConnection.query('SELECT * FROM libreria.cliente', (err, rows, fields) => {
        if (!err) {
            res.status(200).send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener persona por id
router.get("/cliente/:id_cliente", (req, res) => {
    let id=req.params.id_cliente
    mysqlConnection.query('Select * from cliente where id_cliente= ?', [id], (err, rows) => {
        if (!err) {
            console.log(rows)
            res.send(rows[0]);

        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
//Obtener persona por id
router.get("/clientenit/:NIT", (req, res) => {
    let id=req.params.NIT
    mysqlConnection.query('Select * from cliente where NIT= ?', [id], (err, rows) => {
        if (!err) {
            console.log(rows)
            res.send(rows[0]);

        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
//Actualizar cliente
router.put("/cliente/:id_cliente", (req, res) => {
    console.log("Actualizando cliente");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update cliente set  Nombre = ?, Direccion = ?, Telefono = ?,Correo_Electronico=? where Nit= ?',
        [ est.Nombre,est.Direccion,est.Telefono,est.Correo_Electronico, req.params.id_cliente], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("cliente Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar cliente
router.delete("/cliente/:id_cliente", (req, res) => {
    console.log("Eliminando cliente");
    mysqlConnection.query('delete from cliente where cliente.id_cliente = ?',
        [req.params.Nit], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("cliente Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;