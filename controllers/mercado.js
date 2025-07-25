const { response, request} = require('express');
const { MercadoPagoConfig, Preference }=require ('mercadopago');




//Get para traer todos los productos
const mercadoGet = async (req = request, res = response) => {
            res.json({
        msg: 'Server Arribaa',
        
    })
};



//Crear un favorito
const mercadoPost = async (req=request, res=response) => {    
    const {title, quantity,price } = req.body;
    try {
                     const mercadopag = new MercadoPagoConfig({
                  accessToken: process.env.ACCESS_TOKE,
             })
             
       //Generar los datos a guardar en DB del producto
       const producto = new Preference(mercadopag);
       const result = await producto.create({ 
              body: {
                  items: [{
                  title: title,
                  quantity: quantity,
                  unit_price: price,
                  currency_id: "MXN",
                  },
                  ],
                  back_urls: {
                      success: "https://www.google.com/",
                      failure: "https://www.youtube.com/",
                      pending:"https://www.youtube.com/",
                  },
                  auto_return:"approved",
              }
              });
              res.json({
                  msg:"compra pagada con exito",
                  producto: result.id,
                  statusCode: 200,
                 
              })
      
          } catch (error) {
              console.log(error);
          }
    
}



















module.exports = {
    mercadoGet,
    mercadoPost,
};