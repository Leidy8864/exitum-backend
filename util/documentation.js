// -------------------------------------------------------------//

/**
 *
 * @apiDefine ErrorGeneral
 * @apiError (Estructura de Error) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiError (Estructura de Error) {String} message Indica el detalle de la solicitud
 *
 * @apiErrorExample {json} Error general
	{"status":false,"message":"(...)"}
 */

/**
 *
 * @api {POST} /users/signUp POST signup user
 * @apiName signup
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Registro de forma organica o local
 * @apiParam {String} name Nombre(s) del usuario.
 * @apiParam {String} lastname Apellidos(s) del usuario.
 * @apiParam {String} email Email del usuario.
 * @apiParam {String} password Contrasena del usuario.
 * @apiParamExample {querystring} Ejemplo url
    {
        "name":"Leidy",
        "lastname": "Callupe",
        "email":"leidy.callupe@tecsup.edu.pe",
        "password":"leidy123",
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.id id
 * @apiSuccess (Datos obtenidos) {String} accessData.email email
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/oauth/google POST login google
 * @apiName login google
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Registro de forma organica o local
 * @apiParam {String} access_token Token de acceso.
 * @apiParam {String} role Role del usuario
 * @apiParam {String} method Metodo social.
 * @apiParam {Int} country_id Id del país seleccionado.
 * @apiParam {Int} currency_id Id de la moneda seleccionada.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/oauth/google
    {
        "access_token" : "ya29.GluNB9H9L0VcfNo6AYOZSSX0qCZAexNO8XUYTX1V3TS_pCG9Lk4_hpjCBFf_SvVboD7QzpHcylKDsT-",
        "role" : "employee",
        "method" : "google",
        "country_id" : 1,
        "currency_id" :1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.id id
 * @apiSuccess (Datos obtenidos) {String} accessData.email email
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/oauth/facebook POST login facebook
 * @apiName login facebook
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Registro de forma organica o local
 * @apiParam {String} access_token Token de acceso.
 * @apiParam {String} role Role del usuario
 * @apiParam {String} method Metodo social.
 * @apiParam {Int} country_id Id del país seleccionado.
 * @apiParam {Int} currency_id Id de la moneda seleccionada.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/oauth/facebook
    {
        "access_token" : "ya29.GluNB9H9L0VcfNo6AYOZSSX0qCZAexNO8XUYTX1V3TS_pCG9Lk4_hpjCBFf_SvVboD7QzpHcylKDsT-",
        "role" : "employee",
        "method" : "facebook",
        "country_id" : 1,
        "currency_id" :1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.id id
 * @apiSuccess (Datos obtenidos) {String} accessData.email email
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken
        }
    }
 *
 *
 */

/**
 *
 * @api {GET} /users/authentication/:token GET confirmation user
 * @apiName confirmation
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Verificación del correo del usuario
 * @apiParam {String} token Token de validación de correo.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/authentication/:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTU3MDYzMjcxM30.V29Dd2_8jh-hyb84YCcutSFy70JPXiv9DypeqUSsjq4
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el mensaje de confirmación
 * @apiSuccess (Datos obtenidos) {Object} data Datos del usuario validado
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "Su cuenta fue verificada.",
        "data": {
            "id": 49,
            "name": "Leidy",
            "lastname": "Callupe",
            "email": "leidy.callupe@tecsup.edu.pe",
            "provider_id": null,
            "confirmed": false,
            "phone": null,
            "role": "employee",
            "method": "local",
            "password": "$2a$10$j0ivFo1F9Yud5sTTmYnEU.CDspnqPq4oa.vzySfLZOlbLZRGvKsEG",
            "active": true,
            "last_login": null,
            "photo": null,
            "photo_dni": null,
            "avg_rating": null,
            "country_id": 1,
            "currency_id": 1
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/forgot POST get token password
 * @apiName token password
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Recuperación de la cuenta
 * @apiParam {String} email Email del usuario registrado.
 *
	* @apiParamExample {querystring} Ejemplo url
    /users/forgot
    {
        "email": "leidy.callupe@tecsup.edu.pe"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message.Indica el mensaje de exito
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": 'Un email de recuperación ha sido enviado a leidy.callupe@tecsup.edu.pe',
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/authentication/reset/:token POST reset password
 * @apiName rest password
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Restablece la contrasena
 * @apiParam {String} email Email del usuario registrado.
 *
	* @apiParamExample {querystring} Ejemplo url
    /users/reset/3f9606747363c5edcb316167d6267603
    {
        "new_password": "leidy123",
        "verify_password": "leidy123"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {Int} accessData.id Id del usuario
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "Su cambio el password.",
        "data": {
            "id": 49,
            "name": "Leidy",
            "lastname": "Callupe",
            "email": "leidy.callupe@tecsup.edu.pe",
            "provider_id": null,
            "confirmed": false,
            "phone": null,
            "role": "employee",
            "method": "local",
            "password": "$2a$10$j0ivFo1F9Yud5sTTmYnEU.CDspnqPq4oa.vzySfLZOlbLZRGvKsEG",
            "active": true,
            "last_login": null,
            "photo": null,
            "photo_dni": null,
            "avg_rating": null,
            "country_id": 1,
            "currency_id": 1
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/resend POST resendToken user
 * @apiName resendToken
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Enviar un nuevo token para la verificación del correo
 * @apiParam {String} email Email para el reenvio de token.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/resend
    {
	    "email": "leidy.callupe@tecsup.edu.pe"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el mensaje exitoso
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "Un email de verificación ha sido enviado a leidy.callupe@tecsup.edu.pe ."
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/update POST update user
 * @apiName update user
 * @apiGroup USER
 *
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualizar información del usuario.
 * @apiParam {Int} user_id Id del usuario.
 * @apiParam {String} name Nombre(s) del usuario actualizado.
 * @apiParam {String} lastname Apellido(s) del usuario actualizado.
 * @apiParam {String} phone Telefono del usuario actualizado.
 * @apiParam {Date} birthday Fecha de nacimiento del usuario.
 * @apiParam {Number} skill_id Skill que desean destacar [opcional].
 * @apiParam {Boolean} active False cuando se quiere eliminar al usuario.
 * @apiParam {String} rol Nuevo rol del usuario ('entrepreneur', 'employee', 'admin').
 * @apiParam {File} photo Imagen del usuario
 * *
	* @apiParamExample {querystring} Ejemplo url
    {
        "user_id": 2
        "name": "Leidy Paula"
        "lastname": "Callupe Santisteban"
        "phone": "1523456789"
        "active": "true"
        "role": "entrepreneur"
        "photo": "image.png",
        "birthday": '1998-05-20,
        "skill_id": 1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Menssaje de éxito
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "Usuario actualizado correctamente"
        "data": {
            "id": 1,
            "name": "Usuario",
            "lastname": "Usuario",
            "email": "usuario@gmail.com",
            "provider_id": null,
            "confirmed": true,
            "phone": null,
            "role": "employee",
            "method": "local",
            "active": true,
            "last_login": null,
            "photo": null,
            "photo_dni": null,
            "avg_rating": null,
            "from_hour": "07:00:00",
            "to_hour": "22:00:00",
            "birthday": "1999-12-12",
            "country_id": 1,
            "currency_id": 1
        }
    }
 *
 *
 */

/**
*
* @api {POST} /users/update-image POST update image user
* @apiName Actualizar imagen de usuario
* @apiExample Request parameter
* http://35.175.241.103:8081/users/update-image
* @apiGroup USER
*
* @apiVersion 1.0.0
* @apiDescription Horas disponible.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que realizará que desea actualizar.
* @apiSuccess (Datos requeridos) {File} photo Imagen la cual desea actualizar.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
      "user_id": 1,
      "photo": "image.png"
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "(...)",
      "data": {
          "id": 1,
          "name": "Usuario",
          "lastname": "Usuario",
          "email": "usuario@gmail.com",
          "provider_id": null,
          "confirmed": true,
          "phone": null,
          "role": "employee",
          "method": "local",
          "active": true,
          "last_login": null,
          "photo": null,
          "photo_dni": null,
          "avg_rating": null,
          "from_hour": "07:00:00",
          "to_hour": "22:00:00",
          "birthday": "1999-12-12",
          "country_id": 1,
          "currency_id": 1
      }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
 *
 * @api {GET} /users/countries GET list country
 * @apiName resendToken
 * @apiGroup USER
 *
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Retorna el listado de paises.
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object[]} countries Lista de paises
 * @apiSuccess (Datos obtenidos) {String} countries.id Id del país
 * @apiSuccess (Datos obtenidos) {String} countries.country Nombre del país
 * @apiSuccess (Datos obtenidos) {String} countries.code Codigo del país
 * @apiSuccess (Datos obtenidos) {String} countries.currency_id Id de la moneda del país
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "countries": [
            {
                "id": 1,
                "country": "Peru",
                "code": "PER",
                "currency_id": 1
            }
        ]
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/createWorkshop POST create workshop
 * @apiName create workshop
 * @apiGroup USER
 *
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Creación de un taller.
 * @apiParam {Int} user_id Id del taller.
 * @apiParam {String} title Titulo del taller.
 * @apiParam {String} description Descripción del taller.
 * @apiParam {Date} day Día del evento.
 * @apiParam {Time} hour_start Hora de inicio del evento.
 * @apiParam {Time} hour_end Hora de cierre del evento.
 * @apiParam {String} place Dirección del evento.
 * @apiParam {Decimal} lat Latitud.
 * @apiParam {Decimal} lng Longitud.
 * *
	* @apiParamExample {querystring} Ejemplo url
	/users/createWorkshop
    {
        "title": "Taller de costura",
        "description": "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        "day": "12-12-19",
        "hour_start": "12:00",
        "hour_end": "15:00",
        "place": "Av. Atahualpa 123",
        "lat": -0.1515321,
        "lng": 68.5646464,
        "user_id": 10
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Menssaje de éxito
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": 200,
        "message": "Taller creado correctamente",
        "data": {
            "id": 2,
            "title": "Taller de costura",
            "description": "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
            "day": "2019-12-12T05:00:00.000Z",
            "hour_start": "12:00",
            "hour_end": "15:00",
            "place": "Av. Atahualpa 123",
            "lat": -0.1515321,
            "lng": 68.5646464,
            "user_id": 10
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/updateWorkshop POST update workshop
 * @apiName update workshop
 * @apiGroup USER
 *
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualización de un taller.
 * @apiParam {Int} workshop_id Id del taller.
 * @apiParam {String} title Titulo del taller.
 * @apiParam {String} description Descripción del taller.
 * @apiParam {Date} day Día del evento.
 * @apiParam {Time} hour_start Hora de inicio del evento.
 * @apiParam {Time} hour_end Hora de cierre del evento.
 * @apiParam {String} place Dirección del evento.
 * @apiParam {Decimal} lat Latitud.
 * @apiParam {Decimal} lng Longitud.
 * *
	* @apiParamExample {querystring} Ejemplo url
	/users/updateWorkshop
    {
        "title": "Taller de costuraaaa2",
        "description": "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        "day": "12-12-19",
        "hour_start": "12:00",
        "hour_end": "15:00",
        "place": "Av. Atahualpa 123",
        "lat": -0.1515321,
        "lng": 68.5646464,
        "workshop_id": 2
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Menssaje de éxito
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "message": "Taller actualizado correctamente"
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/deleteWorkshop POST delete workshop
 * @apiName delete workshop
 * @apiGroup USER
 *
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualización de un taller.
 * @apiParam {Int} workshop_id Id del taller.
 * *
	* @apiParamExample {querystring} Ejemplo url
	/users/deleteWorkshop
    {
        "workshop_id": 2
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Menssaje de éxito
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "message": "Eliminado correctamente"
    }
 *
 *
 */

