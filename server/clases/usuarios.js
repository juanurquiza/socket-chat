class Usuarios {

    constructor() {

        this.personas = [];

    }


    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;

    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnsSAla = this.personas.filter(persona => persona.sala === sala);
        return personasEnsSAla;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        //le asigno al array, el mismo array sin el elemento que quiero borrar
        this.personas = this.personas.filter(persona => persona.id != id)
        return personaBorrada;
    }

}



module.exports = { Usuarios };