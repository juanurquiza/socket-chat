const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const usuarios = new Usuarios();
const { crearMensaje } = require('../utilidades/utilidades');

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {


        console.log(data);
        if (!data.nombre || !data.sala) {

            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });

        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    });


    client.on('disconnect', () => {

            let personaBorrado = usuarios.borrarPersona(client.id);

            client.broadcast.to(personaBorrado.sala).emit('crearMensaje', crearMensaje('administrador', `${personaBorrado.nombre} salio`));
            client.broadcast.to(personaBorrado.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrado.sala));

        })
        //mensajes privados 
    client.on('mensajePrivado', (data) => {


        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })



});