/**
 *
 * @api {GET} /users/show/:user_id GET show user data
 * @apiName Lista de certificaciones del usuario.
 * @apiParam {String} user_id ID del usuario.
 * @apiExample Request parameter
 * http://35.175.241.103:8081/users/show/1
 * @apiGroup USER
 *
 * @apiVersion 1.0.0
 * @apiDescription  Show User
 * @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
 * @apiSuccess (Datos retornados) {String} message Mensaje retornado.
 * @apiSuccess (Datos retornados) {Object} data Contenido retornado.
 *@apiSuccessExample { json } Datos retornados
    HTTP/1.1 200 OK
    {
        "status": true,
        "message": "OK",
        "data":"data": {
            "id": 1,
            "name": "Usuario",
            "lastname": "Usuario",
            "email": "usuario@gmail.com",
            "provider_id": null,
            "confirmed": true,
            "phone": null,
            "role": "employee",
            "active": true,
            "last_login": null,
            "photo_dni": null,
            "avg_rating": null,
            "from_hour": "07:00:00",
            "to_hour": "22:00:00",
            "country_id": 1,
            "currency_id": 1,
            "toUserSkills": []
        }
    }
 *
 *@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
 *@apiError (Error retornado) {Boolean}  message Mensaje retornado.
 *@apiError (Error retornado) {Object}  data Contenido retornado
 *@apiErrorExample  Error
    HTTP/1.1 4xx Error
    {
        "status" : false,
        "message": "(...)",
        "data":  { }
    }
 *
 *
 */

/**
 *
 * @api {POST} /startups/create POST create startup
 * @apiName create
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Crea la startup
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} name Nombre del proyecto(startup).
 * @apiParam {File} photo Foto de la startup.
 * @apiParam {String} ruc Ruc de la startup si lo tuviera.
 * @apiParam {String} description Descripcion de la startup
 * @apiParam {Int} category_id Id de la categoría elegida.
 * @apiParam {Int} stage_id Id del nivel en que se encuentra.
 *
	* @apiParamExample {querystring} Ejemplo url
    /startups/create
    {
        "id": 1
        "name": "NextMedicall"
        "ruc": "12312313"
        "description": "Startup de telemedicina"
        "category_id": 1,
        "stage_id": 1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "Startup creado correctamente"
    }
 *
 *
 */

/**
 *
 * @api {POST} /startups/listById POST list startups by id
 * @apiName listById
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Retorna una lista de startups determinada por el id del usuario emprendedor
 * @apiParam {Int} id Id del usuario emprendedor
 *
	* @apiParamExample {querystring} Ejemplo url
    /startups/listById
    {
        "id": 1
    }

 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object[]} startups Lista de startups
 * @apiSuccess (Datos obtenidos) {String} startups.name Nombre completo de la startup
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "startups": [
            {
                "id": 1,
                "name": "NextMedicall",
                "photo_url": "3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG",
                "ruc": "12312313",
                "description": "Startup de telemedicinaaa",
                "entrepreneur_id": 5,
                "category_id": 1,
                "stage_id": 1
            }
        ]
    }
 *
 *
 */
/**
 *
 * @api {GET} /startups/list GET find all startups
 * @apiName list
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Retorna todas las startups
 *
	* @apiParamExample {querystring} Ejemplo url
	/startups/list
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object[]} startups Lista de startups
 * @apiSuccess (Datos obtenidos) {String} startups.name Nombre completo de la startup
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "Ok",
        "data": {
            "startups": [
                {
                    "id": 5,
                    "name": "NextMedicall",
                    "photo_url": "3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG",
                    "ruc": "12312313",
                    "description": "Startup de telemedicinaaa",
                    "entrepreneur_id": 5,
                    "category_id": 1,
                    "stage_id": 1
                }
            ]
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /startups/update POST update startup
 * @apiName update startup
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualizar startup
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} name Nombre del proyecto(startup).
 * @apiParam {String} photo_url Url de la foto del usuario.
 * @apiParam {String} ruc Ruc de la startup si lo tuviera.
 * @apiParam {String} description Descripcion de la startup
 * @apiParam {Int} category_id Id del sector elegido.
 * @apiParam {Int} startup_id Id de la startup a editar.
 *
	* @apiParamExample {querystring} Ejemplo url
	/startups/update

 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Startup actualizado correctamente",
    }
 *
 *
 */

/**
 *
 * @api {POST} /startups/detail POST detail startup
 * @apiName detail startup
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualizar startup
 * @apiParam {Int} id Id del usuario.
 * @apiParam {Int} startup_id Id de la startup.
 *
	* @apiParamExample {querystring} Ejemplo url
    /startups/detail
    {
        "id": 1
        "startup_id": 1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "startup": {
            "id": 1,
            "name": "NextMedicall",
            "photo_url": "3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG",
            "ruc": "12312313",
            "description": "Startup de telemedicinaaa",
            "entrepreneur_id": 1,
            "category_id": 1,
            "stage_id": 1,
            "entrepreneur": {
                "id": 1,
                "user_id": 1,
                "user": {
                    "id": 1,
                    "name": "Leidy Paula",
                    "lastname": "Callupe Santisteban",
                    "email": "leidy.callupe@tecsup.edu.pe",
                    "provider_id": null,
                    "confirmed": false,
                    "phone": "1523456789",
                    "role": "entrepreneur",
                    "method": "local",
                    "password": "$2a$10$DUN2XDqeFKkKWo3c3tL2H.PUdHIzSItx4dKNaaExl9lFvHmGFXOqO",
                    "active": true,
                    "last_login": null,
                    "photo": "8bc1c170-e5f5-11e9-8295-0123456789abshutterstock_645324130-1080x675.jpg",
                    "photo_dni": null,
                    "avg_rating": null,
                    "country_id": 1,
                    "currency_id": 1
                }
            }
        }
    }
 *
 *
 */

/**
*
* @api {GET} /startups/listsector GET list sectors
* @apiName list sectors
* @apiGroup STARTUP
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription  Actualizar startup
*
   * @apiParamExample {querystring} Ejemplo url
   /startups/listsector

*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Ok",
       "data": {
           "sectors": [
               {
                   "id": 1,
                   "sector": "Medicina"
               }
           ]
       }
   }
*
*
*/

/**
 *
 * @api {GET} /skills/list GET list skills
 * @apiName list skills
 * @apiGroup SKILLS
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Listado de habilidades
 *
	* @apiParamExample {querystring} Ejemplo url
	/skills/list

 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccessExample {json} Datos obtenidos:
    {

    }
 *
 *
 */

/**
*
* @api {POST} /skills/create POST create skill
* @apiName create skills
* @apiGroup SKILLS
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription  Crear habilidades
* @apiParam {String} skill Nombre de la habilidad.
*
   * @apiParamExample {querystring} Ejemplo url
   /skills/create
   {
       "skill": "Programador en Java"
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Skill creado correctamente",
       "data": {
           "id": 2,
           "skill": "Programador en JavaScript"
       }
   }
*
*
*/

/**
 *
 * @api {POST} /employees/create POST create employee
 * @apiName create employee
 * @apiGroup EMPLOYEE
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Crear el rol de empleado al usuario
 * @apiParam {Int} user_id Id del usuario.
 * @apiParam {Int} category_id Id de la categoria de la startup.
 * @apiParam {String} short_description Descripción del empleado.
 * @apiParam {Double} price_hour Precio por hora.
 * @apiParam {Object} types[] Id's de los tipos de empleado.
 * @apiParam {Object} languages[] Id's de los tipos de empleado.
 * * @apiParam {Int} languages.language_id Id del lenguaje.
 * * @apiParam {Int} languages.level_id Id del nivel.
 *
	* @apiParamExample {querystring} Ejemplo url
    /employees/create
    {
        "user_id" : 3,
        "category_id" : 1,
        "about_me" : "Soy un desarrollor web",
        "short_description" : "Desarrollador Web",
        "price_hour" : 15,
        "types" : [1],
        "languages" : [
                {
                    "language_id": 2,
                    "level_id": 2
                },
                {
                    "language_id": 3,
                    "level_id": 3
                }
            ]
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} data Datos del impulsor actualizado
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Impulsor creado correctamente",
        "data": {
            "id": 4,
            "user_id": 3,
            "category_id": 1,
            "about_me": "Soy un desarrollor web",
            "short_description": "Desarrollador Web",
            "price_hour": 15,
            "stage_id": 1
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /employees/update POST update employee
 * @apiName update employee
 * @apiGroup EMPLOYEE
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualizar empleado al usuario
 * @apiParam {Int} user_id Id del usuario.
 * @apiParam {String} about_me Descripción del empleado.
 * @apiParam {String} short_description Descripción del empleado.
 * @apiParam {Double} price_hour Precio por hora.
 *
	* @apiParamExample {querystring} Ejemplo url
    /employees/update
    {
        "user_id" : 2,
        "about_me" : "Desarrollador Móvil",
        "short_description" : "Desarrollador Móvil",
        "price_hour" : 20
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} data Datos del empleado actualizado
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Empleado actualizado correctamente",
        "data": {
            "id": 3,
            "user_id": 2,
            "category_id": 1,
            "stage_id": 1,
            "short_description": "Desarrollador Móvil",
            "about_me": "Desarrollador Móvil",
            "price_hour": 20,
            "behance_user": null,
            "behance_active": null,
            "linkedin_active": null
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /employees/:user_id/detail POST detail employee
 * @apiName detail employee
 * @apiGroup EMPLOYEE
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Detalle del empleado
 * @apiParam {Int} user_id Id del usuario.
 *
	* @apiParamExample {querystring} Ejemplo url
    /employees/2/detail
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} data Datos del empleado
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "OK",
        "data": {
            "id": 3,
            "user_id": 2,
            "category_id": 1,
            "stage_id": 1,
            "short_description": "Desarrollador Móvil",
            "about_me": "Desarrollador Móvil",
            "price_hour": "20.00",
            "behance_user": null,
            "behance_active": null,
            "linkedin_active": null,
            "category": {
                "id": 1,
                "name": "Programación y Tecnología"
            },
            "education": [],
            "experience": [],
            "recommendation": [],
            "languages": [
                {
                    "id": 2,
                    "language": "Inglés",
                    "employee_language": {
                        "employee_id": 3,
                        "language_id": 2,
                        "level_id": 2,
                        "employeeId": 3
                    }
                },
                {
                    "id": 3,
                    "language": "Alemán",
                    "employee_language": {
                        "employee_id": 3,
                        "language_id": 3,
                        "level_id": 3,
                        "employeeId": 3
                    }
                }
            ],
            "skills": [
                {
                    "id": 1,
                    "skill": "PHP",
                    "employee_skill": {
                        "employee_id": 3,
                        "skill_id": 1
                    }
                },
                {
                    "id": 2,
                    "skill": "Node JS",
                    "employee_skill": {
                        "employee_id": 3,
                        "skill_id": 2
                    }
                }
            ]
        }
    }
 *
 *
 */

