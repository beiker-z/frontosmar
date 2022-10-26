const jwt= require('jsonwebtoken');

function verify(req,res,next){


    if(!req.headers.authorization){

        return res.status(401).send("mejor");
    }

    const token= req.headers.authorization.split(' ')[1];

    if(token==='null'){

        return res.status(401).send('todo');
    }



    const payload= jwt.verify(token,'secret');
    console.log('paylod'+payload.id);
    req.user = payload.user;
    next();
}

module.exports=verify;