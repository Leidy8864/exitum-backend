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
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/signUp
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
 * @apiParam {Boolean} active False cuando se quiere eliminar al usuario.
 * @apiParam {String} rol Nuevo rol del usuario ('entrepreneur', 'employee', 'admin').
 * *
	* @apiParamExample {querystring} Ejemplo url
	/users/update
    {
        "user_id": 2
        "name": "Leidy Paula"
        "lastname": "Callupe Santisteban"
        "phone": "1523456789"
        "active": "true"
        "role": "entrepreneur"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Menssaje de éxito
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "message": "Usuario actualizado correctamente"
    }
 *
 *
 */

/**
 *
 * @api {GET} /users/countries GET list country
 * @apiName resendToken
 * @apiGroup COUNTRIES
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
 * @apiParam {Object} skills[] Id's de las habilidades.
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
        "skills" : [1],
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
        "status": 200,
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
 * @api {POST} /advertisements/create POST advertisement create
 * @apiName advertisement create
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Creacion del anuncio de trabajo.
 * @apiParam {String} title Titulo del anuncio
 * @apiParam {String} description Descripción del anuncio
 * @apiParam {Int} category_id Id de la categoria
 * @apiParam {Int} startup_id Id de la startup
 * @apiParam {Object} skills Id's de los skills
	* @apiParamExample {querystring} Ejemplo url
    /advertisement/create
    {
        "title" : "Programador en Java",
        "description" : "Requiero un programador senior",
        "category_id" : 1,
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
            "category_id": 1,
            "startup_id": 1,
            "created_at": "2019-10-03T20:47:28.373Z"
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /advertisements/update POST advertisement update
 * @apiName advertisement update
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Actualización de la experiencia del usuario
 * @apiParam {Int} advertisement_id Id del empleado.
 * @apiParam {String} description Descripción
 * @apiParam {String} state Estado del anuncio
 * @apiParam {Int} category_id Id de la categoria
 * @apiParam {Int} startup_id Id de la startup
 * 
	* @apiParamExample {querystring} Ejemplo url
    /educations/update
    {
        "advertisement_id" : 2,
        "title" : "Programador en Javascript",
        "description" : "Conocimientos solidos en NODEJS Y REACT",
        "state" : "archived",
        "category_id" : 1,
        "startup_id" : 1
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
            "id": 2,
            "title": "Programador en Javascript",
            "description": "Conocimientos solidos en NODEJS Y REACT",
            "state": "archived",
            "category_id": 1,
            "startup_id": 1,
            "created_at": "2019-10-03T20:47:28.000Z"
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /advertisements/update/skills POST advertisement skill update
 * @apiName advertisement skill update
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Creacion de la experiencia del usuario
 * @apiParam {Int} advertisement_id Id del anuncio.
 * @apiParam {Object[]} skills Id's de las habilidades
 * 
	* @apiParamExample {querystring} Ejemplo url
    /advertisements/update/skills
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
 * @api {GET} /advertisements/:id/detail GET advertisement detail
 * @apiName advertisement detail
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Detalle del anuncio
 * @apiParam {Int} id Id del anuncio.
 * 
	* @apiParamExample {querystring} Ejemplo url
    /advertisements/2/detail
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
            "category_id": 1,
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
            "category": {
                "id": 1,
                "name": "Programación y Tecnología"
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
 * @api {GET} /advertisements/list GET advertisements list
 * @apiName advertisements list
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 * 
	* @apiParamExample {querystring} Ejemplo url
    /advertisements/list
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
                "category_id": 1,
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
                "category": {
                    "id": 1,
                    "name": "Programación y Tecnología"
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
 * @api {GET} /advertisements/user/:id/list GET advertisements by id
 * @apiName advertisements by id
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} active Estado del anuncio
 * 
	* @apiParamExample {querystring} Ejemplo url
    /advertisements/user/4/list
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
                "category_id": 1,
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
                "category": {
                    "id": 1,
                    "name": "Programación y Tecnología"
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
 * @api {GET} /advertisements/user/:id/list GET advertisements by id
 * @apiName advertisements by id
 * @apiGroup ADVERTISEMENT
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Listado de anuncios
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} active Estado del anuncio
 * 
	* @apiParamExample {querystring} Ejemplo url
    /advertisements/user/4/list
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
                "category_id": 1,
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
                "category": {
                    "id": 1,
                    "name": "Programación y Tecnología"
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
        "status": 200,
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
        "status": 200,
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
        "status": 200,
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
 * @api {POST} /challenges/checkStartup POST check challenge stratup
 * @apiName check challenge startup
 * @apiGroup CHALLENGES
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Marca el reto cumplido por la startup.
 * @apiParam {Int} id Id del usuario impulsor.
 * @apiParam {Boolean} checked Marca 0 o 1 segun el cumplimiento del reto.
 * @apiParam {Int} tip_id Id del reto.
 * 
	* @apiParamExample {querystring} Ejemplo url
    /challenges/checkStartup
    {
        "id": 3,
        "startup_id": 1,
        "checked": 1,
        "tip_id": 2
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} data Indica el reto creado o actualizado
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": 200,
        "message": "Reto superado guardado correctamente.",
        "data": {
            "check": [
                1
            ]
        }
    }
 *
 *
 */

 /**
 *
 * @api {POST} /challenges/checkEmployee POST check challenge employee
 * @apiName check challenge employee
 * @apiGroup CHALLENGES
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Marca el reto cumplido por el impulsor.
 * @apiParam {Int} id Id del usuario impulsor.
 * @apiParam {Boolean} checked Marca 0 o 1 segun el cumplimiento del reto.
 * @apiParam {Int} tip_id Id del reto.
 * 
	* @apiParamExample {querystring} Ejemplo url
    /challenges/checkEmployee
    {
        "id": 3,
        "checked": 1,
        "tip_id": 2
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} data Indica el reto creado o actualizado
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": 200,
        "message": "Reto superado guardado correctamente.",
        "data": {
            "check": [
                1
            ]
        }
    }
 *
 *
 */

 /**
 *
 * @api {GET} /challenges/listStartup GET list challenges startup
 * @apiName list challenges startup
 * @apiGroup CHALLENGES
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Lista de retos de la startup.
 * 
	* @apiParamExample {querystring} Ejemplo url
    /challenges/listStartup
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": 200,
        "message": "Lista de retos de la startup",
        "data": [
            {
                "id": 1,
                "stage": "Pre semilla",
                "description": "Etapa donde solo se tiene una idea superficial y se busca validarla.",
                "type": "startup",
                "steps": []
            },
            {
                "id": 2,
                "stage": "Semilla",
                "description": "Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.",
                "type": "startup",
                "steps": []
            },
            {
                "id": 3,
                "stage": "Temprana",
                "description": "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.",
                "type": "startup",
                "steps": []
            },
            {
                "id": 4,
                "stage": "Crecimiento",
                "description": "Etapa donde nuestra empresa consigue escalar consiguiendo ingresos de inversores y propios.",
                "type": "startup",
                "steps": []
            },
            {
                "id": 5,
                "stage": "Expansión",
                "description": "Etapa donde se busca alcanzar nuevos horizontes en otros mercados.",
                "type": "startup",
                "steps": []
            },
            {
                "id": 6,
                "stage": "IPO",
                "description": "Etapa donde se lanza al mercado acciones de nuestra empresa para conseguir acciones y expandir planes de negocio.",
                "type": "startup",
                "steps": []
            }
        ]
    }
 *
 *
 */

 /**
 *
 * @api {GET} /challenges/listEmployee GET list challenges employee
 * @apiName list challenges employee
 * @apiGroup CHALLENGES
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Lista de retos del empleado.
 * 
	* @apiParamExample {querystring} Ejemplo url
    /challenges/listEmployee
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object[]} data Indica el listado de retos
 * @apiSuccessExample {json} Datos obtenidos:
    {
        "status": 200,
        "message": "Lista de retos del impulsor",
        "data": [
            {
                "id": 7,
                "stage": "principiante",
                "description": "Registra todos los datos del perfil",
                "type": "employee",
                "steps": [
                    {
                        "id": 1,
                        "icon": "bc9ca640-f1dd-11e9-a8f8-0123456789abmaria.PNG",
                        "stage_id": 7,
                        "tips": [
                            {
                                "id": 1,
                                "tip": "Subir foto a mi perfil",
                                "step_id": 1
                            },
                            {
                                "id": 2,
                                "tip": "Asociar mi cuenta con linkedin",
                                "step_id": 1
                            }
                        ]
                    }
                ]
            }
        ]
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
 * @apiParam {String} proposal Descripción de la propuesta.
 * @apiParam {Decimal} amount Cantidad o precio a ofertar.
 * 
	* @apiParamExample {querystring} Ejemplo url
    /proposals/create
    {
        "id": 3,
        "advertisement_id": 1,
        "proposal": "Tengo experiencia en el desarrollo de software",
        "amount": 2100
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
                "proposal": "Tengo experiencia en el desarrollo de software",
                "amount": 2100,
                "viewed": false,
                "created_at": "2019-10-11T21:02:32.747Z",
                "employee_id": 1,
                "advertisement_id": 1
            }
        ]
    }
 *
 *
 */
 
 /**
 *
 * @api {POST} /users/comment/:to_user_id POST create and update comment
 * @apiName comentario
 * @apiParam {Number} to_user_id ID usuario del usuario al que se comentará.
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
 * @apiParam {Number} to_user_id ID usuario del usuario al que se puntuará.
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
 * @apiParam {Number} startup_id ID usuario del usuario al que se puntuará.
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