/**
*
* @api {POST} /employees/update/skills POST update employee skills
* @apiName update employee skills
* @apiGroup EMPLOYEE
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription  Actualiza las habilidades del empleado
*
   * @apiParamExample {querystring} Ejemplo url
   /employees/update/skills
   {
       "user_id" : 2,
       "skills" : [1,2]
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Skills actualizados correctamente"
   }
*
*
*/

/**
*
* @api {POST} /employees/update/languages POST update employee languages
* @apiName update employee languages
* @apiGroup EMPLOYEE
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Actualizar lenguaje
* @apiParam {Int} user_id Id del usuario.
* @apiParam {Int} lenguages[] Id's de los lenguajes.
*
   * @apiParamExample {querystring} Ejemplo url
   /employees/update/languages
   {
       "user_id" : 2,
       "languages" : [1,2]
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Lenguajes actualizados correctamente"
   }
*
*
*/

/**
*
* @api {POST} /employees/update/types POST update employee types
* @apiName update employee types
* @apiGroup EMPLOYEE
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Actualizar tipo
* @apiParam {Int} user_id Id del usuario.
* @apiParam {Int} types[] Id's de los tipos.
   * @apiParamExample {querystring} Ejemplo url
   /employees/update/languages
   {
       "user_id" : 2,
       "types" : [1,2]
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccessExample {json} Datos obtenidos:
   {
       "user_id" : 2,
       "types" : [1,2]
   }
*
*
*/

/**
*
* @api {POST} /employees/compare POST compare employees
* @apiName compare employees
* @apiGroup EMPLOYEE
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Comparar a dos impulsores
* @apiParam {Int} employee_id_1 Id del impulsor 1.
* @apiParam {Int} employee_id_2 Id del impulsor 2.
   * @apiParamExample {querystring} Ejemplo url
   /employees/compare
   {
       "employee_id_1" : 1,
       "employee_id_1" : 2
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica los datos obtenidos
* @apiSuccess (Datos obtenidos) {Object[]} data.employees Indica el array de empleados
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Comparación de dos impulsores exitosa",
       "data": {
           "employees": [
               {
                   "id": 1,
                   "user_id": 1,
                   "category_id": 1,
                   "stage_id": 1,
                   "short_description": "Desarrollador Web",
                   "about_me": "Soy un desarrollor web",
                   "price_hour": "15.50",
                   "behance_user": null,
                   "behance_active": null,
                   "linkedin_active": null,
                   "category": {
                       "id": 1,
                       "name": "Tecnológico"
                   },
                   "education": [],
                   "experience": [],
                   "recommendation": [],
                   "languages": [
                       {
                           "id": 1,
                           "language": "Ingles",
                           "employee_language": {
                               "employee_id": 1,
                               "language_id": 1,
                               "level_id": 2,
                               "employeeId": 1
                           }
                       },
                       {
                           "id": 2,
                           "language": "Espanol",
                           "employee_language": {
                               "employee_id": 1,
                               "language_id": 2,
                               "level_id": 3,
                               "employeeId": 1
                           }
                       }
                   ],
                   "skills": [
                       {
                           "id": 1,
                           "skill": "NodeJS",
                           "employee_skill": {
                               "employee_id": 1,
                               "skill_id": 1
                           }
                       }
                   ]
               },
               {
                   "id": 2,
                   "user_id": 2,
                   "category_id": 1,
                   "stage_id": 1,
                   "short_description": "Desarrollador Web",
                   "about_me": "Soy un desarrollor web",
                   "price_hour": "15.50",
                   "behance_user": null,
                   "behance_active": null,
                   "linkedin_active": null,
                   "category": {
                       "id": 1,
                       "name": "Tecnológico"
                   },
                   "education": [],
                   "experience": [],
                   "recommendation": [],
                   "languages": [
                       {
                           "id": 1,
                           "language": "Ingles",
                           "employee_language": {
                               "employee_id": 2,
                               "language_id": 1,
                               "level_id": 2,
                               "employeeId": 2
                           }
                       },
                       {
                           "id": 2,
                           "language": "Espanol",
                           "employee_language": {
                               "employee_id": 2,
                               "language_id": 2,
                               "level_id": 3,
                               "employeeId": 2
                           }
                       }
                   ],
                   "skills": [
                       {
                           "id": 1,
                           "skill": "NodeJS",
                           "employee_skill": {
                               "employee_id": 2,
                               "skill_id": 1
                           }
                       }
                   ]
               }
           ]
       }
   }
*
*
*/

/**
*
* @api {POST} /experiences/create POST experiencie create
* @apiName experiencie create
* @apiGroup EXPERIENCIES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creacion de la experiencia del usuario
* @apiParam {Int} employee_id Id del empleado.
* @apiParam {String} position Posición o cargo que desepeño
* @apiParam {String} company Compañia en la que trabajo
* @apiParam {Date} date_start Fecha de incio
* @apiParam {Date} date_end Fecha fin
* @apiParam {Boolean} current_job Trabajo actual, true o false
   * @apiParamExample {querystring} Ejemplo url
   /experiences/create
   {
       "employee_id" : 1,
       "position" : "Desarrollador de software",
       "company" : "Tecsup",
       "date_start" : "2019-09-27",
       "date_end" : "2019-09-27",
       "current_job" : false
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Datos de la experiencia creada
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Experiencia del empleado creada correctamente",
       "data": {
           "id": 4,
           "employee_id": 1,
           "position": "Desarrollador de software",
           "company": "Tecsup",
           "date_start": "2019-09-27T00:00:00.000Z",
           "date_end": "2019-09-27T00:00:00.000Z",
           "current_job": false
       }
   }
*
*
*/

/**
*
* @api {POST} /experiences/update POST experiencie update
* @apiName experiencie update
* @apiGroup EXPERIENCIES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Actualizar la experiencia del usuario
* @apiParam {Int} experience_id Id de la experiencia   .
* @apiParam {String} position Posición o cargo que desepeño
* @apiParam {String} company Compañia en la que trabajo
* @apiParam {Date} date_start Fecha de incio
* @apiParam {Date} date_end Fecha fin
* @apiParam {Boolean} current_job Trabajo actual, true o false
   * @apiParamExample {querystring} Ejemplo url
   /experiences/update
   {
       "experience_id" : 1,
       "position" : "Desarrollador Movil",
       "company" : "Senati",
       "description" : "Experiencia en el ambito movil",
       "date_start" : "2019-09-27",
       "date_end" : "2019-09-28",
       "current_job" : true
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica los datos de la experiencia actualizada
* @apiSuccessExample {json} Datos obtenidos:
   {
   "status": true,
   "message": "Experiencia actualizada creada correctamente",
   "data": {
       "id": 1,
       "position": "Desarrollador Movil",
       "company": "Senati",
       "date_start": "2019-09-27T00:00:00.000Z",
       "date_end": "2019-09-28T00:00:00.000Z",
       "description": "Experiencia en el ambito movil",
       "current_job": true,
       "employee_id": 1
   }
   }
*
*
*/

/**
 *
 * @api {POST} /educations/create POST educations create
 * @apiName educations create
 * @apiGroup EDUCATIONS
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Creacion de la educación del usuario.
 * @apiParam {Int} employee_id Id del empleado.
 * @apiParam {String} description Descripción
 * @apiParam {Date} date_start Fecha de incio de la experiencia
 * @apiParam {Date} date_end Fecha fin de la experiencia
 * @apiParam {Int} university_id Id de la universidad
 * @apiParam {String} other_university Otra universidad si es que no se encuentra registrada
	* @apiParamExample {querystring} Ejemplo url
    /educations/create
    {
        "employee_id" : "1",
        "description" : "Estudiante de Diseño de Software",
        "date_start" : "2019-09-27",
        "date_end" : "2019-09-27",
        "university_id" : 2,
        "other_university" : ""
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos de la educación creada
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Educación del empleado creada correctamente",
        "data": {
            "id": 1,
            "employee_id": 1,
            "description": "Estudiante de Diseño de Software",
            "date_start": "2019-09-27T00:00:00.000Z",
            "date_end": "2019-09-27T00:00:00.000Z",
            "university_id": 2,
            "other_university": ""
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /educations/update POST educations update
 * @apiName educations update
 * @apiGroup EDUCATIONS
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Creacion de la experiencia del usuario
 * @apiParam {Int} employee_id Id del empleado.
 * @apiParam {String} description Descripción
 * @apiParam {Date} date_start Fecha de incio de la experiencia
 * @apiParam {Date} date_end Fecha fin de la experiencia
 * @apiParam {Int} university_id Id de la universidad
 * @apiParam {String} other_university Otra universidad si es que no se encuentra
	* @apiParamExample {querystring} Ejemplo url
    /educations/update
    {
        "education_id" : "1",
        "description" : "Estudiante de Maquinaria",
        "date_start" : "2019-09-28",
        "date_end" : "2019-09-28",
        "university_id" : 1,
        "other_university" : ""
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos de la educación acutualizada
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Educación actualizada actualizada correctamente",
        "data": {
            "id": 1,
            "description": "Estudiante de Maquinaria",
            "date_start": "2019-09-28T00:00:00.000Z",
            "date_end": "2019-09-28T00:00:00.000Z",
            "university_id": 1,
            "employee_id": 1,
            "other_university": ""
        }
    }
 *
 *
 */

/**
*
* @api {POST} /ads/create POST advertisement create
* @apiName advertisement create
* @apiGroup ADVERTISEMENT
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creacion del anuncio de trabajo.
* @apiParam {String} title Titulo del anuncio
* @apiParam {String} description Descripción del anuncio
* @apiParam {Int} area_id Id del área
* @apiParam {Int} startup_id Id de la startup
* @apiParam {Object} skills Id's de los skills
   * @apiParamExample {querystring} Ejemplo url
   /advertisement/create
   {
       "title" : "Programador en Java",
       "description" : "Requiero un programador senior",
       "area_id" : 1,
       "startup_id" : 1,
       "skills" : [1,2,3]
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Anuncio creado correctamente",
       "data": {
           "id": 2,
           "title": "Programador en Java",
           "description": "Requiero un programador senior",
           "state": "active",
           "area_id": 1,
           "startup_id": 1,
           "created_at": "2019-10-03T20:47:28.373Z"
       }
   }
*
*
*/

