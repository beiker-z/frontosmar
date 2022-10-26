const express = require('express');
const app = express();
var cors = require('cors')

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use(cors());



app.use(require('./routes/categoria'));
app.use(require('./routes/clientes'));
app.use(require('./routes/detalles_compras'));
app.use(require('./routes/security'));
app.use(require('./routes/orden_compra'));
app.use(require('./routes/productos'));
app.use(require('./routes/reportes'));




app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
