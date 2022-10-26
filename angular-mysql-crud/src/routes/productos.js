const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configuration/db-conf');

//Obtener productos
router.get("/productos", (req, res) => {
    console.log("Obteniendo Lista productos");
     mysqlConnection.query('SELECT * FROM libreria.productos', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear productos
router.post('/productos', (req, res) => {
    let per = req.body;
    console.log('Creando productos')
mysqlConnection.query('insert into productos (id_producto,descripcion,precio,stock,id_categoria) values (?,?,?)',
        [per.id_producto, per.descripcion,per.precio,per.stock,per.id_categoria], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("productos Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//obtener productos por Id
router.get("/revision/:id_producto", (req, res) => {
    console.log("Obteniendo producto");
    mysqlConnection.query('Select * from productos where id_producto= ?', [parseInt(req.params.id_producto)], (err, rows, fields) => {
        if (!err) {
            res.status(200).send(rows[0])
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar productos
router.put("/revision/:id_producto", (req, res) => {
    console.log("Actualizando producto");
    let id=req.params.id_producto;
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update productos set  descripcion = ?, precio = ? , stock = ? ,id_categoria=?  where id_producto= ?',
        [ est.descripcion, est.precio,est.stock,est.id_categoria,id], (err) => {
            if (!err) {
                console.log("hola")
                res.status(202).send("producto Actualizado"); 
            } else {
                console.log("adios")
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar productos
router.delete("/productos/:id_producto", (req, res) => {
    console.log("Eliminando producto");
    mysqlConnection.query('delete from producto where productos.id_producto = ?',
        [req.params.id_producto], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("producto Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});



module.exports = router;