/**
 *
 * @api {POST} /ads/update POST advertisement update
 * @apiName advertisement update
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Actualización de la experiencia del usuario
 * @apiParam {Int} advertisement_id Id del anuncio.
 * @apiParam {String} title Titulo del anuncio.
 * @apiParam {String} description Descripcion del anuncio
 * @apiParam {Array[]} skills Habilidades requeridos
 * @apiParam {Int} startup_id Id de la startup
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/update
    {
        "title": "Domingo domingo domingo se busca desarrollador full stack",
        "description": "descripciondescripciondescripciondescripciondescripciondescripciondescripcion",
        "area_id": 1,
        "startup_id": 5,
        "advertisement_id" : 5,
        "skills" : ["Responsable","React","Diseñador Ux", "Emprendedor"]
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos de la educación acutualizada
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Anuncio actualizado correctamente",
        "data": {
            "id": 5,
            "title": "Domingo domingo domingo se busca desarrollador full stack",
            "description": "descripciondescripciondescripciondescripciondescripciondescripciondescripcion",
            "state": "active",
            "slug": "domingo-domingo-domingo-se-busca-desarrollador-full-stack",
            "area_id": 1,
            "startup_id": 5,
            "created_at": "2019-11-13T16:32:01.000Z"
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /ads/update/skills POST advertisement skill update
 * @apiName advertisement skill update
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Creacion de la experiencia del usuario
 * @apiParam {Int} advertisement_id Id del anuncio.
 * @apiParam {Object[]} skills Id's de las habilidades
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/update/skills
    {
        "advertisement_id" : 2,
        "skills" : [1,2]
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Skills actualizados correctamente"
    }
 *
 *
 */

/**
 *
 * @api {GET} /ads/:id/detail GET advertisement detail
 * @apiName advertisement detail
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Detalle del anuncio
 * @apiParam {Int} id Id del anuncio.
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/2/detail
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio con detalle
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "OK",
        "data": {
            "id": 2,
            "title": "Programador en Javascript",
            "description": "Conocimientos solidos en NODEJS Y REACT",
            "state": "archived",
            "area_id": 1,
            "startup_id": 1,
            "created_at": "2019-10-03T20:47:28.000Z",
            "skills": [
                {
                    "id": 1,
                    "skill": "PHP",
                    "advertisement_skill": {
                        "advertisement_id": 2,
                        "skill_id": 1
                    }
                },
                {
                    "id": 2,
                    "skill": "Node JS",
                    "advertisement_skill": {
                        "advertisement_id": 2,
                        "skill_id": 2
                    }
                }
            ],
            "area": {
                "id": 1,
                "name": "Area 1"
            },
            "startup": {
                "id": 1,
                "name": "Proyecto Exitum",
                "photo_url": null,
                "ruc": null,
                "description": "Proyecto que pretende ayudar startups",
                "entrepreneur_id": 1,
                "category_id": 1,
                "stage_id": 1
            }
        }
    }
 *
 *
 */

/**
 *
 * @api {GET} /ads/list GET advertisements list
 * @apiName advertisements list
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/list
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct[]} data Indica el listado de anuncios
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "OK",
        "data": [
            {
                "id": 3,
                "title": "Programador en Java",
                "description": "Requiero un programador senior",
                "state": "active",
                "area_id": 1,
                "startup_id": 1,
                "created_at": "2019-10-03T20:54:26.000Z",
                "skills": [
                    {
                        "id": 1,
                        "skill": "PHP",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 1
                        }
                    },
                    {
                        "id": 2,
                        "skill": "Node JS",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 2
                        }
                    },
                    {
                        "id": 3,
                        "skill": "Javascript",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 3
                        }
                    }
                ],
                "area": {
                    "id": 1,
                    "name": "Área 1"
                },
                "startup": {
                    "id": 1,
                    "name": "Proyecto Exitum",
                    "photo_url": null,
                    "ruc": null,
                    "description": "Proyecto que pretende ayudar startups",
                    "entrepreneur_id": 1,
                    "category_id": 1,
                    "stage_id": 1
                }
            }
        ]
    }
 *
 *
 */

/**
 *
 * @api {GET} /ads/user/:id/list GET advertisements by id
 * @apiName advertisements by id
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} active Estado del anuncio
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/user/4/list
    {
	    "state" : "active"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct[]} data Indica el listado de anuncios del usuario
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "OK",
        "data": [
            {
                "id": 3,
                "title": "Programador en Java",
                "description": "Requiero un programador senior",
                "state": "active",
                "area_id": 1,
                "startup_id": 1,
                "created_at": "2019-10-03T20:54:26.000Z",
                "skills": [
                    {
                        "id": 1,
                        "skill": "PHP",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 1
                        }
                    },
                    {
                        "id": 2,
                        "skill": "Node JS",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 2
                        }
                    },
                    {
                        "id": 3,
                        "skill": "Javascript",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 3
                        }
                    }
                ],
                "area": {
                    "id": 1,
                    "name": "Área 1"
                },
                "startup": {
                    "id": 1,
                    "name": "Proyecto Exitum",
                    "photo_url": null,
                    "ruc": null,
                    "description": "Proyecto que pretende ayudar startups",
                    "entrepreneur_id": 1,
                    "category_id": 1,
                    "stage_id": 1,
                    "entrepreneur": {
                        "id": 1,
                        "user_id": 4
                    }
                }
            }
        ]
    }
 *
 *
 */

/**
 *
 * @api {GET} /ads/user/:id/list GET advertisements by id
 * @apiName advertisements by id
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} active Estado del anuncio
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/user/4/list
    {
	    "state" : "active"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct[]} data Indica el listado de anuncios del usuario
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "OK",
        "data": [
            {
                "id": 3,
                "title": "Programador en Java",
                "description": "Requiero un programador senior",
                "state": "active",
                "area_id": 1,
                "startup_id": 1,
                "created_at": "2019-10-03T20:54:26.000Z",
                "skills": [
                    {
                        "id": 1,
                        "skill": "PHP",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 1
                        }
                    },
                    {
                        "id": 2,
                        "skill": "Node JS",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 2
                        }
                    },
                    {
                        "id": 3,
                        "skill": "Javascript",
                        "advertisement_skill": {
                            "advertisement_id": 3,
                            "skill_id": 3
                        }
                    }
                ],
                "area": {
                    "id": 1,
                    "name": "Área 1"
                },
                "startup": {
                    "id": 1,
                    "name": "Proyecto Exitum",
                    "photo_url": null,
                    "ruc": null,
                    "description": "Proyecto que pretende ayudar startups",
                    "entrepreneur_id": 1,
                    "category_id": 1,
                    "stage_id": 1,
                    "entrepreneur": {
                        "id": 1,
                        "user_id": 4
                    }
                }
            }
        ]
    }
 *
 *
 */

/**
*
* @api {GET} /ads/listBySkill?user_id=10 GET advertisements by skill
* @apiName advertisements by skill
* @apiGroup ADVERTISEMENT
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creacion del anuncio de trabajo.
* @apiParam {Int} user_id Id del usuario
   * @apiParamExample {querystring} Ejemplo url
   /ads/listBySkill?user_id=10
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Listado de anuncios por skill",
       "data": [
           {
               "id": 10,
               "title": "Desarrollo de plataforma web",
               "description": "Descripción del proyecto\nDescripción del proyecto\nDescripción del proyecto",
               "state": "active",
               "area_id": 2,
               "startup_id": 5,
               "created_at": "2019-10-31T15:45:42.000Z",
               "skills": [
                   {
                       "id": 7,
                       "skill": "eee",
                       "icon": null,
                       "advertisement_skill": {
                           "advertisement_id": 10,
                           "skill_id": 7
                       }
                   }
               ],
               "startup": {
                   "id": 5,
                   "name": "Proyecto Exitum",
                   "photo_url": "",
                   "ruc": null,
                   "description": "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.",
                   "avg_rating": 0,
                   "entrepreneur_id": 4,
                   "category_id": 1,
                   "stage_id": 2,
                   "entrepreneur": {
                       "id": 4,
                       "user_id": 9
                   }
               }
           },
           {
               "id": 11,
               "title": "Desarrollo de plataforma web",
               "description": "Descripción del proyecto\nDescripción del proyecto\nDescripción del proyecto",
               "state": "active",
               "area_id": 4,
               "startup_id": 5,
               "created_at": "2019-10-31T15:46:13.000Z",
               "skills": [
                   {
                       "id": 4,
                       "skill": "ddsd",
                       "icon": null,
                       "advertisement_skill": {
                           "advertisement_id": 11,
                           "skill_id": 4
                       }
                   },
                   {
                       "id": 7,
                       "skill": "eee",
                       "icon": null,
                       "advertisement_skill": {
                           "advertisement_id": 11,
                           "skill_id": 7
                       }
                   }
               ],
               "startup": {
                   "id": 5,
                   "name": "Proyecto Exitum",
                   "photo_url": "",
                   "ruc": null,
                   "description": "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.",
                   "avg_rating": 0,
                   "entrepreneur_id": 4,
                   "category_id": 1,
                   "stage_id": 2,
                   "entrepreneur": {
                       "id": 4,
                       "user_id": 9
                   }
               }
           }
       ],
       "current": 1,
       "pages": 1
   }
*
*
*/

/**
*
* @api {GET} /ads/listByProposal?user_id=10 GET advertisements by proposal
* @apiName advertisements by proposal
* @apiGroup ADVERTISEMENT
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creacion del anuncio de trabajo.
* @apiParam {Int} user_id Id del usuario
  * @apiParamExample {querystring} Ejemplo url
  /ads/listByProposal?user_id=10
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
  {
      "status": true,
      "message": "Listado de anuncios por postulación",
      "data": [
          {
              "id": 2,
              "title": "titulo",
              "description": "descripciondescripciondescripciondescripciondescripciondescripciondescripcion",
              "state": "archived",
              "area_id": 1,
              "startup_id": 5,
              "created_at": "2019-10-31T15:32:00.000Z",
              "startup": {
                  "id": 5,
                  "name": "Proyecto Exitum",
                  "photo_url": "",
                  "ruc": null,
                  "description": "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.",
                  "avg_rating": 0,
                  "entrepreneur_id": 4,
                  "category_id": 1,
                  "stage_id": 2,
                  "entrepreneur": {
                      "id": 4,
                      "user_id": 9
                  }
              }
          }
      ],
      "current": 1,
      "pages": 1
  }
*
*
*/

