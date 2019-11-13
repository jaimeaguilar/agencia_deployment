const Testimoniales = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimoniales.findAll()
    res.render('testimoniales',{
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.agregarTestimonial = (req, res) => {
    //validar que todos los campos esten llenos
    let {nombre, correo, mensaje} = req.body;
    let errores =[];
    if (!nombre) {
        errores.push({'mensaje': 'Agrega tu Nombre'})            
    }
    if (!correo) {
        errores.push({'mensaje': 'Agrega tu Correo'})            
    }
    if (!mensaje) {
        errores.push({'mensaje': 'Agrega tu Mensaje'})            
    }
    //revisar por errores
    if (errores.length > 0) {
        //muestra la lista de errores
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje
           
        })
       
    } else {
        //almacena en la base de Datos
        Testimoniales.create({
            nombre,
            correo,
            mensaje
        }).then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
    }
    
}
