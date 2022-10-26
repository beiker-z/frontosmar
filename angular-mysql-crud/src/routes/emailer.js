const nodemailer= require('nodemailer')
const nodemailerSendgrid= require('nodemailer-sendgrid')
const moment= require("moment")
let ubicacionPlantilla = `<!DOCTYPE html>
<html lang="es">

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Factura</title>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-10 ">
                <h1>Factura</h1>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-2 text-center">
                <strong>Fecha</strong>
                <br>
                <h3>{{fecha}}</h3>
                <br>
                <br>
                
            </div>
        </div>
        <hr>
        <div class="row text-center" style="margin-bottom: 2rem;">
            <div class="col-xs-6">
                <h1 class="h2">Cliente</h1>
                <h2>{{nombrecliente}}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <table class="table table-condensed table-bordered table-striped">
                    <thead>
                        <tr>
                        <th scope="col">descripcion</th>
                        <th scope="col">precio</th>
                        <th scope="col">stock</th>
                        <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{tablaProductos}}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">
                                <h4>Total</h4>
                            </td>
                            <td>
                                <h4>{{total}}</h4>
                            </td> 
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 text-center">
                <p class="h5">Gracias por su compra</p>
            </div>
        </div>
    </div>
</body>

</html>`;


const createTrans=()=>{
    /*const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "67def8aeb92b26",
          pass: "4d8f621bd4f97a"
        }
      });
*/
const transport=nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey:'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'
    })
)
      return transport;
}

const sendMail= async(factura)=>{
 
    const formateador = new Intl.NumberFormat("en", { style: "currency", "currency": "MXN" });
    // Generar el HTML de la tabla
    let tabla="";
    let subtotal=0;
    factura.PedidoDetalle.forEach((v) => 
{
        // Aumentar el total
        const totalProducto = v.cantidad * v.precio;
        subtotal += totalProducto;
        // Y concatenar los productos
        tabla += `<tr>
        <td>${v.nombre}</td>
        <td>${formateador.format(v.precio)}</td>
        <td>${v.cantidad}</td>
        <td>${formateador.format(totalProducto)}</td>
        </tr>`;
   }   );    
    let total = factura.precio_total;
    // Remplazar el valor {{tablaProductos}} por el verdadero valor
    ubicacionPlantilla = ubicacionPlantilla.replace("{{tablaProductos}}", tabla);
    
    // Y también los otros valores
    ubicacionPlantilla = ubicacionPlantilla.replace("{{fecha}}", moment(factura.fecha).format('YYYY-MM-DD'));
    ubicacionPlantilla = ubicacionPlantilla.replace("{{nombrecliente}}",factura.cliente);
    ubicacionPlantilla = ubicacionPlantilla.replace("{{subtotal}}", formateador.format(subtotal));
    ubicacionPlantilla= ubicacionPlantilla.replace("{{total}}", formateador.format(total))
    const transporter= createTrans()
  

    console.log(factura.email)

     transporter.sendMail({
        from: '"Fred Foo" <bdchp16@gmail.com>',
        to: `${factura.email}`,
        subject:"Hola bienvenido a nuestra libreria", 
        html:ubicacionPlantilla,
    }).then(() => {
        console.log('Message sent') 
    }).catch((error) => {
        console.log(error.response.body)
    });

}

exports.sendMail=(factura)=> sendMail(factura) 