/**
 *
 * @api {GET} /ads/recomendations?advertisement_id=ID&page=PAGE GET recomendations by advertisement
 * @apiName recomendations by advertisement
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 *
	* @apiParamExample {querystring} Ejemplo url
    /ads/recomendations?advertisement_id=3&page=1
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Obejct[]} data Indica el listado de impulsores
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Lista de impulsores recomendados",
        "data": [
            {
                "id": 7,
                "name": "Aldo",
                "lastname": "Cabezoniarini",
                "photo": "https://techie-exitum.s3-us-west-1.amazonaws.com/techie-exitum/imagenes/user-profile/7af56780-01ab-11ea-a1a8-0123456789ab1cama.png",
                "description": "Soy una bandida bien rica , me gusta miya lo amo.",
                "avg_rating": 0,
                "toUserSkills": [
                    {
                        "id": 2,
                        "skill": "Diseñador Ux",
                        "icon": null,
                        "skill_user": {
                            "user_id": 7,
                            "skill_id": 2,
                            "highlight": 0
                        }
                    },
                    {
                        "id": 1,
                        "skill": "Emprendedor",
                        "icon": null,
                        "skill_user": {
                            "user_id": 7,
                            "skill_id": 1,
                            "highlight": 1
                        }
                    }
                ],
                "employee": {
                    "id": 3,
                    "user_id": 7,
                    "category_id": 1,
                    "stage_id": 6,
                    "short_description": "Desarrollador Web",
                    "about_me": "Soy un desarrollor web",
                    "price_hour": "15.50",
                    "behance_user": null,
                    "behance_active": null,
                    "linkedin_active": null,
                    "invitations": [
                        {
                            "created_at": "2019-11-11T16:39:49.000Z",
                            "saved": 1,
                            "advertisement_id": 3,
                            "employee_id": 3
                        }
                    ]
                }
            },
            {
                "id": 8,
                "name": "javier",
                "lastname": "lecca",
                "photo": null,
                "description": null,
                "avg_rating": 0,
                "toUserSkills": [
                    {
                        "id": 2,
                        "skill": "Diseñador Ux",
                        "icon": null,
                        "skill_user": {
                            "user_id": 8,
                            "skill_id": 2,
                            "highlight": 0
                        }
                    },
                    {
                        "id": 1,
                        "skill": "Emprendedor",
                        "icon": null,
                        "skill_user": {
                            "user_id": 8,
                            "skill_id": 1,
                            "highlight": 1
                        }
                    }
                ],
                "employee": {
                    "id": 4,
                    "user_id": 8,
                    "category_id": 1,
                    "stage_id": 6,
                    "short_description": "Desarrollador Web",
                    "about_me": "Soy un desarrollor web",
                    "price_hour": "15.50",
                    "behance_user": null,
                    "behance_active": null,
                    "linkedin_active": null,
                    "invitations": []
                }
            }
        ],
        "current": "1",
        "pages": 1
    }
 *
 *
 */

/**
*
* @api {POST} /ads/invitation POST favorite create
* @apiName favorite create
* @apiGroup ADVERTISEMENT
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creacion del impulsor favorito.
* @apiParam {Int} advertisement_id Id del anuncio
* @apiParam {Int} user_id Id del impulsor
* @apiParam {Int} saved Valor 0 o 1
   * @apiParamExample {querystring} Ejemplo url
   /ads/invitation
   {
       "advertisement_id": 3,
       "user_id": 3,
       "saved": 1
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Impulsor favorito creado o modificado"
   }
*
*
*/

/**
*
* @api {GET} /ads/favorites?advertisement_id=3&page=1 GET favorites
* @apiName favorites
* @apiGroup ADVERTISEMENT
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Impulsor de favoritos.
* @apiParam {Int} advertisement_id Id del anuncio
  * @apiParamExample {querystring} Ejemplo url
  /ads/favorites?advertisement_id=3&page=1
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
{
  "status": true,
  "message": "Lista de impulsores favoritos.",
  "data": [
      {
          "created_at": "2019-11-12T16:06:05.000Z",
          "saved": 0,
          "advertisement_id": 3,
          "employee_id": 1,
          "employee": {
              "id": 1,
              "user_id": 13,
              "category_id": 1,
              "stage_id": 6,
              "short_description": "Desarrollador Web",
              "about_me": "Soy un desarrollor web",
              "price_hour": "15.50",
              "behance_user": null,
              "behance_active": null,
              "linkedin_active": null,
              "user": {
                  "id": 13,
                  "name": "Leidy2",
                  "lastname": "Callupe2",
                  "photo": null,
                  "description": null,
                  "avg_rating": 2
              },
              "invitations": [
                  {
                      "created_at": "2019-11-12T16:06:05.000Z",
                      "saved": 0,
                      "advertisement_id": 3,
                      "employee_id": 1
                  }
              ]
          }
      },
      {
          "created_at": "2019-11-12T16:06:06.000Z",
          "saved": 0,
          "advertisement_id": 3,
          "employee_id": 2,
          "employee": {
              "id": 2,
              "user_id": 10,
              "category_id": 1,
              "stage_id": 6,
              "short_description": "Desarrollador Web",
              "about_me": "Soy un desarrollor web",
              "price_hour": "15.50",
              "behance_user": null,
              "behance_active": null,
              "linkedin_active": null,
              "user": {
                  "id": 10,
                  "name": "José",
                  "lastname": "Cristobal",
                  "photo": null,
                  "description": null,
                  "avg_rating": 4
              },
              "invitations": [
                  {
                      "created_at": "2019-11-12T16:06:06.000Z",
                      "saved": 0,
                      "advertisement_id": 3,
                      "employee_id": 2
                  }
              ]
          }
      },
      {
          "created_at": "2019-11-11T16:39:49.000Z",
          "saved": 1,
          "advertisement_id": 3,
          "employee_id": 3,
          "employee": {
              "id": 3,
              "user_id": 7,
              "category_id": 1,
              "stage_id": 6,
              "short_description": "Desarrollador Web",
              "about_me": "Soy un desarrollor web",
              "price_hour": "15.50",
              "behance_user": null,
              "behance_active": null,
              "linkedin_active": null,
              "user": {
                  "id": 7,
                  "name": "Aldo",
                  "lastname": "Cabezoniarini",
                  "photo": "https://techie-exitum.s3-us-west-1.amazonaws.com/techie-exitum/imagenes/user-profile/7af56780-01ab-11ea-a1a8-0123456789ab1cama.png",
                  "description": "Soy una bandida bien rica , me gusta miya lo amo.",
                  "avg_rating": 1
              },
              "invitations": [
                  {
                      "created_at": "2019-11-11T16:39:49.000Z",
                      "saved": 1,
                      "advertisement_id": 3,
                      "employee_id": 3
                  }
              ]
          }
      },
      {
          "created_at": "2019-11-12T15:51:50.000Z",
          "saved": 1,
          "advertisement_id": 3,
          "employee_id": 4,
          "employee": {
              "id": 4,
              "user_id": 8,
              "category_id": 1,
              "stage_id": 6,
              "short_description": "Desarrollador Web",
              "about_me": "Soy un desarrollor web",
              "price_hour": "15.50",
              "behance_user": null,
              "behance_active": null,
              "linkedin_active": null,
              "user": {
                  "id": 8,
                  "name": "javier",
                  "lastname": "lecca",
                  "photo": null,
                  "description": null,
                  "avg_rating": 2
              },
              "invitations": [
                  {
                      "created_at": "2019-11-12T15:51:50.000Z",
                      "saved": 1,
                      "advertisement_id": 3,
                      "employee_id": 4
                  }
              ]
          }
      }
  ],
  "current": 1,
  "pages": 1
}
*
*
*/


/**
*
* @api {POST} /challenges/createStage POST create stage
* @apiName create stage
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creación de etapa en la que se encuentra el reto
* @apiParam {String} stage Nombre de la etapa.
* @apiParam {String} description Descripción de la etapa
* @apiParam {String} type Tipo a quien le pertenece esta etapa (startup o employee)
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/createStage
   {
       "stage": "semilla",
       "description": "Etapa semilla",
       "type": "startup"
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica la etapa recien creada
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Etapa creado correctamente.",
       "data": {
           "stage": "semilla",
           "description": "Etapa semilla",
           "type": "startup"
       }
   }
*
*
*/

/**
*
* @api {POST} /challenges/createStep POST create step
* @apiName create step
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creación de nivel en la que se encuentra el reto.
* @apiParam {Int} stage_id Id de la etapa a la que pertenece el nivel.
* @apiParam {File} photo Icono del nivel.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/createStep
   {
       "stage_id": "1",
       "photo": ""
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica el nivel recien creado
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Nivel creado correctamente.",
       "data": {
           "id": 7,
           "icon": "892b95e0-eb8a-11e9-acef-0123456789abfoodU.png",
           "stage_id": "1"
       }
   }
*
*
*/

/**
*
* @api {POST} /challenges/createTip POST create tip
* @apiName create tip
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creación del reto.
* @apiParam {Int} step_id Id del nivel al que pertenece el reto.
* @apiParam {String} tip Descripción del reto.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/createTip
   {
       "tip": "Crear mi equipo de desarrollo",
       "step_id": 7
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica el reto recien creado
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Reto creado correctamente",
       "data": {
           "id": 2,
           "tip": "Crear mi equipo de desarrollo",
           "step_id": 7
       }
   }
*
*
*/

/**
*
* @api {GET} /challenges/listStage/:startup_id GET list stage startup
* @apiName list stage startup
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista de etapa y sus niveles de la startup.
* @apiParam {Int} startup_id Id de la startup.

*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/listStage/5
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Etapa actual con sus niveles",
       "data": {
           "id": 1,
           "stage": "Pre semilla",
           "description": "Etapa donde solo se tiene una idea superficial y se busca validarla.",
           "type": "startup",
           "steps": [
               {
                   "id": 1,
                   "icon": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                   "step": "Nivel 1 Etapa 1 startup",
                   "stage_id": 1,
                   "startup_steps": [
                       {
                           "startup_id": 9,
                           "step_id": 1,
                           "tip_completed": 0,
                           "icon_count_tip": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg",
                           "state": "incompleto"
                       }
                   ],
                   "challenges": [
                       {
                           "id": 1,
                           "user_id": 7,
                           "employee_id": null,
                           "startup_id": 9,
                           "stage_id": 1,
                           "step_id": 1,
                           "tip_id": 1,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-10-30T14:33:25.000Z",
                           "comment": null,
                           "reply": null
                       },
                       {
                           "id": 2,
                           "user_id": 7,
                           "employee_id": null,
                           "startup_id": 9,
                           "stage_id": 1,
                           "step_id": 1,
                           "tip_id": 2,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-10-30T14:33:25.000Z",
                           "comment": null,
                           "reply": null
                       },
                       {
                           "id": 3,
                           "user_id": 7,
                           "employee_id": null,
                           "startup_id": 9,
                           "stage_id": 1,
                           "step_id": 1,
                           "tip_id": 3,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-10-30T14:33:25.000Z",
                           "comment": null,
                           "reply": null
                       },
                       {
                           "id": 4,
                           "user_id": 7,
                           "employee_id": null,
                           "startup_id": 9,
                           "stage_id": 1,
                           "step_id": 1,
                           "tip_id": 4,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-10-30T14:33:25.000Z",
                           "comment": null,
                           "reply": null
                       }
                   ]
               }
           ]
       }
   }
*
*
*/

