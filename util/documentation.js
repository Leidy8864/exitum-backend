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
 * @apiParam {Int} country_id Id del país seleccionado.
 * @apiParam {Int} currency_id Id de la moneda seleccionada.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/signUp
    {
        "name":"Leidy",
        "lastname": "Callupe",
        "email":"leidy.callupe@tecsup.edu.pe",
        "password":"leidy123",
        "country_id": 1,
        "currency_id":1
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
 * @api {POST} /users/confirmation/:token POST confirmation user
 * @apiName confirmation
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Verificación del correo del usuario
 * @apiParam {String} token Token de validación de correo.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/confirmation/:3759a0775d7eae3f3eececcffd9a0b45
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "accessData": {
            "accessToken": accessToken,
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
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "accessData": {
            "accessToken": accessToken,
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/reset/:token POST reset password
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
        "accessData": {
            "id": id
            "accessToken": accessToken,
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
 * @apiDescription  Registro de forma organica o local
 * @apiParam {String} email Email para el reenvio de token.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/resend
    {
	    "email": "leidy.callupe@tecsup.edu.pe"
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "accessData": {
            "accessToken": accessToken,
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/:id/update POST update user
 * @apiName resendToken
 * @apiGroup USER
 * 
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Actualizar información del usuario.
 * @apiParam {Int} id Email para el reenvio de token.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/resend
    {
	    "email": "leidy.callupe@tecsup.edu.pe"
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
 * @apiParam {Int} sector_id Id del sector elegido.
 * @apiParam {Int} stage_id Id del nivel en que se encuentra.
 *
	* @apiParamExample {querystring} Ejemplo url
    /startups/create
    {
        "id": 1
        "name": "NextMedicall"
        "ruc": "12312313"
        "description": "Startup de telemedicina"
        "stage_id": 1
        "sector_id": 1
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
                "sector_id": 1,
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
                    "sector_id": 1,
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
 * @apiParam {Int} sector_id Id del sector elegido.
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
            "sector_id": 1,
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
 *
	* @apiParamExample {querystring} Ejemplo url
    /skills/create
    {
        "skill": ""
    }
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
 * @api {POST} /employees/update/skills POST create skill
 * @apiName create skills
 * @apiGroup SKILLS
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Crear habilidades
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
 * @apiParam {Array} skills[] Id's de las habilidades.
 * @apiParam {Array} types[] Id's de los tipos de empleado.
 * @apiParam {Array} languages[] Id's de los tipos de empleado.
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
            ],
        "levels" : [1,2,3]
    }	
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
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
 * @api {POST} /employees/update/languages POST update languages
 * @apiName update languages
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
 * @api {POST} /employees/update/types POST update types
 * @apiName update types
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
 * @apiDescription Creacion de la experiencia del usuario
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
 * @apiDescription Creacion de la experiencia del usuario
 * @apiParam {Int} employee_id Id del empleado.
 * @apiParam {String} position Posición o cargo que desepeño
 * @apiParam {String} company Compañia en la que trabajo
 * @apiParam {Date} date_start Fecha de incio
 * @apiParam {Date} date_end Fecha fin
 * @apiParam {Boolean} current_job Trabajo actual, true o false
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