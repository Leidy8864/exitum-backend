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
 * @apiParam {String} email Email para registrar.
 * @apiParam {String} name Nombre(s) del usuario.
 * @apiParam {String} lastname Apellidos(s) del usuario.
 * @apiParam {String} password Contrasena del usuario.
 * @apiParam {Int} country_id Id del país seleccionado.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/signUp
    {
        "name":"Leidy",
        "lastname": "Callupe",
        "email":"leidy.callupe@tecsup.edu.pe",
        "password":"leidy123",
        "country_id": 1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.id id
 * @apiSuccess (Datos obtenidos) {String} accessData.email email
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccess (Datos obtenidos) {String} accessData.expiresIn expiresIn
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken,
            "expiresIn": 86400
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
 * @apiParam {String} email Email para registrar.
 * @apiParam {String} name Nombre(s) del usuario.
 * @apiParam {String} lastname Apellidos(s) del usuario.
 * @apiParam {String} password Contrasena del usuario.
 * @apiParam {Int} country_id Id del país seleccionado.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/signUp
    {
        "name":"Leidy",
        "lastname": "Callupe",
        "email":"leidy.callupe@tecsup.edu.pe",
        "password":"leidy123",
        "country_id": 1
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.id id
 * @apiSuccess (Datos obtenidos) {String} accessData.email email
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccess (Datos obtenidos) {String} accessData.expiresIn expiresIn
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken,
            "expiresIn": 86400
        }
    }
 *
 *
 */

/**
 *
 * @api {POST} /users/resendToken POST resendToken user
 * @apiName resendToken
 * @apiGroup USER
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Registro de forma organica o local
 * @apiParam {String} email Email para registrar.
 * @apiParam {String} name Nombre(s) del usuario.
 * @apiParam {String} lastname Apellidos(s) del usuario.
 * @apiParam {String} password Contrasena del usuario.
 * @apiParam {Int} country_id Id del país seleccionado.
 *
	* @apiParamExample {querystring} Ejemplo url
	/users/signUp
    {
        "status": 200,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken,
            "expiresIn": 86400
        }
    }
 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object} accessData JWT
 * @apiSuccess (Datos obtenidos) {String} accessData.id id
 * @apiSuccess (Datos obtenidos) {String} accessData.email email
 * @apiSuccess (Datos obtenidos) {String} accessData.accessToken accessToken
 * @apiSuccess (Datos obtenidos) {String} accessData.expiresIn expiresIn
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": 200,
        "accessData": {
            "id": id,
            "email": email,
            "accessToken": accessToken,
            "expiresIn": 86400
        }
    }
 *
 *
 */
/**
 *
 * @api {POST} /startups/listById POST list startups
 * @apiName listById
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription Retorna una lista de startups determinada por el id del usuario emprendedor
 * @apiParam {Int} id Id del usuario emprendedor
 *
	* @apiParamExample {querystring} Ejemplo url
	/startups/listById

 *
 * @apiSuccess (Datos obtenidos) {Boolean} status Indica si el response fue exitoso o fallido
 * @apiSuccess (Datos obtenidos) {String} message Indica el detalle de la solicitud
 * @apiSuccess (Datos obtenidos) {Object[]} startups Lista de startups
 * @apiSuccess (Datos obtenidos) {String} startups.name Nombre completo de la startup
 * @apiSuccessExample {json} Datos obtenidos:
	{
        "status": true,
        "message": "consulta exitosa",
        "startups": [
        {
            "id": 1,
            "name": "NExtMEdicall",
            "photo_url": null,
            "ruc": null,
            "description": "Empresa de telecomunicacion",
            "entrepreneur_id": 1,
            "sector_id": 1,
            "stage_id": 1
        },
        {
            "id": 2,
            "name": "NExtMEdicall",
            "photo_url": null,
            "ruc": null,
            "description": "Empresa de telecomunicacion",
            "entrepreneur_id": 1,
            "sector_id": 1,
            "stage_id": 1
        },
        {
            "id": 3,
            "name": "NExtMEdicall",
            "photo_url": null,
            "ruc": null,
            "description": "Empresa de telecomunicacion",
            "entrepreneur_id": 1,
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
        "status": true,
        "message": "consulta exitosa",
        "startups": [
        {
            "id": 1,
            "name": "NExtMEdicall",
            "photo_url": null,
            "ruc": null,
            "description": "Empresa de telecomunicacion",
            "entrepreneur_id": 1,
            "sector_id": 1,
            "stage_id": 1
        },
        {
            "id": 2,
            "name": "NExtMEdicall",
            "photo_url": null,
            "ruc": null,
            "description": "Empresa de telecomunicacion",
            "entrepreneur_id": 1,
            "sector_id": 1,
            "stage_id": 1
        },
        {
            "id": 3,
            "name": "NExtMEdicall",
            "photo_url": null,
            "ruc": null,
            "description": "Empresa de telecomunicacion",
            "entrepreneur_id": 1,
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
 * @api {POST} /startups/create POST create startup
 * @apiName create
 * @apiGroup STARTUP
 * @apiVersion 1.0.0
 * @apiUse ErrorGeneral
 * @apiDescription  Crea la startup
 * @apiParam {Int} id Id del usuario.
 * @apiParam {String} name Nombre del proyecto(startup).
 * @apiParam {String} photo_url Url de la foto del usuario.
 * @apiParam {String} ruc Ruc de la startup si lo tuviera.
 * @apiParam {String} description Descripcion de la startup
 * @apiParam {Int} sector_id Id del sector elegido.
 * @apiParam {Int} stage_id Id del nivel en que se encuentra.
 *
	* @apiParamExample {querystring} Ejemplo url
	/startups/create

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
 * @api {POST} /startups/update POST update startup
 * @apiName faster_ship
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