/**
*
* @api {GET} /challenges/listStep?step_id=ID&startup_id=IDD GET list step startup
* @apiName list step startup
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista del nivel y sus retos de la startup.
* @apiParam {Int} startup_id Id de la startup.
* @apiParam {Int} step_id Id del step o nivel.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/listStep?step_id=1&startup_id=6
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Listado de retos por nivel de la startup",
       "data": {
           "id": 1,
           "icon": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
           "step": "Nivel 1 Etapa 1 startup",
           "stage_id": 1,
           "challenges": [
               {
                   "id": 1,
                   "user_id": 7,
                   "employee_id": null,
                   "startup_id": 5,
                   "stage_id": 1,
                   "step_id": 1,
                   "tip_id": 1,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-10-25T21:42:00.000Z",
                   "comment": null
               },
               {
                   "id": 2,
                   "user_id": 7,
                   "employee_id": null,
                   "startup_id": 5,
                   "stage_id": 1,
                   "step_id": 1,
                   "tip_id": 2,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-10-25T21:42:00.000Z",
                   "comment": null
               },
               {
                   "id": 3,
                   "user_id": 7,
                   "employee_id": null,
                   "startup_id": 5,
                   "stage_id": 1,
                   "step_id": 1,
                   "tip_id": 3,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-10-25T21:42:00.000Z",
                   "comment": null
               },
               {
                   "id": 4,
                   "user_id": 7,
                   "employee_id": null,
                   "startup_id": 5,
                   "stage_id": 1,
                   "step_id": 1,
                   "tip_id": 4,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-10-25T21:42:00.000Z",
                   "comment": null
               }
           ]
       }
   }
*
*
*/


/**
*
* @api {POST} /challenges/reply POST reply tip
* @apiName reply tip
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista del nivel y sus retos de la startup.
* @apiParam {File} file Archivo.
* @apiParam {Int} challenge_id Id del reto.
* @apiParam {String} reply Respuesta.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/reply
   {
       "file": "Documento.docx",
       "challenge_id": 1,
       "reply": "Respuesta al reto"
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Respuesta enviada correctamente"
   }
*
*
*/

/**
*
* @api {POST} /challenges/download/:file POST download file
* @apiName download file
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista del nivel y sus retos de la startup.
* @apiParam {String} file Nomnbre del archivo.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/download/maria.PNG
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
   {
   }
*
*
*/

/**
*
* @api {GET} /challenges/listStageEmp/:user_id GET list stage employee
* @apiName list stage employee
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista de etapa y sus niveles del employee.
* @apiParam {Int} startup_id Id de la startup.

*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/listStageEmp/8
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Etapa actual con sus niveles",
       "data": {
           "id": 6,
           "stage": "Etapa 1 empleado",
           "description": "Etapa 1 empleado.",
           "type": "employee",
           "steps": [
               {
                   "id": 21,
                   "icon": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                   "step": "Nivel 1 Etapa 1 employee",
                   "stage_id": 6,
                   "employee_steps": [
                       {
                           "employee_id": 4,
                           "step_id": 21,
                           "tip_completed": 0,
                           "icon_count_tip": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg",
                           "state": "incompleto"
                       }
                   ],
                   "challenges": [
                       {
                           "id": 321,
                           "user_id": 8,
                           "employee_id": 4,
                           "startup_id": null,
                           "stage_id": 6,
                           "step_id": 21,
                           "tip_id": 65,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-11-08T20:39:49.000Z",
                           "comment": null,
                           "reply": null
                       },
                       {
                           "id": 322,
                           "user_id": 8,
                           "employee_id": 4,
                           "startup_id": null,
                           "stage_id": 6,
                           "step_id": 21,
                           "tip_id": 66,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-11-08T20:39:49.000Z",
                           "comment": null,
                           "reply": null
                       }
                   ]
               },
               {
                   "id": 22,
                   "icon": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
                   "step": "Nivel 2 Etapa 1 employee",
                   "stage_id": 6,
                   "employee_steps": [
                       {
                           "employee_id": 4,
                           "step_id": 22,
                           "tip_completed": 0,
                           "icon_count_tip": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg",
                           "state": "incompleto"
                       }
                   ],
                   "challenges": [
                       {
                           "id": 325,
                           "user_id": 8,
                           "employee_id": 4,
                           "startup_id": null,
                           "stage_id": 6,
                           "step_id": 22,
                           "tip_id": 69,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-11-08T20:39:49.000Z",
                           "comment": null,
                           "reply": null
                       },
                       {
                           "id": 326,
                           "user_id": 8,
                           "employee_id": 4,
                           "startup_id": null,
                           "stage_id": 6,
                           "step_id": 22,
                           "tip_id": 70,
                           "checked": false,
                           "status": "Verificando",
                           "date": "2019-11-08T20:39:49.000Z",
                           "comment": null,
                           "reply": null
                       }
                   ]
               }
           ]
       }
   }
*
*
*/

/**
*
* @api {GET} /challenges/listStepEmp?step_id=ID&user_id=IDD GET list step employee
* @apiName list step employee
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista del nivel y sus retos del impulsor.
* @apiParam {Int} user_id Id del usuario.
* @apiParam {Int} step_id Id del step o nivel.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/listStepEmp?step_id=21&user_id=8
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Listado de retos por nivel del impulsor",
       "data": {
           "id": 21,
           "icon": "https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png",
           "step": "Nivel 1 Etapa 1 employee",
           "stage_id": 6,
           "challenges": [
               {
                   "id": 321,
                   "user_id": 8,
                   "employee_id": 4,
                   "startup_id": null,
                   "stage_id": 6,
                   "step_id": 21,
                   "tip_id": 65,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-11-08T20:39:49.000Z",
                   "comment": null,
                   "reply": null,
                   "tip": {
                       "id": 65,
                       "tip": "Reto 1 Nivel 1 Etapa 1 employee",
                       "description": null,
                       "step_id": 21,
                       "file_tips": []
                   }
               },
               {
                   "id": 322,
                   "user_id": 8,
                   "employee_id": 4,
                   "startup_id": null,
                   "stage_id": 6,
                   "step_id": 21,
                   "tip_id": 66,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-11-08T20:39:49.000Z",
                   "comment": null,
                   "reply": null,
                   "tip": {
                       "id": 66,
                       "tip": "Reto 2 Nivel 1 Etapa 1 employee",
                       "description": null,
                       "step_id": 21,
                       "file_tips": []
                   }
               },
               {
                   "id": 323,
                   "user_id": 8,
                   "employee_id": 4,
                   "startup_id": null,
                   "stage_id": 6,
                   "step_id": 21,
                   "tip_id": 67,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-11-08T20:39:49.000Z",
                   "comment": null,
                   "reply": null,
                   "tip": {
                       "id": 67,
                       "tip": "Reto 3 Nivel 1 Etapa 1 employee",
                       "description": null,
                       "step_id": 21,
                       "file_tips": []
                   }
               },
               {
                   "id": 324,
                   "user_id": 8,
                   "employee_id": 4,
                   "startup_id": null,
                   "stage_id": 6,
                   "step_id": 21,
                   "tip_id": 68,
                   "checked": false,
                   "status": "Verificando",
                   "date": "2019-11-08T20:39:49.000Z",
                   "comment": null,
                   "reply": null,
                   "tip": {
                       "id": 68,
                       "tip": "Reto 4 Nivel 1 Etapa 1 employee",
                       "description": null,
                       "step_id": 21,
                       "file_tips": []
                   }
               }
           ]
       }
   }
*
*
*/

/**
*
* @api {GET} /challenges/summaryTips?tip_id=ID GET summary of tips
* @apiName summary of tips
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Retos cumplidos por otros usuarios.
* @apiParam {Int} tip_id Id del reto
*
  * @apiParamExample {querystring} Ejemplo url
  /challenges/summaryTips?tip_id=1
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
  {
      "status": true,
      "message": "Reto cumplido por otros usuario",
      "data": [
          {
              "reply": "ReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyRReplyeply",
              "date": "2019-11-07T15:39:41.000Z",
              "user": {
                  "id": 12,
                  "name": "Leidy",
                  "lastname": "Callupe",
                  "photo": null
              }
          }
      ]
  }
*
*
*/

/**
*
* @api {GET} /challenges/toVerify?user_id=ID&page=IDD GET list to verify
* @apiName list to verify
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Lista de retos para verificar
* @apiParam {Int} user_id Id del usuario.
* @apiParam {Int} page Pagina.
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/toVerify?user_id=12&page=1
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica la etapa recien creada
* @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Retos para verificar.",
        "data": [
            {
                "id": 1,
                "date": "2019-11-20T17:15:17.000Z",
                "reply": "respuesta al reto planteado la la la",
                "comment": null,
                "user": {
                    "name": "javier",
                    "lastname": "lecca",
                    "photo": "https://lh3.googleusercontent.com/a-/AAuE7mAyWr2a92TAb5wTFjscn43EXZSXSCOyfAVH49rA=s50"
                },
                "tip": {
                    "id": 1,
                    "tip": "Reto 1 Nivel 1 Etapa 1 startup",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "step_id": 1,
                    "tip_skills": [
                        {
                            "tip_id": 1,
                            "skill_id": 1
                        },
                        {
                            "tip_id": 1,
                            "skill_id": 2
                        }
                    ],
                    "file_tips": [
                        {
                            "id": 1,
                            "name": "Business_Model_Canvas.docx",
                            "tip_id": 1
                        }
                    ]
                },
                "files": [
                    {
                        "id": 2,
                        "name": "verify.png",
                        "key_s3": "52ce79a0-0bb9-11ea-890e-0123456789abverify.png",
                        "challenge_id": 1
                    }
                ]
            },
            {
                "id": 2,
                "date": "2019-11-20T11:54:22.000Z",
                "reply": "respuesta al reto planteado la la la",
                "comment": null,
                "user": {
                    "name": "javier",
                    "lastname": "lecca",
                    "photo": "https://lh3.googleusercontent.com/a-/AAuE7mAyWr2a92TAb5wTFjscn43EXZSXSCOyfAVH49rA=s50"
                },
                "tip": {
                    "id": 2,
                    "tip": "Reto 2 Nivel 1 Etapa 1 startup",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "step_id": 1,
                    "tip_skills": [
                        {
                            "tip_id": 2,
                            "skill_id": 1
                        },
                        {
                            "tip_id": 2,
                            "skill_id": 2
                        }
                    ],
                    "file_tips": [
                        {
                            "id": 2,
                            "name": "Business_Model_Canvas.docx",
                            "tip_id": 2
                        }
                    ]
                },
                "files": []
            }
        ],
        "current": "1",
        "pages": 2
    }
*
*
*/

