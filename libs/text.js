module.exports = {

    id : (text) => `Es necesario el ID del y/o para ${text}.`,
    numeric :  'Este campo debe ser numérico.',
    position: 'Es necesario el cargo que desempeña(ó) en su trabajo.',
    dateStart: 'Es necesario una fecha de inicio.',
    dateEnd: 'Es necesario una fecha de finalización.',
    dateExpedition: 'Es necesario una fecha de expedición.',
    date: (text) => `Es necesario una fecha para ${text}.`,
    time: (text) => `Es necesario la hora para ${text}.`,
    type: (text) => `Es necesario el tipo para ${text}.`,
    only: (...type) => `Solamente se admiten ${type}`,
    validationData: 'Lo sentimos, necesitamos algunos datos obligatorios.',
    successUpdate: (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} actualizado(a) satisfactoriamente.`,
    successCreate: (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} creado(a) satisfactoriamente.`,
    successDelete: (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} eliminado(a) satisfactoriamente.`,
    duplicateElement:  'Lo sentimos, el elemento que intenta crear ya se encuentra registrado(a).',
    notFoundElement:  'Lo sentimos, los datos enviados no coinciden con nuestros registros.',
    description: 'Es necesario una descripción.',
    name: (text) =>  `Es necesario un nombre del y/o para ${text}.`,
    downloadDocument: (url) => `http://35.175.241.103:8081/certifications/download/${(url).split('/')[5]}`,
    notAvailable: (text) => `Lo sentimos, la ${text} seleccionada no esta disponible.`,
    incorrectFormat: (text) => `Lo sentimos, el formato de ${text} es incorrecto.`,


}