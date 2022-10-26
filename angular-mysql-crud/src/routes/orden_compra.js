const express = require('express');
const router = express.Router();
const moment= require("moment")
const emailer= require('../routes/emailer')

const mysqlConnection = require('../configuration/db-conf');

//Obtener lista de compra
router.get("/orden_compra", (req, res) => {
    console.log("Obteniendo Lista de compr");
    mysqlConnection.query('SELECT * FROM libreria.orden_compra;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear pago
router.post('/ordencompra', (req, res) => {
    let per = req.body;
    let sql = ``;
    let now = new Date();
    console.log("seerrr")
    console.log("rodo: "+per)
    
    mysqlConnection.query("INSERT INTO orden_compra (id_orden,fecha,precio_total,id_cliente) Values (?,?,?,?)", [per.id_orden,moment(per.fecha).format('YYYY-MM-DD'),per.precio_total,per.id_cliente], (error, results, fields) => {
        if (!error) {
            console.log("beiker")
            const idPedido = results.insertId;
            sql = 'INSERT INTO detalles_compra (id_orden,id_producto,cantidad,precio) VALUES ?'; 
            const rows = [];
            console.log("hola")
            console.log(per.PedidoDetalle)
            per.PedidoDetalle.forEach((v) => rows.push([idPedido,v.id_producto,v.cantidad,v.precio]));
            console.log(sql)
            console.log(rows)
            mysqlConnection.query(sql, [rows], function (error, results, fields) {
                if (!error) {
                    console.log("darinon")
                    res.status(200).send({ message: "Pedido creado exitosamente" });
                } else {
                    console.log("jan")
                    res.status(500).send({ message: "Algo salio mal al ingresar detalle" });
                }
            });
        } else {
            console.log("error")
            res.status(500).send({ message: "Algo salio mal al crear pedido" });
        }
    });

    
});

//Obtener orden por id
router.get("/ordencompra/:id_orden", (req, res) => {
    console.log("Obteniendo orden");
    mysqlConnection.query('Select * from orden_compra where id_orden= ?', [req.params.id_orden], (err, rows, fields) => {
        if (!err) {
            res.send(rows[0]);
            
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


router.get("/ordendetalle/:id_orden", (req, res) => {
    console.log("Obteniendo orden");
    mysqlConnection.query('CALL sp_detalle(?)', [req.params.id_orden], (err, rows, fields) => {
        if (!err) {
            res.send(rows[0]);
            
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});




//Actualizar orden
router.put("/orden_compra/:id_orden", (req, res) => {
    console.log("Actualizando orden");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update Pagos set  fecha = ?, precio_total = ?, id_cliente = ? where id_orden= ?',
        [ est.fecha, est.precio_total,est.id_cliente, req.params.id_orden], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("orden Actualizado ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar orden
router.delete("/orden_compra/:id_orden", (req, res) => {
    console.log("Eliminando orden");
    mysqlConnection.query('delete from orden_compra where orden_compra.id_orden = ?',
        [req.params.id_orden], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("orden Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

router.post("/email", async (req, res) => {
    let dot = req.body;
    console.log("espera envio email")
    try {
        console.log("enviando email")
     
        dot.PedidoDetalle.forEach((v)=>{
            console.log("prueba")
            console.log(v)
          })
        emailer.sendMail(dot)
    } catch (error) {
            console.log(error);    
            res.send({error:'error'})   
    } 
    
});


module.exports = router;