/**
*
* @api {POST} /challenges/verify POST verify
* @apiName verify
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Verificar o dejar observaciones al el reto
* @apiParam {Int} challenge_id Id del reto del usuario.
* @apiParam {String} comment Comentario de observación.
* @apiParam {String} status Nuevo estado del reto a evaluar ['Con observaciones', 'Verificado'].
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/verify
   {
        "challenge_id": 130,
        "comment": "Comentarios para mejorar la respuesta",
        "status": "Con observaciones"
    }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Reto verificado"
    }
*
*
*/

/**
*
* @api {POST} /challenges/verify POST verify two
* @apiName verify two
* @apiGroup CHALLENGES
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Verificar o dejar observaciones al el reto
* @apiParam {Int} challenge_id Id del reto del usuario.
* @apiParam {String} comment Comentario de observación.
* @apiParam {String} status Nuevo estado del reto a evaluar ['Con observaciones', 'Verificado'].
*
   * @apiParamExample {querystring} Ejemplo url
   /challenges/verify
    {
        "challenge_id": 130,
        "status": "Verificado"
    }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
* @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Reto verificado"
    }
*
*
*/

/**
*
* @api {POST} /proposals/create POST create proposal
* @apiName create proposal
* @apiGroup PROPOSALS
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Se crea o actualiza una propuesta para un anuncio.
* @apiParam {Int} id Id del usuario impulsor.
* @apiParam {Int} advertisement_id Id del anuncio.
*
   * @apiParamExample {querystring} Ejemplo url
   /proposals/create
   {
       "id": 3,
       "advertisement_id": 1
   }
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Object} data Indica la propuesta creado o actualizado
* @apiSuccessExample {json} Datos obtenidos:
   {
       "status": true,
       "message": "Propuesta creada correctamente.",
       "data": [
           {
               "accepted": false,
               "created_at": "2019-11-04T02:46:40.640Z",
               "employee_id": 3,
               "advertisement_id": 2
           }
       ]
   }
*
*
*/

/**
*
* @api {GET} /proposals/byAdvertisement?advertisement_id=ID GET proposals by advertisement
* @apiName proposals by advertisement
* @apiGroup ADVERTISEMENT
* @apiVersion 1.0.0
* @apiUse ErrorGeneral
* @apiDescription Creacion del anuncio de trabajo.
* @apiParam {Int} advertisement_id Id del anuncio
  * @apiParamExample {querystring} Ejemplo url
  /proposals/byAdvertisement?advertisement_id=1
*
* @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
* @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
* @apiSuccess (Datos obtenidos) {Obejct} data Indica los datos del anuncio
* @apiSuccessExample {json} Datos obtenidos:
  {
      "status": true,
      "message": "Listado de propuestas por anuncio",
      "data": [
          {
              "id": 2,
              "user_id": 10,
              "category_id": 1,
              "stage_id": 1,
              "short_description": "Desarrollador Web",
              "about_me": "Soy un desarrollor web",
              "price_hour": "15.50",
              "behance_user": null,
              "behance_active": null,
              "linkedin_active": null,
              "user": {
                  "id": 10,
                  "name": "José",
                  "lastname": "Cristobal",
                  "photo": null,
                  "description": null,
                  "avg_rating": 0,
                  "toUserSkills": []
              }
          }
      ],
      "current": 1,
      "pages": 1
  }
*
*
*/

/**
*
* @api {POST} /users/comment/:to_user_id POST create and update comment
* @apiName comentario
* @apiParam {Number} to_user_id ID del usuario al que se comentará.
* @apiExample Request parameter
* http://35.175.241.103:8081/users/comment/1
* @apiGroup REVIEW USER
*
* @apiVersion 1.0.0
* @apiDescription Comentario a un usuario.
* @apiSuccess (Datos requeridos) {Number} from_user_id ID del usuario que inicio sesion y desea comentar.
* @apiSuccess (Datos requeridos) {String} review Comentario que asignó el usuario.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "from_user_id": 2,
       "review": "Comentario del usuario 2"
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "Comentario asignado correctamente.",
       "data": {  }
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {POST} /users/rating/:to_user_id POST create and update rating
* @apiName Puntuar
* @apiParam {Number} to_user_id ID del usuario al que se puntuará.
* @apiExample Request parameter
* http://35.175.241.103:8081/users/rating/1
* @apiGroup REVIEW USER
*
* @apiVersion 1.0.0
* @apiDescription Puntuar a un usuario.
* @apiSuccess (Datos requeridos) {Number} from_user_id ID del usuario que inicio sesion y desea puntuar.
* @apiSuccess (Datos requeridos) {Number} rating Puntaje del 1 al 5 que asignó el usuario.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "from_user_id": 2,
       "rating": 5
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "Rating asignado correctamente.",
       "data": {}
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {POST} /startups/recommendation/:startup_id POST create and update recommendation
* @apiName Recomendación Startup
* @apiParam {Number} startup ID startup al que se comentará.
* @apiExample Request parameter
* http://35.175.241.103:8081/startups/recommendation/1
* @apiGroup REVIEW STARTUP
*
* @apiVersion 1.0.0
* @apiDescription Recomendación a una startup.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que inicio sesion y desea comentar.
* @apiSuccess (Datos requeridos) {String} review Recomendación que asignó el usuario.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "user_id": 2,
       "review": "Recomendación del usuario 2"
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "Recomendación asignada correctamente.",
       "data": {  }
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {POST} /startups/rating/:startup_id POST create and update rating
* @apiName Puntuar Startup
* @apiParam {Number} startup_id ID del usuario al que se puntuará.
* @apiExample Request parameter
* http://35.175.241.103:8081/startups/rating/1
* @apiGroup REVIEW STARTUP
*
* @apiVersion 1.0.0
* @apiDescription Puntuar a un usuario.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que inicio sesion y desea puntuar.
* @apiSuccess (Datos requeridos) {Number} rating Puntaje del 1 al 5 que asignó el usuario.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "user_id": 2,
       "rating": 5
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "Rating asignado correctamente.",
       "data": {}
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {GET} /categories/list GET list categories
* @apiName List Categories
* @apiExample Request parameter
* http://35.175.241.103:8081/categories/list
* @apiGroup CATEGORY
*
* @apiVersion 1.0.0
* @apiDescription Listar.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "OK.",
       "data": [
           {
               "id": 1,
               "name": "Tecnológico"
           },
           {
               "id": 2,
               "name": "Radio y televisión"
           },
           ...
       ]
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {POST} /categories/search POST find and create categories
* @apiName Search Categories
* @apiExample Request parameter
* http://35.175.241.103:8081/categories/search
* @apiGroup CATEGORY
*
* @apiVersion 1.0.0
* @apiDescription Puntuar a un usuario.
* @apiSuccess (Datos requeridos) {String} category Nombre del una categoria.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "category": "tecn"
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "Rating asignado correctamente.",
       "data": {
           "id": 1,
           "name": "Tecnológico"
       }
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {GET} /stages/list GET list stages
* @apiName List Stages
* @apiExample Request parameter
* http://35.175.241.103:8081/stages/list
* @apiGroup STAGE
*
* @apiVersion 1.0.0
* @apiDescription Listar.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "OK.",
       ""data": [
           {
               "id": 1,
               "stage": "Pre semilla",
               "description": "Etapa donde solo se tiene una idea superficial y se busca validarla.",
               "type": "startup"
           },
           {
               "id": 2,
               "stage": "Semilla",
               "description": "Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.",
               "type": "startup"
           },
           ...
       ]
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {GET} /stages/show/:type GET show stages x type
* @apiName List stages x type
* @apiParam {String} type Tipo de stage exitente.
* @apiExample Request parameter
* http://35.175.241.103:8081/stages/show/startups
* @apiGroup CATEGORY
*
* @apiVersion 1.0.0
* @apiDescription  List stages x type.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "Rating asignado correctamente.",
       "data": [
           {
               "id": 1,
               "stage": "Pre semilla",
               "description": "Etapa donde solo se tiene una idea superficial y se busca validarla.",
               "type": "startup"
           },
           {
               "id": 2,
               "stage": "Semilla",
               "description": "Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.",
               "type": "startup"
           },
           ...
       ]
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {POST} /stages/create POST create a stage
* @apiName Crear Stage
* @apiExample Request parameter
* http://35.175.241.103:8081/stages/create
* @apiGroup STAGE
*
* @apiVersion 1.0.0
* @apiDescription Puntuar a un usuario.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que inicio sesion y desea puntuar.
* @apiSuccess (Datos requeridos) {Number} rating Puntaje del 1 al 5 que asignó el usuario.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "stage": "stage",
       "description": "description",
       "type":"type"
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "OK",
       "data": {
           "id": ...,
           "stage": "stage",
           "description": "description",
           "type": "employee"
       }
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {GET} /certifications/list-by-id/:user_id GET show certifications user
* @apiName Lista de certificaciones del usuario.
* @apiParam {String} user_id ID del usuario.
* @apiExample Request parameter
* http://35.175.241.103:8081/certifications/list-by-id/1
* @apiGroup CERTIFICATION
*
* @apiVersion 1.0.0
* @apiDescription  Show Certification User
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "OK",
      "data": [
          {
              "id": 2,
              "name": "Cisco Certification",
              "issuing_company": "Cisco",
              "expedition": "12/12/2015",
              "expiration": "12/12/2019",
              "document_url": "cde85510-fa94-11e9-bcbf-0123456789abSO011.pdf"
          }
          ...
      ]
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /certifications/create POST create a certification
* @apiName Crear Certificación
* @apiExample Request parameter
* http://35.175.241.103:8081/certifications/create
* @apiGroup CERTIFICATION
*
* @apiVersion 1.0.0
* @apiDescription Asignar una certificación.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que inicio sesión.
* @apiSuccess (Datos requeridos) {String} name El nombre de la certificación.
* @apiSuccess (Datos requeridos) {String} issuing_company El nombre de la empresa que emitió el certificado.
* @apiSuccess (Datos requeridos) {String} date_expedition Fecha de la expedición del certificado.
* @apiSuccess (Datos requeridos) {String} date_expiration Fecha de vencimiento del certificado
* @apiSuccess (Datos requeridos) {File} document Archivo que acredite el certificado
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "user_id": 1,
       "name": "Cisco Certification",
       "issuing_company": "Cisco",
       "date_expedition": "2015-12-12"
       "date_expiration": "2019-12-12",
       "file": "SO011.pdf"
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "OK",
       "data": {  }
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {GET} /certifications/download/:fileName GET download certifications
* @apiName Descargar certificación
* @apiParam {String} fileName Nombre del archivo.
* @apiExample Request parameter
* http://35.175.241.103:8081/certifications/download/pdf-name.pdf
* @apiGroup CERTIFICATION
*
* @apiVersion 1.0.0
* @apiDescription  Descargar certificación.
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  { }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /certifications/delete POST delete a certification
* @apiName Eliminar Certificación
* @apiExample Request parameter
* http://35.175.241.103:8081/certifications/delete
* @apiGroup CERTIFICATION
*
* @apiVersion 1.0.0
* @apiDescription Eliminar una certificación.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que inicio sesión.
* @apiSuccess (Datos requeridos) {Number} certification_id ID del certificado.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
      "user_id": 1,
      "certification_id": 1
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "OK",
      "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /schedules/create/:user_id POST availability time user
* @apiName Horario de disponibilidad
* @apiParam {Number} user_id ID del usuario al que se asignará el horario.
* @apiExample Request parameter
* http://35.175.241.103:8081/schedules/create/1
* @apiGroup SCHEDULE
*
* @apiVersion 1.0.0
* @apiDescription Asignar una horario de disponiblidad.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que inicio sesión.
* @apiSuccess (Datos requeridos) {Date} from_hour Hora de inicio de trabajo de un usuario.
* @apiSuccess (Datos requeridos) {Date} to_hour Hora final de trabajo del usuario.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
   {
       "from_hour": "7:00 am",
       "to_hour": "10:00 pm"
   }
*@apiSuccessExample { json } Datos retornados
   HTTP/1.1 200 OK
   {
       "status": true,
       "message": "OK",
       "data": {  }
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
   HTTP/1.1 4xx Error
   {
       "status" : false,
       "message": "(...)",
       "data":  { }
   }
*
*
*/

