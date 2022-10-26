const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configuration/db-conf');
const jwt=require('jsonwebtoken');

router.post("/login",(req, res)=>{

    const cuerpo= req.body;  
    let user;

    mysqlConnection.query('SELECT * FROM login WHERE usuario= ?',parseInt(cuerpo.usuario),(err,rows,filed)=>{

    if(!err){
        user=rows[0];
        console.log("usuario: "+user.contrasena)
        if(user===undefined){
            return  res.status(401).send('user doe not exist');

        }
        if(cuerpo.contrasena === user.contrasena){
            const token = jwt.sign({ user:user}, 'secret', { expiresIn: '60m' });
            res.status(200).send({ token, expire: 60 * 60 * 1000, status: 200, message: 'Bienvenido', user });
        }
        else{
            return res.status(401).send('login invalid');
        }
    }else{
        return res.status(500).send(err);
    }
    
    });

});

module.exports=router;