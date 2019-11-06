module.exports = {

    id : (text) => `Es necesario el ID del y/o para ${text}.`,
    numeric :  'Este campo debe ser numérico.',
    position: 'Es necesario el cargo que desempeña(ó) en su trabajo.',
    date_start: 'Es necesario una fecha de inicio.',
    date_end: 'Es necesario una fecha de finalización.',
    date_expedition: 'Es necesario una fecha de expedición.',
    validation_data: 'Lo sentimos, necesitamos algunos datos obligatorios.',
    success_update: (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} actualizado(a) satisfactoriamente.`,
    success_create: (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} creado(a) satisfactoriamente.`,
    success_delete: (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} eliminado(a) satisfactoriamente.`,
    duplicate_element:  'Lo sentimos, el elemento que intenta crear ya se encuentra registrado(a).',
    not_found_element:  'Lo sentimos, los datos enviados no coinciden con nuestros registros.',
    description: 'Es necesario una descripción.',
    name: (text) =>  `Es necesario un nombre del y/o para ${text}.`,
    download_document: (url) => `http://35.175.241.103:8081/certifications/download/${(url).split('/')[6]}` 

}