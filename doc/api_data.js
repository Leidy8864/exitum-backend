define({ "api": [
  {
    "type": "POST",
    "url": "/startups/create",
    "title": "POST create startup",
    "name": "create",
    "group": "STARTUP",
    "version": "1.0.0",
    "description": "<p>Crea la startup</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del proyecto(startup).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo_url",
            "description": "<p>Url de la foto del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ruc",
            "description": "<p>Ruc de la startup si lo tuviera.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion de la startup</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "sector_id",
            "description": "<p>Id del sector elegido.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "stage_id",
            "description": "<p>Id del nivel en que se encuentra.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/startups/create",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Startup creado correctamente\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "STARTUP",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/startups/update",
    "title": "POST update startup",
    "name": "faster_ship",
    "group": "STARTUP",
    "version": "1.0.0",
    "description": "<p>Actualizar startup</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del proyecto(startup).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo_url",
            "description": "<p>Url de la foto del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ruc",
            "description": "<p>Ruc de la startup si lo tuviera.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion de la startup</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "sector_id",
            "description": "<p>Id del sector elegido.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "startup_id",
            "description": "<p>Id de la startup a editar.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/startups/update",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Startup actualizado correctamente\",\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "STARTUP",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/startups/list",
    "title": "GET find all startups",
    "name": "list",
    "group": "STARTUP",
    "version": "1.0.0",
    "description": "<p>Retorna todas las startups</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/startups/list",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object[]",
            "optional": false,
            "field": "startups",
            "description": "<p>Lista de startups</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "startups.name",
            "description": "<p>Nombre completo de la startup</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": true,\n        \"message\": \"consulta exitosa\",\n        \"startups\": [\n        {\n            \"id\": 1,\n            \"name\": \"NExtMEdicall\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Empresa de telecomunicacion\",\n            \"entrepreneur_id\": 1,\n            \"sector_id\": 1,\n            \"stage_id\": 1\n        },\n        {\n            \"id\": 2,\n            \"name\": \"NExtMEdicall\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Empresa de telecomunicacion\",\n            \"entrepreneur_id\": 1,\n            \"sector_id\": 1,\n            \"stage_id\": 1\n        },\n        {\n            \"id\": 3,\n            \"name\": \"NExtMEdicall\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Empresa de telecomunicacion\",\n            \"entrepreneur_id\": 1,\n            \"sector_id\": 1,\n            \"stage_id\": 1\n        }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "STARTUP",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/startups/listById",
    "title": "POST list startups",
    "name": "listById",
    "group": "STARTUP",
    "version": "1.0.0",
    "description": "<p>Retorna una lista de startups determinada por el id del usuario emprendedor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id del usuario emprendedor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/startups/listById",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object[]",
            "optional": false,
            "field": "startups",
            "description": "<p>Lista de startups</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "startups.name",
            "description": "<p>Nombre completo de la startup</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": true,\n        \"message\": \"consulta exitosa\",\n        \"startups\": [\n        {\n            \"id\": 1,\n            \"name\": \"NExtMEdicall\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Empresa de telecomunicacion\",\n            \"entrepreneur_id\": 1,\n            \"sector_id\": 1,\n            \"stage_id\": 1\n        },\n        {\n            \"id\": 2,\n            \"name\": \"NExtMEdicall\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Empresa de telecomunicacion\",\n            \"entrepreneur_id\": 1,\n            \"sector_id\": 1,\n            \"stage_id\": 1\n        },\n        {\n            \"id\": 3,\n            \"name\": \"NExtMEdicall\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Empresa de telecomunicacion\",\n            \"entrepreneur_id\": 1,\n            \"sector_id\": 1,\n            \"stage_id\": 1\n        }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "STARTUP",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/users/confirmation/:token",
    "title": "POST signup user",
    "name": "faster_ship",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Registro de forma organica o local</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre(s) del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellidos(s) del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contrasena del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "country_id",
            "description": "<p>Id del país seleccionado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/users/signUp\n{\n    \"status\": 200,\n    \"accessData\": {\n        \"id\": id,\n        \"email\": email,\n        \"accessToken\": accessToken,\n        \"expiresIn\": 86400\n    }\n}",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object",
            "optional": false,
            "field": "accessData",
            "description": "<p>JWT</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.id",
            "description": "<p>id</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.email",
            "description": "<p>email</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.accessToken",
            "description": "<p>accessToken</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.expiresIn",
            "description": "<p>expiresIn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken,\n            \"expiresIn\": 86400\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "USER",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/users/resendToken",
    "title": "POST resendToken user",
    "name": "resendToken",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Registro de forma organica o local</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email para registrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre(s) del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellidos(s) del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contrasena del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "country_id",
            "description": "<p>Id del país seleccionado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/signUp\n    {\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken,\n            \"expiresIn\": 86400\n        }\n    }",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object",
            "optional": false,
            "field": "accessData",
            "description": "<p>JWT</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.id",
            "description": "<p>id</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.email",
            "description": "<p>email</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.accessToken",
            "description": "<p>accessToken</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.expiresIn",
            "description": "<p>expiresIn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken,\n            \"expiresIn\": 86400\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "USER",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/users/signUp",
    "title": "POST signup user",
    "name": "signup",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Registro de forma organica o local</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email para registrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre(s) del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellidos(s) del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contrasena del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "country_id",
            "description": "<p>Id del país seleccionado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/signUp\n    {\n        \"name\":\"Leidy\",\n        \"lastname\": \"Callupe\",\n        \"email\":\"leidy.callupe@tecsup.edu.pe\",\n        \"password\":\"leidy123\",\n        \"country_id\": 1\n    }",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "Datos obtenidos": [
          {
            "group": "Datos obtenidos",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object",
            "optional": false,
            "field": "accessData",
            "description": "<p>JWT</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.id",
            "description": "<p>id</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.email",
            "description": "<p>email</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.accessToken",
            "description": "<p>accessToken</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.expiresIn",
            "description": "<p>expiresIn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken,\n            \"expiresIn\": 86400\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "USER",
    "error": {
      "fields": {
        "Estructura de Error": [
          {
            "group": "Estructura de Error",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si el response fue exitoso o fallido</p>"
          },
          {
            "group": "Estructura de Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Indica el detalle de la solicitud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error general",
          "content": "{\"status\":false,\"message\":\"(...)\"}",
          "type": "json"
        }
      ]
    }
  }
] });
