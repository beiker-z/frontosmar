const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configuration/db-conf');


//crear persona
router.post('/categoria', (req, res) => {
    let per = req.body;
    console.log('Creando categoria')
    mysqlConnection.query('insert into categoria (id_categoria,Nombre) values (?,?,?,?,?,?,?)',
        [per.id_categoria, per.Nombre,], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("categoria Creada ");

            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});


//Obtener persona
router.get("/categoria", (req, res) => {
    console.log("Obteniendo Lista categoria");
    mysqlConnection.query('SELECT * FROM libreria.categoria;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener persona por id
router.get("/categoria/:id_categoria", (req, res) => {
    console.log("Obteniendo categoria");
    mysqlConnection.query('Select * from categoria where id_categoria= ?', [req.params.Nit], (err, rows, fields) => {
        if (!err) {
            res.send(rows[0]);

        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar persona
router.put("/categoria/:id_categoria", (req, res) => {
    console.log("Actualizando categoria");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update categoria set  Nombre = ?, where Nit= ?',
        [ est.Nombre, req.params.id_categoria], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("categoria Actualizada ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar categoria
router.delete("/categoria/:id_categoria", (req, res) => {
    console.log("Eliminando categoria");
    mysqlConnection.query('delete from categoria where persona.id_categoria = ?',
        [req.params.Nit], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("categoria Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;