/**
*
* @api {POST} /schedules/not-available/:user_id POST not available time user
* @apiName Horario no disponible
* @apiParam {Number} user_id ID del usuario al que se asignará el horario.
* @apiExample Request parameter
* http://35.175.241.103:8081/schedules/not-available/1
* @apiGroup SCHEDULE
*
* @apiVersion 1.0.0
* @apiDescription Asignar una hora no disponible.
* @apiSuccess (Datos requeridos) {Time} not_available Hora no disponible.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
      "not_available": "1:00 PM"
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "OK",
      "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /schedules/schedule/:user_id POST available hours user
* @apiName Horas disponible
* @apiParam {Number} user_id ID del usuario al que se asignará el horario.
* @apiExample Request parameter
* http://35.175.241.103:8081/schedules/schedule/1
* @apiGroup SCHEDULE
*
* @apiVersion 1.0.0
* @apiDescription Horas disponible.
* @apiSuccess (Datos requeridos) {Date} date Fecha en la cual se quiere obtener las horas disponible.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
      "date": "2019-12-10"
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "OK",
      "data": [
          "7:00 AM",
          "8:00 AM"
          ...
      ]
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /appointments/create/:to_user_id POST reservation
* @apiName Reserva de horario
* @apiParam {Number} to_user_id ID del usuario al que se realizará la reserva.
* @apiExample Request parameter
* http://35.175.241.103:8081/appointments/create/1
* @apiGroup APPOINTMENTS
*
* @apiVersion 1.0.0
* @apiDescription Horas disponible.
* @apiSuccess (Datos requeridos) {Number} from_user_id ID del usuario que realizará la reserva.
* @apiSuccess (Datos requeridos) {Date} date Fecha en la cual se realizará la reserva.
* @apiSuccess (Datos requeridos) {Time} time Hora en la cual se realizará la reserva.
* @apiSuccess (Datos requeridos) {String} type Tipo de reserva que realizará [reunion o recordatorio].
* @apiSuccess (Datos requeridos) {String} description Detalle de la reserva.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
      "from_user_id": 2,
      "date": "2019-12-10",
      "time": "6:00 PM",
      "type": "reunion",
      "description": "description"
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "(...)",
      "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
 *
 * @api {POST} /advices/check POST check advice
 * @apiName check advice
 * @apiGroup ADVICE
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Morcar como entendido el consejo
 * @apiParam {Int} advice_id Id del consejo.
 * @apiParam {Int} user_id Id de la usuario.
 * @apiParam {String} type Tipo de usuario (employee || startup).
 *
	* @apiParamExample {querystring} Ejemplo url
    /advices/check
    {
        "advice_id": 1,
        "user_id": 13,
        "type": "employee"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": true,
        "message": "Consejo marcado como visto.",
        "data": {
            "id": 19,
            "advice_id": 1,
            "user_id": 13,
            "employee_id": 8,
            "date_viewed": "2019-11-22T22:57:24.589Z",
            "viewed": true
        }
    }
 *
 *
 */

 /**
*
* @api {POST} /events/create/ POST create event
* @apiName Crear un evento
* @apiExample Request parameter
* http://35.175.241.103:8081/events/create
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription Horas disponible.
* @apiSuccess (Datos requeridos) {String} title Nombre del evento.
* @apiSuccess (Datos requeridos) {Date} day Fecha en la cual se realizará el evento.
* @apiSuccess (Datos requeridos) {String} description Detalle del evento
* @apiSuccess (Datos requeridos) {Time} hour_start Hora de inicio del evento.
* @apiSuccess (Datos requeridos) {Time} hour_end Hora fin del evento.
* @apiSuccess (Datos requeridos) {String} place Lugar donde se realizará.
* @apiSuccess (Datos requeridos) {String} lat Coordenadas de ubicación.
* @apiSuccess (Datos requeridos) {String} lng Coordenadas de ubicación.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario que registró el usuario.
* @apiSuccess (Datos retornados) {Boolean} status Status retornado.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
        "title": "Nuevo evento",
        "day": "2017-11-11",
        "description": "description",
        "hour_start": "12:00:00",
        "hour_end": "15:00:00",
        "place": "Lima",
        "user_id": 2,
        "categories": [ "Tecnología", "IOT" ]   
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
        "status": true,
        "message": "(...)",
        "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
        "status" : false,
        "message": "(...)",
        "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /events/update/:event_id POST update event
* @apiName Actualizar un evento
* @apiParam {Number} event_id ID del evento.
* @apiExample Request parameter
* http://35.175.241.103:8081/events/update/1
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription Horas disponible.
* @apiSuccess (Datos requeridos) {String} title Nombre del evento.
* @apiSuccess (Datos requeridos) {Date} day Fecha en la cual se realizará el evento.
* @apiSuccess (Datos requeridos) {String} description Detalle del evento
* @apiSuccess (Datos requeridos) {Time} hour_start Hora de inicio del evento.
* @apiSuccess (Datos requeridos) {Time} hour_end Hora fin del evento.
* @apiSuccess (Datos requeridos) {String} place Lugar donde se realizará.
* @apiSuccess (Datos requeridos) {String} lat Coordenadas de ubicación.
* @apiSuccess (Datos requeridos) {String} lng Coordenadas de ubicación.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario.
* @apiSuccess (Datos retornados) {Boolean} status Status retornado.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
        "title": "Nuevo evento",
        "day": "2017-11-11",
        "description": "description",
        "hour_start": "12:00:00",
        "hour_end": "15:00:00",
        "place": "Lima",
        "user_id": 2,
        "categories": [ "Tecnología", "IOT" ]   
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
        "status": true,
        "message": "(...)",
        "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
        "status" : false,
        "message": "(...)",
        "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /events/take-part POST Take part event
* @apiName Participar en un evento
* @apiExample Request parameter
* http://35.175.241.103:8081/events/take-part
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription Horas disponible.
* @apiSuccess (Datos requeridos) {Number} user_id ID del usuario.
* @apiSuccess (Datos requeridos) {Number} event_id ID del evento.
* @apiSuccess (Datos retornados) {Boolean} status Status retornado.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
* @apiSuccessExample {json} Datos requeridos
  {
        ""user_id": 1,
        "event_id": 1
  }
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
        "status": true,
        "message": "(...)",
        "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
        "status" : false,
        "message": "(...)",
        "data":  { }
  }
*
*
*/

/**
*
* @api {GET} /events/list-by-user/:user_id GET list by user events
* @apiName Listar eventos por usuario
* @apiParam {String} user_id ID del usuario.
* @apiExample Request parameter
* http://35.175.241.103:8081/events/list-by-user/1
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription  Listar eventos por usuario.
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
        "status": true,
        "message": "OK",
        "data": [
            {
                "id": 1,
                "title": "Nuevo evento",
                "description": "description",
                "day": "2017-11-11",
                "hour_start": "12:00:00",
                "hour_end": "15:00:00",
                "place": "Lima",
                "lat": null,
                "lng": null,
                "user_id": 1
            }
            ...
        ]
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {POST} /events/delete/:event_id POST delete an event
* @apiName Eliminar evento
* @apiParam {Number} event_id ID del evento.
* @apiExample Request parameter
* http://35.175.241.103:8081/events/delete/1
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription Eliminar un evento.
* @apiSuccess (Datos retornados) {Boolean} status Indica si la petición fue existosa.
* @apiSuccess (Datos retornados) {String} message Mensaje retornado.
* @apiSuccess (Datos retornados) {Object} data Contenido retornado.
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
      "status": true,
      "message": "OK",
      "data": {  }
  }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/


/**
*
* @api {GET} /events/list-all GET list events
* @apiName Listar eventos
* @apiExample Request parameter
* http://35.175.241.103:8081/events/list-all
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription  Listar eventos.
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
        "status": true,
        "message": "OK",
        "data": [
            {
                "id": 1,
                "title": "Nuevo evento",
                "description": "description",
                "day": "2017-11-11",
                "hour_start": "12:00:00",
                "hour_end": "15:00:00",
                "place": "Lima",
                "lat": null,
                "lng": null,
                "user_id": 1
            }
            ...
        ]
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/

/**
*
* @api {GET} /events/participating/:user_id GET list participating 
* @apiName Listar eventos en los que participará el usuario
* @apiParam {Number} user_id ID del usuario.
* @apiExample Request parameter
* http://35.175.241.103:8081/events/participating/1
* @apiGroup EVENTS
*
* @apiVersion 1.0.0
* @apiDescription  Listar eventos en los que participará el usuario.
*@apiSuccessExample { json } Datos retornados
  HTTP/1.1 200 OK
  {
        "status": true,
        "message": "OK",
        "data": [
            {
                "id": 1,
                "title": "Nuevo evento",
                "day": "2017-11-11",
                "hour_start": "12:00 PM",
                "hour_end": "03:00 PM",
                "place": "Lima",
                "user_workshop": {
                    "user_id": 1,
                    "workshop_id": 1,
                    "status": null,
                    "rate": null
                }
            },
            {
                "id": 6,
                "title": "Nuevo evento 2",
                "day": "2017-11-11",
                "hour_start": "12:00 PM",
                "hour_end": "03:00 PM",
                "place": "Lima",
                "user_workshop": {
                    "user_id": 1,
                    "workshop_id": 6,
                    "status": "ACCEPTED",
                    "rate": null
                }
            }
            ...
        ]
   }
*
*@apiError (Error retornado) {Boolean}  status Estado negativo de la petición.
*@apiError (Error retornado) {Boolean}  message Mensaje retornado.
*@apiError (Error retornado) {Object}  data Contenido retornado
*@apiErrorExample  Error
  HTTP/1.1 4xx Error
  {
      "status" : false,
      "message": "(...)",
      "data":  { }
  }
*
*
*/
