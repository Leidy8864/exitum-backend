define({ "api": [
  {
    "type": "POST",
    "url": "/advertisements/create",
    "title": "POST advertisement create",
    "name": "advertisement_create",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Creacion del anuncio de trabajo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "category_id",
            "description": "<p>Id de la categoria</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "startup_id",
            "description": "<p>Id de la startup</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "skills",
            "description": "<p>Id's de los skills</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/advertisement/create\n{\n    \"title\" : \"Programador en Java\",\n    \"description\" : \"Requiero un programador senior\",\n    \"category_id\" : 1,\n    \"startup_id\" : 1,\n    \"skills\" : [1,2,3]\n}",
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
            "type": "Obejct",
            "optional": false,
            "field": "data",
            "description": "<p>Indica los datos del anuncio</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Anuncio creado correctamente\",\n    \"data\": {\n        \"id\": 2,\n        \"title\": \"Programador en Java\",\n        \"description\": \"Requiero un programador senior\",\n        \"state\": \"active\",\n        \"category_id\": 1,\n        \"startup_id\": 1,\n        \"created_at\": \"2019-10-03T20:47:28.373Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/advertisements/:id/detail",
    "title": "GET advertisement detail",
    "name": "advertisement_detail",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Detalle del anuncio</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id del anuncio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/advertisements/2/detail",
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
            "type": "Obejct",
            "optional": false,
            "field": "data",
            "description": "<p>Indica los datos del anuncio con detalle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {\n        \"id\": 2,\n        \"title\": \"Programador en Javascript\",\n        \"description\": \"Conocimientos solidos en NODEJS Y REACT\",\n        \"state\": \"archived\",\n        \"category_id\": 1,\n        \"startup_id\": 1,\n        \"created_at\": \"2019-10-03T20:47:28.000Z\",\n        \"skills\": [\n            {\n                \"id\": 1,\n                \"skill\": \"PHP\",\n                \"advertisement_skill\": {\n                    \"advertisement_id\": 2,\n                    \"skill_id\": 1\n                }\n            },\n            {\n                \"id\": 2,\n                \"skill\": \"Node JS\",\n                \"advertisement_skill\": {\n                    \"advertisement_id\": 2,\n                    \"skill_id\": 2\n                }\n            }\n        ],\n        \"category\": {\n            \"id\": 1,\n            \"name\": \"Programación y Tecnología\"\n        },\n        \"startup\": {\n            \"id\": 1,\n            \"name\": \"Proyecto Exitum\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Proyecto que pretende ayudar startups\",\n            \"entrepreneur_id\": 1,\n            \"category_id\": 1,\n            \"stage_id\": 1\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/advertisements/update/skills",
    "title": "POST advertisement skill update",
    "name": "advertisement_skill_update",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Creacion de la experiencia del usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advertisement_id",
            "description": "<p>Id del anuncio.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "skills",
            "description": "<p>Id's de las habilidades</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/advertisements/update/skills\n{\n    \"advertisement_id\" : 2,\n    \"skills\" : [1,2]\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Skills actualizados correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/advertisements/update",
    "title": "POST advertisement update",
    "name": "advertisement_update",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Actualización de la experiencia del usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advertisement_id",
            "description": "<p>Id del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>Estado del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "category_id",
            "description": "<p>Id de la categoria</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "startup_id",
            "description": "<p>Id de la startup</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/educations/update\n{\n    \"advertisement_id\" : 2,\n    \"title\" : \"Programador en Javascript\",\n    \"description\" : \"Conocimientos solidos en NODEJS Y REACT\",\n    \"state\" : \"archived\",\n    \"category_id\" : 1,\n    \"startup_id\" : 1\n}",
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
            "type": "Obejct",
            "optional": false,
            "field": "data",
            "description": "<p>Indica los datos de la educación acutualizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Anuncio actualizado correctamente\",\n    \"data\": {\n        \"id\": 2,\n        \"title\": \"Programador en Javascript\",\n        \"description\": \"Conocimientos solidos en NODEJS Y REACT\",\n        \"state\": \"archived\",\n        \"category_id\": 1,\n        \"startup_id\": 1,\n        \"created_at\": \"2019-10-03T20:47:28.000Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/advertisements/user/:id/list",
    "title": "GET advertisements by id",
    "name": "advertisements_by_id",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Listado de anuncios</p>",
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
            "field": "active",
            "description": "<p>Estado del anuncio</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "    /advertisements/user/4/list\n    {\n\t    \"state\" : \"active\"\n    }",
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
            "type": "Obejct[]",
            "optional": false,
            "field": "data",
            "description": "<p>Indica el listado de anuncios del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 3,\n            \"title\": \"Programador en Java\",\n            \"description\": \"Requiero un programador senior\",\n            \"state\": \"active\",\n            \"category_id\": 1,\n            \"startup_id\": 1,\n            \"created_at\": \"2019-10-03T20:54:26.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 1,\n                    \"skill\": \"PHP\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 1\n                    }\n                },\n                {\n                    \"id\": 2,\n                    \"skill\": \"Node JS\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 2\n                    }\n                },\n                {\n                    \"id\": 3,\n                    \"skill\": \"Javascript\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 3\n                    }\n                }\n            ],\n            \"category\": {\n                \"id\": 1,\n                \"name\": \"Programación y Tecnología\"\n            },\n            \"startup\": {\n                \"id\": 1,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": null,\n                \"ruc\": null,\n                \"description\": \"Proyecto que pretende ayudar startups\",\n                \"entrepreneur_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1,\n                \"entrepreneur\": {\n                    \"id\": 1,\n                    \"user_id\": 4\n                }\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/advertisements/user/:id/list",
    "title": "GET advertisements by id",
    "name": "advertisements_by_id",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Listado de anuncios</p>",
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
            "field": "active",
            "description": "<p>Estado del anuncio</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "    /advertisements/user/4/list\n    {\n\t    \"state\" : \"active\"\n    }",
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
            "type": "Obejct[]",
            "optional": false,
            "field": "data",
            "description": "<p>Indica el listado de anuncios del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 3,\n            \"title\": \"Programador en Java\",\n            \"description\": \"Requiero un programador senior\",\n            \"state\": \"active\",\n            \"category_id\": 1,\n            \"startup_id\": 1,\n            \"created_at\": \"2019-10-03T20:54:26.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 1,\n                    \"skill\": \"PHP\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 1\n                    }\n                },\n                {\n                    \"id\": 2,\n                    \"skill\": \"Node JS\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 2\n                    }\n                },\n                {\n                    \"id\": 3,\n                    \"skill\": \"Javascript\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 3\n                    }\n                }\n            ],\n            \"category\": {\n                \"id\": 1,\n                \"name\": \"Programación y Tecnología\"\n            },\n            \"startup\": {\n                \"id\": 1,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": null,\n                \"ruc\": null,\n                \"description\": \"Proyecto que pretende ayudar startups\",\n                \"entrepreneur_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1,\n                \"entrepreneur\": {\n                    \"id\": 1,\n                    \"user_id\": 4\n                }\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/advertisements/list",
    "title": "GET advertisements list",
    "name": "advertisements_list",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Listado de anuncios</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/advertisements/list",
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
            "type": "Obejct[]",
            "optional": false,
            "field": "data",
            "description": "<p>Indica el listado de anuncios</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 3,\n            \"title\": \"Programador en Java\",\n            \"description\": \"Requiero un programador senior\",\n            \"state\": \"active\",\n            \"category_id\": 1,\n            \"startup_id\": 1,\n            \"created_at\": \"2019-10-03T20:54:26.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 1,\n                    \"skill\": \"PHP\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 1\n                    }\n                },\n                {\n                    \"id\": 2,\n                    \"skill\": \"Node JS\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 2\n                    }\n                },\n                {\n                    \"id\": 3,\n                    \"skill\": \"Javascript\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 3\n                    }\n                }\n            ],\n            \"category\": {\n                \"id\": 1,\n                \"name\": \"Programación y Tecnología\"\n            },\n            \"startup\": {\n                \"id\": 1,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": null,\n                \"ruc\": null,\n                \"description\": \"Proyecto que pretende ayudar startups\",\n                \"entrepreneur_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVERTISEMENT",
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
    "url": "/users/countries",
    "title": "GET list country",
    "name": "resendToken",
    "group": "COUNTRIES",
    "version": "1.0.0",
    "description": "<p>Retorna el listado de paises.</p>",
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
            "type": "Object[]",
            "optional": false,
            "field": "countries",
            "description": "<p>Lista de paises</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "countries.id",
            "description": "<p>Id del país</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "countries.country",
            "description": "<p>Nombre del país</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "countries.code",
            "description": "<p>Codigo del país</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "countries.currency_id",
            "description": "<p>Id de la moneda del país</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"countries\": [\n            {\n                \"id\": 1,\n                \"country\": \"Peru\",\n                \"code\": \"PER\",\n                \"currency_id\": 1\n            }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "COUNTRIES",
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
    "url": "/educations/create",
    "title": "POST educations create",
    "name": "educations_create",
    "group": "EDUCATIONS",
    "version": "1.0.0",
    "description": "<p>Creacion de la educación del usuario.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>Id del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_start",
            "description": "<p>Fecha de incio de la experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_end",
            "description": "<p>Fecha fin de la experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "university_id",
            "description": "<p>Id de la universidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "other_university",
            "description": "<p>Otra universidad si es que no se encuentra registrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/educations/create\n{\n    \"employee_id\" : \"1\",\n    \"description\" : \"Estudiante de Diseño de Software\",\n    \"date_start\" : \"2019-09-27\",\n    \"date_end\" : \"2019-09-27\",\n    \"university_id\" : 2,\n    \"other_university\" : \"\"\n}",
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
            "type": "Obejct",
            "optional": false,
            "field": "data",
            "description": "<p>Indica los datos de la educación creada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Educación del empleado creada correctamente\",\n    \"data\": {\n        \"id\": 1,\n        \"employee_id\": 1,\n        \"description\": \"Estudiante de Diseño de Software\",\n        \"date_start\": \"2019-09-27T00:00:00.000Z\",\n        \"date_end\": \"2019-09-27T00:00:00.000Z\",\n        \"university_id\": 2,\n        \"other_university\": \"\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EDUCATIONS",
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
    "url": "/educations/update",
    "title": "POST educations update",
    "name": "educations_update",
    "group": "EDUCATIONS",
    "version": "1.0.0",
    "description": "<p>Creacion de la experiencia del usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>Id del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_start",
            "description": "<p>Fecha de incio de la experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_end",
            "description": "<p>Fecha fin de la experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "university_id",
            "description": "<p>Id de la universidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "other_university",
            "description": "<p>Otra universidad si es que no se encuentra</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/educations/update\n{\n    \"education_id\" : \"1\",\n    \"description\" : \"Estudiante de Maquinaria\",\n    \"date_start\" : \"2019-09-28\",\n    \"date_end\" : \"2019-09-28\",\n    \"university_id\" : 1,\n    \"other_university\" : \"\"\n}",
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
            "type": "Obejct",
            "optional": false,
            "field": "data",
            "description": "<p>Indica los datos de la educación acutualizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Educación actualizada actualizada correctamente\",\n    \"data\": {\n        \"id\": 1,\n        \"description\": \"Estudiante de Maquinaria\",\n        \"date_start\": \"2019-09-28T00:00:00.000Z\",\n        \"date_end\": \"2019-09-28T00:00:00.000Z\",\n        \"university_id\": 1,\n        \"employee_id\": 1,\n        \"other_university\": \"\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EDUCATIONS",
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
    "url": "/employees/create",
    "title": "POST create employee",
    "name": "create_employee",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Crear el rol de empleado al usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "category_id",
            "description": "<p>Id de la categoria de la startup.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "short_description",
            "description": "<p>Descripción del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "price_hour",
            "description": "<p>Precio por hora.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "skills[]",
            "description": "<p>Id's de las habilidades.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "types[]",
            "description": "<p>Id's de los tipos de empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "languages[]",
            "description": "<p>Id's de los tipos de empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "languages.language_id",
            "description": "<p>Id del lenguaje.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "languages.level_id",
            "description": "<p>Id del nivel.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/create\n{\n    \"user_id\" : 3,\n    \"category_id\" : 1,\n    \"about_me\" : \"Soy un desarrollor web\",\n    \"short_description\" : \"Desarrollador Web\",\n    \"price_hour\" : 15,\n    \"skills\" : [1],\n    \"types\" : [1],\n    \"languages\" : [\n            {\n                \"language_id\": 2,\n                \"level_id\": 2\t\n            },\n            {\n                \"language_id\": 3,\n                \"level_id\": 3\n            }\n        ],\n    \"levels\" : [1,2,3]\n}",
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
            "field": "data",
            "description": "<p>Datos del impulsor actualizado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Impulsor creado correctamente\",\n    \"data\": {\n        \"id\": 4,\n        \"user_id\": 3,\n        \"category_id\": 1,\n        \"about_me\": \"Soy un desarrollor web\",\n        \"short_description\": \"Desarrollador Web\",\n        \"price_hour\": 15,\n        \"stage_id\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EMPLOYEE",
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
    "url": "/employees/:user_id/detail",
    "title": "POST detail employee",
    "name": "detail_employee",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Detalle del empleado</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/2/detail",
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
            "field": "data",
            "description": "<p>Datos del empleado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {\n        \"id\": 3,\n        \"user_id\": 2,\n        \"category_id\": 1,\n        \"stage_id\": 1,\n        \"short_description\": \"Desarrollador Móvil\",\n        \"about_me\": \"Desarrollador Móvil\",\n        \"price_hour\": \"20.00\",\n        \"behance_user\": null,\n        \"behance_active\": null,\n        \"linkedin_active\": null,\n        \"category\": {\n            \"id\": 1,\n            \"name\": \"Programación y Tecnología\"\n        },\n        \"education\": [],\n        \"experience\": [],\n        \"recommendation\": [],\n        \"languages\": [\n            {\n                \"id\": 2,\n                \"language\": \"Inglés\",\n                \"employee_language\": {\n                    \"employee_id\": 3,\n                    \"language_id\": 2,\n                    \"level_id\": 2,\n                    \"employeeId\": 3\n                }\n            },\n            {\n                \"id\": 3,\n                \"language\": \"Alemán\",\n                \"employee_language\": {\n                    \"employee_id\": 3,\n                    \"language_id\": 3,\n                    \"level_id\": 3,\n                    \"employeeId\": 3\n                }\n            }\n        ],\n        \"skills\": [\n            {\n                \"id\": 1,\n                \"skill\": \"PHP\",\n                \"employee_skill\": {\n                    \"employee_id\": 3,\n                    \"skill_id\": 1\n                }\n            },\n            {\n                \"id\": 2,\n                \"skill\": \"Node JS\",\n                \"employee_skill\": {\n                    \"employee_id\": 3,\n                    \"skill_id\": 2\n                }\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EMPLOYEE",
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
    "url": "/employees/update",
    "title": "POST update employee",
    "name": "update_employee",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Actualizar empleado al usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "about_me",
            "description": "<p>Descripción del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "short_description",
            "description": "<p>Descripción del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "price_hour",
            "description": "<p>Precio por hora.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/update\n{\n    \"user_id\" : 2,\n    \"about_me\" : \"Desarrollador Móvil\",\n    \"short_description\" : \"Desarrollador Móvil\",\n    \"price_hour\" : 20\n}",
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
            "field": "data",
            "description": "<p>Datos del empleado actualizado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Empleado actualizado correctamente\",\n    \"data\": {\n        \"id\": 3,\n        \"user_id\": 2,\n        \"category_id\": 1,\n        \"stage_id\": 1,\n        \"short_description\": \"Desarrollador Móvil\",\n        \"about_me\": \"Desarrollador Móvil\",\n        \"price_hour\": 20,\n        \"behance_user\": null,\n        \"behance_active\": null,\n        \"linkedin_active\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EMPLOYEE",
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
    "url": "/employees/update/languages",
    "title": "POST update languages",
    "name": "update_languages",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Actualizar lenguaje</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "lenguages[]",
            "description": "<p>Id's de los lenguajes.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/update/languages\n{\n    \"user_id\" : 2,\n    \"languages\" : [1,2]\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Lenguajes actualizados correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EMPLOYEE",
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
    "url": "/employees/update/types",
    "title": "POST update types",
    "name": "update_types",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Actualizar tipo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "types[]",
            "description": "<p>Id's de los tipos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/update/languages\n{\n    \"user_id\" : 2,\n    \"types\" : [1,2]\n}",
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
          "content": "{\n    \"user_id\" : 2,\n    \"types\" : [1,2]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EMPLOYEE",
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
    "url": "/experiences/create",
    "title": "POST experiencie create",
    "name": "experiencie_create",
    "group": "EXPERIENCIES",
    "version": "1.0.0",
    "description": "<p>Creacion de la experiencia del usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>Id del empleado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>Posición o cargo que desepeño</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>Compañia en la que trabajo</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_start",
            "description": "<p>Fecha de incio</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_end",
            "description": "<p>Fecha fin</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "current_job",
            "description": "<p>Trabajo actual, true o false</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/experiences/create\n{\n    \"employee_id\" : 1,\n    \"position\" : \"Desarrollador de software\",\n    \"company\" : \"Tecsup\",\n    \"date_start\" : \"2019-09-27\",\n    \"date_end\" : \"2019-09-27\",\n    \"current_job\" : false\n}",
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
            "field": "data",
            "description": "<p>Datos de la experiencia creada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Experiencia del empleado creada correctamente\",\n    \"data\": {\n        \"id\": 4,\n        \"employee_id\": 1,\n        \"position\": \"Desarrollador de software\",\n        \"company\": \"Tecsup\",\n        \"date_start\": \"2019-09-27T00:00:00.000Z\",\n        \"date_end\": \"2019-09-27T00:00:00.000Z\",\n        \"current_job\": false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EXPERIENCIES",
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
    "url": "/experiences/update",
    "title": "POST experiencie update",
    "name": "experiencie_update",
    "group": "EXPERIENCIES",
    "version": "1.0.0",
    "description": "<p>Actualizar la experiencia del usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "experience_id",
            "description": "<p>Id de la experiencia   .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>Posición o cargo que desepeño</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>Compañia en la que trabajo</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_start",
            "description": "<p>Fecha de incio</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_end",
            "description": "<p>Fecha fin</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "current_job",
            "description": "<p>Trabajo actual, true o false</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/experiences/update\n{\n    \"experience_id\" : 1,\n    \"position\" : \"Desarrollador Movil\",\n    \"company\" : \"Senati\",\n    \"description\" : \"Experiencia en el ambito movil\",\n    \"date_start\" : \"2019-09-27\",\n    \"date_end\" : \"2019-09-28\",\n    \"current_job\" : true\n}",
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
            "field": "data",
            "description": "<p>Indica los datos de la experiencia actualizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n\"status\": true,\n\"message\": \"Experiencia actualizada creada correctamente\",\n\"data\": {\n    \"id\": 1,\n    \"position\": \"Desarrollador Movil\",\n    \"company\": \"Senati\",\n    \"date_start\": \"2019-09-27T00:00:00.000Z\",\n    \"date_end\": \"2019-09-28T00:00:00.000Z\",\n    \"description\": \"Experiencia en el ambito movil\",\n    \"current_job\": true,\n    \"employee_id\": 1\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EXPERIENCIES",
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
    "url": "/employees/update/skills",
    "title": "POST create skill",
    "name": "create_skills",
    "group": "SKILLS",
    "version": "1.0.0",
    "description": "<p>Crear habilidades</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/update/skills\n{\n    \"user_id\" : 2,\n    \"skills\" : [1,2]\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Skills actualizados correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "SKILLS",
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
    "url": "/skills/create",
    "title": "POST create skill",
    "name": "create_skills",
    "group": "SKILLS",
    "version": "1.0.0",
    "description": "<p>Crear habilidades</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/skills/create\n{\n    \"skill\": \"\"\n}",
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
          "content": "{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "SKILLS",
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
    "url": "/skills/list",
    "title": "GET list skills",
    "name": "list_skills",
    "group": "SKILLS",
    "version": "1.0.0",
    "description": "<p>Listado de habilidades</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/skills/list",
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
          "content": "{\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "SKILLS",
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
            "type": "File",
            "optional": false,
            "field": "photo",
            "description": "<p>Foto de la startup.</p>"
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
            "field": "category_id",
            "description": "<p>Id de la categoría elegida.</p>"
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
          "content": "/startups/create\n{\n    \"id\": 1\n    \"name\": \"NextMedicall\"\n    \"ruc\": \"12312313\"\n    \"description\": \"Startup de telemedicina\"\n    \"category_id\": 1,\n    \"stage_id\": 1\n}",
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
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Startup creado correctamente\"\n    }",
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
    "url": "/startups/detail",
    "title": "POST detail startup",
    "name": "detail_startup",
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
            "type": "Int",
            "optional": false,
            "field": "startup_id",
            "description": "<p>Id de la startup.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/startups/detail\n{\n    \"id\": 1\n    \"startup_id\": 1\n}",
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
          "content": "{\n    \"startup\": {\n        \"id\": 1,\n        \"name\": \"NextMedicall\",\n        \"photo_url\": \"3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG\",\n        \"ruc\": \"12312313\",\n        \"description\": \"Startup de telemedicinaaa\",\n        \"entrepreneur_id\": 1,\n        \"category_id\": 1,\n        \"stage_id\": 1,\n        \"entrepreneur\": {\n            \"id\": 1,\n            \"user_id\": 1,\n            \"user\": {\n                \"id\": 1,\n                \"name\": \"Leidy Paula\",\n                \"lastname\": \"Callupe Santisteban\",\n                \"email\": \"leidy.callupe@tecsup.edu.pe\",\n                \"provider_id\": null,\n                \"confirmed\": false,\n                \"phone\": \"1523456789\",\n                \"role\": \"entrepreneur\",\n                \"method\": \"local\",\n                \"password\": \"$2a$10$DUN2XDqeFKkKWo3c3tL2H.PUdHIzSItx4dKNaaExl9lFvHmGFXOqO\",\n                \"active\": true,\n                \"last_login\": null,\n                \"photo\": \"8bc1c170-e5f5-11e9-8295-0123456789abshutterstock_645324130-1080x675.jpg\",\n                \"photo_dni\": null,\n                \"avg_rating\": null,\n                \"country_id\": 1,\n                \"currency_id\": 1\n            }\n        }\n    }\n}",
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
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Ok\",\n        \"data\": {\n            \"startups\": [\n                {\n                    \"id\": 5,\n                    \"name\": \"NextMedicall\",\n                    \"photo_url\": \"3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG\",\n                    \"ruc\": \"12312313\",\n                    \"description\": \"Startup de telemedicinaaa\",\n                    \"entrepreneur_id\": 5,\n                    \"category_id\": 1,\n                    \"stage_id\": 1\n                }\n            ]\n        }\n    }",
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
    "title": "POST list startups by id",
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
          "content": "/startups/listById\n{\n    \"id\": 1\n}",
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
          "content": "\t{\n        \"status\": 200,\n        \"startups\": [\n            {\n                \"id\": 1,\n                \"name\": \"NextMedicall\",\n                \"photo_url\": \"3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG\",\n                \"ruc\": \"12312313\",\n                \"description\": \"Startup de telemedicinaaa\",\n                \"entrepreneur_id\": 5,\n                \"category_id\": 1,\n                \"stage_id\": 1\n            }\n        ]\n    }",
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
    "url": "/startups/listsector",
    "title": "GET list sectors",
    "name": "list_sectors",
    "group": "STARTUP",
    "version": "1.0.0",
    "description": "<p>Actualizar startup</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/startups/listsector",
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
          "content": "{\n    \"status\": 200,\n    \"message\": \"Ok\",\n    \"data\": {\n        \"sectors\": [\n            {\n                \"id\": 1,\n                \"sector\": \"Medicina\"\n            }\n        ]\n    }\n}",
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
    "name": "update_startup",
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
            "field": "category_id",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Startup actualizado correctamente\",\n}",
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
    "url": "/users/authentication/:token",
    "title": "GET confirmation user",
    "name": "confirmation",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Verificación del correo del usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de validación de correo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/users/authentication/:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTU3MDYzMjcxM30.V29Dd2_8jh-hyb84YCcutSFy70JPXiv9DypeqUSsjq4",
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
            "description": "<p>Indica el mensaje de confirmación</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Datos del usuario validado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Su cuenta fue verificada.\",\n        \"data\": {\n            \"id\": 49,\n            \"name\": \"Leidy\",\n            \"lastname\": \"Callupe\",\n            \"email\": \"leidy.callupe@tecsup.edu.pe\",\n            \"provider_id\": null,\n            \"confirmed\": false,\n            \"phone\": null,\n            \"role\": \"employee\",\n            \"method\": \"local\",\n            \"password\": \"$2a$10$j0ivFo1F9Yud5sTTmYnEU.CDspnqPq4oa.vzySfLZOlbLZRGvKsEG\",\n            \"active\": true,\n            \"last_login\": null,\n            \"photo\": null,\n            \"photo_dni\": null,\n            \"avg_rating\": null,\n            \"country_id\": 1,\n            \"currency_id\": 1\n        }\n    }",
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
    "url": "/users/oauth/facebook",
    "title": "POST login facebook",
    "name": "login_facebook",
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
            "field": "access_token",
            "description": "<p>Token de acceso.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "method",
            "description": "<p>Metodo social.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "country_id",
            "description": "<p>Id del país seleccionado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "currency_id",
            "description": "<p>Id de la moneda seleccionada.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/oauth/facebook\n    {\n        \"access_token\" : \"ya29.GluNB9H9L0VcfNo6AYOZSSX0qCZAexNO8XUYTX1V3TS_pCG9Lk4_hpjCBFf_SvVboD7QzpHcylKDsT-\",\n        \"role\" : \"employee\",\n        \"method\" : \"facebook\",\n        \"country_id\" : 1,\n        \"currency_id\" :1\n    }",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken\n        }\n    }",
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
    "url": "/users/oauth/google",
    "title": "POST login google",
    "name": "login_google",
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
            "field": "access_token",
            "description": "<p>Token de acceso.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "method",
            "description": "<p>Metodo social.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "country_id",
            "description": "<p>Id del país seleccionado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "currency_id",
            "description": "<p>Id de la moneda seleccionada.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/oauth/google\n    {\n        \"access_token\" : \"ya29.GluNB9H9L0VcfNo6AYOZSSX0qCZAexNO8XUYTX1V3TS_pCG9Lk4_hpjCBFf_SvVboD7QzpHcylKDsT-\",\n        \"role\" : \"employee\",\n        \"method\" : \"google\",\n        \"country_id\" : 1,\n        \"currency_id\" :1\n    }",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken\n        }\n    }",
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
    "url": "/users/resend",
    "title": "POST resendToken user",
    "name": "resendToken",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Enviar un nuevo token para la verificación del correo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email para el reenvio de token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/resend\n    {\n\t    \"email\": \"leidy.callupe@tecsup.edu.pe\"\n    }",
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
            "description": "<p>Indica el mensaje exitoso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Un email de verificación ha sido enviado a leidy.callupe@tecsup.edu.pe .\"\n    }",
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
    "url": "/users/authentication/reset/:token",
    "title": "POST reset password",
    "name": "rest_password",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Restablece la contrasena</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario registrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/users/reset/3f9606747363c5edcb316167d6267603\n{\n    \"new_password\": \"leidy123\",\n    \"verify_password\": \"leidy123\"\n}",
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
            "type": "Object",
            "optional": false,
            "field": "accessData",
            "description": "<p>JWT</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Int",
            "optional": false,
            "field": "accessData.id",
            "description": "<p>Id del usuario</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "String",
            "optional": false,
            "field": "accessData.accessToken",
            "description": "<p>accessToken</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Su cambio el password.\",\n        \"data\": {\n            \"id\": 49,\n            \"name\": \"Leidy\",\n            \"lastname\": \"Callupe\",\n            \"email\": \"leidy.callupe@tecsup.edu.pe\",\n            \"provider_id\": null,\n            \"confirmed\": false,\n            \"phone\": null,\n            \"role\": \"employee\",\n            \"method\": \"local\",\n            \"password\": \"$2a$10$j0ivFo1F9Yud5sTTmYnEU.CDspnqPq4oa.vzySfLZOlbLZRGvKsEG\",\n            \"active\": true,\n            \"last_login\": null,\n            \"photo\": null,\n            \"photo_dni\": null,\n            \"avg_rating\": null,\n            \"country_id\": 1,\n            \"currency_id\": 1\n        }\n    }",
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
            "field": "email",
            "description": "<p>Email del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contrasena del usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/signUp\n    {\n        \"name\":\"Leidy\",\n        \"lastname\": \"Callupe\",\n        \"email\":\"leidy.callupe@tecsup.edu.pe\",\n        \"password\":\"leidy123\",\n    }",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken\n        }\n    }",
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
    "url": "/users/forgot",
    "title": "POST get token password",
    "name": "token_password",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Recuperación de la cuenta</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario registrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/users/forgot\n{\n    \"email\": \"leidy.callupe@tecsup.edu.pe\"\n}",
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
            "field": "message.Indica",
            "description": "<p>el mensaje de exito</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"message\": 'Un email de recuperación ha sido enviado a leidy.callupe@tecsup.edu.pe',\n    }",
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
    "url": "/users/update",
    "title": "POST update user",
    "name": "update_user",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Actualizar información del usuario.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre(s) del usuario actualizado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellido(s) del usuario actualizado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Telefono del usuario actualizado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>False cuando se quiere eliminar al usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rol",
            "description": "<p>Nuevo rol del usuario ('entrepreneur', 'employee', 'admin'). *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/update\n    {\n        \"user_id\": 2\n        \"name\": \"Leidy Paula\"\n        \"lastname\": \"Callupe Santisteban\"\n        \"phone\": \"1523456789\"\n        \"active\": \"true\"\n        \"role\": \"entrepreneur\"\n    }",
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
            "description": "<p>Menssaje de éxito</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Usuario actualizado correctamente\"\n    }",
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
