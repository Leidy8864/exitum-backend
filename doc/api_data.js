define({ "api": [
  {
    "type": "POST",
    "url": "/ads/create",
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
            "field": "area_id",
            "description": "<p>Id del área</p>"
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
          "content": "/advertisement/create\n{\n    \"title\" : \"Programador en Java\",\n    \"description\" : \"Requiero un programador senior\",\n    \"area_id\" : 1,\n    \"startup_id\" : 1,\n    \"skills\" : [1,2,3]\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Anuncio creado correctamente\",\n    \"data\": {\n        \"id\": 2,\n        \"title\": \"Programador en Java\",\n        \"description\": \"Requiero un programador senior\",\n        \"state\": \"active\",\n        \"area_id\": 1,\n        \"startup_id\": 1,\n        \"created_at\": \"2019-10-03T20:47:28.373Z\"\n    }\n}",
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
    "url": "/ads/:id/detail",
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
          "content": "/ads/2/detail",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {\n        \"id\": 2,\n        \"title\": \"Programador en Javascript\",\n        \"description\": \"Conocimientos solidos en NODEJS Y REACT\",\n        \"state\": \"archived\",\n        \"area_id\": 1,\n        \"startup_id\": 1,\n        \"created_at\": \"2019-10-03T20:47:28.000Z\",\n        \"skills\": [\n            {\n                \"id\": 1,\n                \"skill\": \"PHP\",\n                \"advertisement_skill\": {\n                    \"advertisement_id\": 2,\n                    \"skill_id\": 1\n                }\n            },\n            {\n                \"id\": 2,\n                \"skill\": \"Node JS\",\n                \"advertisement_skill\": {\n                    \"advertisement_id\": 2,\n                    \"skill_id\": 2\n                }\n            }\n        ],\n        \"area\": {\n            \"id\": 1,\n            \"name\": \"Area 1\"\n        },\n        \"startup\": {\n            \"id\": 1,\n            \"name\": \"Proyecto Exitum\",\n            \"photo_url\": null,\n            \"ruc\": null,\n            \"description\": \"Proyecto que pretende ayudar startups\",\n            \"entrepreneur_id\": 1,\n            \"category_id\": 1,\n            \"stage_id\": 1\n        }\n    }\n}",
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
    "url": "/ads/update/skills",
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
          "content": "/ads/update/skills\n{\n    \"advertisement_id\" : 2,\n    \"skills\" : [1,2]\n}",
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
    "url": "/ads/update",
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
            "description": "<p>Id del anuncio.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo del anuncio.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "skills",
            "description": "<p>Habilidades requeridos</p>"
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
          "content": "/ads/update\n{\n    \"title\": \"Domingo domingo domingo se busca desarrollador full stack\",\n    \"description\": \"descripciondescripciondescripciondescripciondescripciondescripciondescripcion\",\n    \"area_id\": 1,\n    \"startup_id\": 5,\n    \"advertisement_id\" : 5,\n    \"skills\" : [\"Responsable\",\"React\",\"Diseñador Ux\", \"Emprendedor\"]\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Anuncio actualizado correctamente\",\n    \"data\": {\n        \"id\": 5,\n        \"title\": \"Domingo domingo domingo se busca desarrollador full stack\",\n        \"description\": \"descripciondescripciondescripciondescripciondescripciondescripciondescripcion\",\n        \"state\": \"active\",\n        \"slug\": \"domingo-domingo-domingo-se-busca-desarrollador-full-stack\",\n        \"area_id\": 1,\n        \"startup_id\": 5,\n        \"created_at\": \"2019-11-13T16:32:01.000Z\"\n    }\n}",
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
    "url": "/ads/user/:id/list",
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
          "content": "    /ads/user/4/list\n    {\n\t    \"state\" : \"active\"\n    }",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 3,\n            \"title\": \"Programador en Java\",\n            \"description\": \"Requiero un programador senior\",\n            \"state\": \"active\",\n            \"area_id\": 1,\n            \"startup_id\": 1,\n            \"created_at\": \"2019-10-03T20:54:26.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 1,\n                    \"skill\": \"PHP\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 1\n                    }\n                },\n                {\n                    \"id\": 2,\n                    \"skill\": \"Node JS\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 2\n                    }\n                },\n                {\n                    \"id\": 3,\n                    \"skill\": \"Javascript\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 3\n                    }\n                }\n            ],\n            \"area\": {\n                \"id\": 1,\n                \"name\": \"Área 1\"\n            },\n            \"startup\": {\n                \"id\": 1,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": null,\n                \"ruc\": null,\n                \"description\": \"Proyecto que pretende ayudar startups\",\n                \"entrepreneur_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1,\n                \"entrepreneur\": {\n                    \"id\": 1,\n                    \"user_id\": 4\n                }\n            }\n        }\n    ]\n}",
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
    "url": "/ads/user/:id/list",
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
          "content": "    /ads/user/4/list\n    {\n\t    \"state\" : \"active\"\n    }",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 3,\n            \"title\": \"Programador en Java\",\n            \"description\": \"Requiero un programador senior\",\n            \"state\": \"active\",\n            \"area_id\": 1,\n            \"startup_id\": 1,\n            \"created_at\": \"2019-10-03T20:54:26.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 1,\n                    \"skill\": \"PHP\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 1\n                    }\n                },\n                {\n                    \"id\": 2,\n                    \"skill\": \"Node JS\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 2\n                    }\n                },\n                {\n                    \"id\": 3,\n                    \"skill\": \"Javascript\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 3\n                    }\n                }\n            ],\n            \"area\": {\n                \"id\": 1,\n                \"name\": \"Área 1\"\n            },\n            \"startup\": {\n                \"id\": 1,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": null,\n                \"ruc\": null,\n                \"description\": \"Proyecto que pretende ayudar startups\",\n                \"entrepreneur_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1,\n                \"entrepreneur\": {\n                    \"id\": 1,\n                    \"user_id\": 4\n                }\n            }\n        }\n    ]\n}",
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
    "url": "/ads/listByProposal?user_id=10",
    "title": "GET advertisements by proposal",
    "name": "advertisements_by_proposal",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Creacion del anuncio de trabajo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/ads/listByProposal?user_id=10",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Listado de anuncios por postulación\",\n    \"data\": [\n        {\n            \"id\": 2,\n            \"title\": \"titulo\",\n            \"description\": \"descripciondescripciondescripciondescripciondescripciondescripciondescripcion\",\n            \"state\": \"archived\",\n            \"area_id\": 1,\n            \"startup_id\": 5,\n            \"created_at\": \"2019-10-31T15:32:00.000Z\",\n            \"startup\": {\n                \"id\": 5,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": \"\",\n                \"ruc\": null,\n                \"description\": \"Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.\",\n                \"avg_rating\": 0,\n                \"entrepreneur_id\": 4,\n                \"category_id\": 1,\n                \"stage_id\": 2,\n                \"entrepreneur\": {\n                    \"id\": 4,\n                    \"user_id\": 9\n                }\n            }\n        }\n    ],\n    \"current\": 1,\n    \"pages\": 1\n}",
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
    "url": "/ads/listBySkill?user_id=10",
    "title": "GET advertisements by skill",
    "name": "advertisements_by_skill",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Creacion del anuncio de trabajo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/ads/listBySkill?user_id=10",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Listado de anuncios por skill\",\n    \"data\": [\n        {\n            \"id\": 10,\n            \"title\": \"Desarrollo de plataforma web\",\n            \"description\": \"Descripción del proyecto\\nDescripción del proyecto\\nDescripción del proyecto\",\n            \"state\": \"active\",\n            \"area_id\": 2,\n            \"startup_id\": 5,\n            \"created_at\": \"2019-10-31T15:45:42.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 7,\n                    \"skill\": \"eee\",\n                    \"icon\": null,\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 10,\n                        \"skill_id\": 7\n                    }\n                }\n            ],\n            \"startup\": {\n                \"id\": 5,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": \"\",\n                \"ruc\": null,\n                \"description\": \"Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.\",\n                \"avg_rating\": 0,\n                \"entrepreneur_id\": 4,\n                \"category_id\": 1,\n                \"stage_id\": 2,\n                \"entrepreneur\": {\n                    \"id\": 4,\n                    \"user_id\": 9\n                }\n            }\n        },\n        {\n            \"id\": 11,\n            \"title\": \"Desarrollo de plataforma web\",\n            \"description\": \"Descripción del proyecto\\nDescripción del proyecto\\nDescripción del proyecto\",\n            \"state\": \"active\",\n            \"area_id\": 4,\n            \"startup_id\": 5,\n            \"created_at\": \"2019-10-31T15:46:13.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 4,\n                    \"skill\": \"ddsd\",\n                    \"icon\": null,\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 11,\n                        \"skill_id\": 4\n                    }\n                },\n                {\n                    \"id\": 7,\n                    \"skill\": \"eee\",\n                    \"icon\": null,\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 11,\n                        \"skill_id\": 7\n                    }\n                }\n            ],\n            \"startup\": {\n                \"id\": 5,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": \"\",\n                \"ruc\": null,\n                \"description\": \"Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.\",\n                \"avg_rating\": 0,\n                \"entrepreneur_id\": 4,\n                \"category_id\": 1,\n                \"stage_id\": 2,\n                \"entrepreneur\": {\n                    \"id\": 4,\n                    \"user_id\": 9\n                }\n            }\n        }\n    ],\n    \"current\": 1,\n    \"pages\": 1\n}",
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
    "url": "/ads/list",
    "title": "GET advertisements list",
    "name": "advertisements_list",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Listado de anuncios</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/ads/list",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 3,\n            \"title\": \"Programador en Java\",\n            \"description\": \"Requiero un programador senior\",\n            \"state\": \"active\",\n            \"area_id\": 1,\n            \"startup_id\": 1,\n            \"created_at\": \"2019-10-03T20:54:26.000Z\",\n            \"skills\": [\n                {\n                    \"id\": 1,\n                    \"skill\": \"PHP\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 1\n                    }\n                },\n                {\n                    \"id\": 2,\n                    \"skill\": \"Node JS\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 2\n                    }\n                },\n                {\n                    \"id\": 3,\n                    \"skill\": \"Javascript\",\n                    \"advertisement_skill\": {\n                        \"advertisement_id\": 3,\n                        \"skill_id\": 3\n                    }\n                }\n            ],\n            \"area\": {\n                \"id\": 1,\n                \"name\": \"Área 1\"\n            },\n            \"startup\": {\n                \"id\": 1,\n                \"name\": \"Proyecto Exitum\",\n                \"photo_url\": null,\n                \"ruc\": null,\n                \"description\": \"Proyecto que pretende ayudar startups\",\n                \"entrepreneur_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1\n            }\n        }\n    ]\n}",
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
    "url": "/ads/invitation",
    "title": "POST favorite create",
    "name": "favorite_create",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Creacion del impulsor favorito.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advertisement_id",
            "description": "<p>Id del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del impulsor</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "saved",
            "description": "<p>Valor 0 o 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/ads/invitation\n{\n    \"advertisement_id\": 3,\n    \"user_id\": 3,\n    \"saved\": 1\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Impulsor favorito creado o modificado\"\n}",
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
    "url": "/ads/favorites?advertisement_id=3&page=1",
    "title": "GET favorites",
    "name": "favorites",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Impulsor de favoritos.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advertisement_id",
            "description": "<p>Id del anuncio</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/ads/favorites?advertisement_id=3&page=1",
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
          "content": "{\n  \"status\": true,\n  \"message\": \"Lista de impulsores favoritos.\",\n  \"data\": [\n      {\n          \"created_at\": \"2019-11-12T16:06:05.000Z\",\n          \"saved\": 0,\n          \"advertisement_id\": 3,\n          \"employee_id\": 1,\n          \"employee\": {\n              \"id\": 1,\n              \"user_id\": 13,\n              \"category_id\": 1,\n              \"stage_id\": 6,\n              \"short_description\": \"Desarrollador Web\",\n              \"about_me\": \"Soy un desarrollor web\",\n              \"price_hour\": \"15.50\",\n              \"behance_user\": null,\n              \"behance_active\": null,\n              \"linkedin_active\": null,\n              \"user\": {\n                  \"id\": 13,\n                  \"name\": \"Leidy2\",\n                  \"lastname\": \"Callupe2\",\n                  \"photo\": null,\n                  \"description\": null,\n                  \"avg_rating\": 2\n              },\n              \"invitations\": [\n                  {\n                      \"created_at\": \"2019-11-12T16:06:05.000Z\",\n                      \"saved\": 0,\n                      \"advertisement_id\": 3,\n                      \"employee_id\": 1\n                  }\n              ]\n          }\n      },\n      {\n          \"created_at\": \"2019-11-12T16:06:06.000Z\",\n          \"saved\": 0,\n          \"advertisement_id\": 3,\n          \"employee_id\": 2,\n          \"employee\": {\n              \"id\": 2,\n              \"user_id\": 10,\n              \"category_id\": 1,\n              \"stage_id\": 6,\n              \"short_description\": \"Desarrollador Web\",\n              \"about_me\": \"Soy un desarrollor web\",\n              \"price_hour\": \"15.50\",\n              \"behance_user\": null,\n              \"behance_active\": null,\n              \"linkedin_active\": null,\n              \"user\": {\n                  \"id\": 10,\n                  \"name\": \"José\",\n                  \"lastname\": \"Cristobal\",\n                  \"photo\": null,\n                  \"description\": null,\n                  \"avg_rating\": 4\n              },\n              \"invitations\": [\n                  {\n                      \"created_at\": \"2019-11-12T16:06:06.000Z\",\n                      \"saved\": 0,\n                      \"advertisement_id\": 3,\n                      \"employee_id\": 2\n                  }\n              ]\n          }\n      },\n      {\n          \"created_at\": \"2019-11-11T16:39:49.000Z\",\n          \"saved\": 1,\n          \"advertisement_id\": 3,\n          \"employee_id\": 3,\n          \"employee\": {\n              \"id\": 3,\n              \"user_id\": 7,\n              \"category_id\": 1,\n              \"stage_id\": 6,\n              \"short_description\": \"Desarrollador Web\",\n              \"about_me\": \"Soy un desarrollor web\",\n              \"price_hour\": \"15.50\",\n              \"behance_user\": null,\n              \"behance_active\": null,\n              \"linkedin_active\": null,\n              \"user\": {\n                  \"id\": 7,\n                  \"name\": \"Aldo\",\n                  \"lastname\": \"Cabezoniarini\",\n                  \"photo\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/techie-exitum/imagenes/user-profile/7af56780-01ab-11ea-a1a8-0123456789ab1cama.png\",\n                  \"description\": \"Soy una bandida bien rica , me gusta miya lo amo.\",\n                  \"avg_rating\": 1\n              },\n              \"invitations\": [\n                  {\n                      \"created_at\": \"2019-11-11T16:39:49.000Z\",\n                      \"saved\": 1,\n                      \"advertisement_id\": 3,\n                      \"employee_id\": 3\n                  }\n              ]\n          }\n      },\n      {\n          \"created_at\": \"2019-11-12T15:51:50.000Z\",\n          \"saved\": 1,\n          \"advertisement_id\": 3,\n          \"employee_id\": 4,\n          \"employee\": {\n              \"id\": 4,\n              \"user_id\": 8,\n              \"category_id\": 1,\n              \"stage_id\": 6,\n              \"short_description\": \"Desarrollador Web\",\n              \"about_me\": \"Soy un desarrollor web\",\n              \"price_hour\": \"15.50\",\n              \"behance_user\": null,\n              \"behance_active\": null,\n              \"linkedin_active\": null,\n              \"user\": {\n                  \"id\": 8,\n                  \"name\": \"javier\",\n                  \"lastname\": \"lecca\",\n                  \"photo\": null,\n                  \"description\": null,\n                  \"avg_rating\": 2\n              },\n              \"invitations\": [\n                  {\n                      \"created_at\": \"2019-11-12T15:51:50.000Z\",\n                      \"saved\": 1,\n                      \"advertisement_id\": 3,\n                      \"employee_id\": 4\n                  }\n              ]\n          }\n      }\n  ],\n  \"current\": 1,\n  \"pages\": 1\n}",
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
    "url": "/proposals/byAdvertisement?advertisement_id=ID",
    "title": "GET proposals by advertisement",
    "name": "proposals_by_advertisement",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Creacion del anuncio de trabajo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advertisement_id",
            "description": "<p>Id del anuncio</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/proposals/byAdvertisement?advertisement_id=1",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Listado de propuestas por anuncio\",\n    \"data\": [\n        {\n            \"id\": 2,\n            \"user_id\": 10,\n            \"category_id\": 1,\n            \"stage_id\": 1,\n            \"short_description\": \"Desarrollador Web\",\n            \"about_me\": \"Soy un desarrollor web\",\n            \"price_hour\": \"15.50\",\n            \"behance_user\": null,\n            \"behance_active\": null,\n            \"linkedin_active\": null,\n            \"user\": {\n                \"id\": 10,\n                \"name\": \"José\",\n                \"lastname\": \"Cristobal\",\n                \"photo\": null,\n                \"description\": null,\n                \"avg_rating\": 0,\n                \"toUserSkills\": []\n            }\n        }\n    ],\n    \"current\": 1,\n    \"pages\": 1\n}",
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
    "url": "/ads/recomendations?advertisement_id=ID&page=PAGE",
    "title": "GET recomendations by advertisement",
    "name": "recomendations_by_advertisement",
    "group": "ADVERTISEMENT",
    "version": "1.0.0",
    "description": "<p>Listado de anuncios</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/ads/recomendations?advertisement_id=3&page=1",
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
            "description": "<p>Indica el listado de impulsores</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Lista de impulsores recomendados\",\n    \"data\": [\n        {\n            \"id\": 7,\n            \"name\": \"Aldo\",\n            \"lastname\": \"Cabezoniarini\",\n            \"photo\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/techie-exitum/imagenes/user-profile/7af56780-01ab-11ea-a1a8-0123456789ab1cama.png\",\n            \"description\": \"Soy una bandida bien rica , me gusta miya lo amo.\",\n            \"avg_rating\": 0,\n            \"toUserSkills\": [\n                {\n                    \"id\": 2,\n                    \"skill\": \"Diseñador Ux\",\n                    \"icon\": null,\n                    \"skill_user\": {\n                        \"user_id\": 7,\n                        \"skill_id\": 2,\n                        \"highlight\": 0\n                    }\n                },\n                {\n                    \"id\": 1,\n                    \"skill\": \"Emprendedor\",\n                    \"icon\": null,\n                    \"skill_user\": {\n                        \"user_id\": 7,\n                        \"skill_id\": 1,\n                        \"highlight\": 1\n                    }\n                }\n            ],\n            \"employee\": {\n                \"id\": 3,\n                \"user_id\": 7,\n                \"category_id\": 1,\n                \"stage_id\": 6,\n                \"short_description\": \"Desarrollador Web\",\n                \"about_me\": \"Soy un desarrollor web\",\n                \"price_hour\": \"15.50\",\n                \"behance_user\": null,\n                \"behance_active\": null,\n                \"linkedin_active\": null,\n                \"invitations\": [\n                    {\n                        \"created_at\": \"2019-11-11T16:39:49.000Z\",\n                        \"saved\": 1,\n                        \"advertisement_id\": 3,\n                        \"employee_id\": 3\n                    }\n                ]\n            }\n        },\n        {\n            \"id\": 8,\n            \"name\": \"javier\",\n            \"lastname\": \"lecca\",\n            \"photo\": null,\n            \"description\": null,\n            \"avg_rating\": 0,\n            \"toUserSkills\": [\n                {\n                    \"id\": 2,\n                    \"skill\": \"Diseñador Ux\",\n                    \"icon\": null,\n                    \"skill_user\": {\n                        \"user_id\": 8,\n                        \"skill_id\": 2,\n                        \"highlight\": 0\n                    }\n                },\n                {\n                    \"id\": 1,\n                    \"skill\": \"Emprendedor\",\n                    \"icon\": null,\n                    \"skill_user\": {\n                        \"user_id\": 8,\n                        \"skill_id\": 1,\n                        \"highlight\": 1\n                    }\n                }\n            ],\n            \"employee\": {\n                \"id\": 4,\n                \"user_id\": 8,\n                \"category_id\": 1,\n                \"stage_id\": 6,\n                \"short_description\": \"Desarrollador Web\",\n                \"about_me\": \"Soy un desarrollor web\",\n                \"price_hour\": \"15.50\",\n                \"behance_user\": null,\n                \"behance_active\": null,\n                \"linkedin_active\": null,\n                \"invitations\": []\n            }\n        }\n    ],\n    \"current\": \"1\",\n    \"pages\": 1\n}",
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
    "url": "/advices/check",
    "title": "POST check advice",
    "name": "check_advice",
    "group": "ADVICE",
    "version": "1.0.0",
    "description": "<p>Morcar como entendido el consejo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advice_id",
            "description": "<p>Id del consejo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id de la usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de usuario (employee || startup).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/advices/check\n{\n    \"advice_id\": 1,\n    \"user_id\": 13,\n    \"type\": \"employee\"\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Consejo marcado como visto.\",\n    \"data\": {\n        \"id\": 19,\n        \"advice_id\": 1,\n        \"user_id\": 13,\n        \"employee_id\": 8,\n        \"date_viewed\": \"2019-11-22T22:57:24.589Z\",\n        \"viewed\": true\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "ADVICE",
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
    "url": "/appointments/create/:to_user_id",
    "title": "POST reservation",
    "name": "Reserva_de_horario",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_user_id",
            "description": "<p>ID del usuario al que se realizará la reserva.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/appointments/create/1",
        "type": "json"
      }
    ],
    "group": "APPOINTMENTS",
    "version": "1.0.0",
    "description": "<p>Horas disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "from_user_id",
            "description": "<p>ID del usuario que realizará la reserva.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Fecha en la cual se realizará la reserva.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Time",
            "optional": false,
            "field": "time",
            "description": "<p>Hora en la cual se realizará la reserva.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de reserva que realizará [reunion o recordatorio].</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Detalle de la reserva.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"from_user_id\": 2,\n    \"date\": \"2019-12-10\",\n    \"time\": \"6:00 PM\",\n    \"type\": \"reunion\",\n    \"description\": \"description\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"(...)\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "APPOINTMENTS"
  },
  {
    "type": "GET",
    "url": "/categories/list",
    "title": "GET list categories",
    "name": "List_Categories",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/categories/list",
        "type": "json"
      }
    ],
    "group": "CATEGORY",
    "version": "1.0.0",
    "description": "<p>Listar.</p>",
    "success": {
      "fields": {
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"Tecnológico\"\n        },\n        {\n            \"id\": 2,\n            \"name\": \"Radio y televisión\"\n        },\n        ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CATEGORY"
  },
  {
    "type": "GET",
    "url": "/stages/show/:type",
    "title": "GET show stages x type",
    "name": "List_stages_x_type",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de stage exitente.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/stages/show/startups",
        "type": "json"
      }
    ],
    "group": "CATEGORY",
    "version": "1.0.0",
    "description": "<p>List stages x type.</p>",
    "success": {
      "fields": {
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Rating asignado correctamente.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"stage\": \"Pre semilla\",\n            \"description\": \"Etapa donde solo se tiene una idea superficial y se busca validarla.\",\n            \"type\": \"startup\"\n        },\n        {\n            \"id\": 2,\n            \"stage\": \"Semilla\",\n            \"description\": \"Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.\",\n            \"type\": \"startup\"\n        },\n        ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CATEGORY"
  },
  {
    "type": "POST",
    "url": "/categories/search",
    "title": "POST find and create categories",
    "name": "Search_Categories",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/categories/search",
        "type": "json"
      }
    ],
    "group": "CATEGORY",
    "version": "1.0.0",
    "description": "<p>Puntuar a un usuario.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Nombre del una categoria.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"category\": \"tecn\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Rating asignado correctamente.\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"Tecnológico\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CATEGORY"
  },
  {
    "type": "POST",
    "url": "/certifications/create",
    "title": "POST create a certification",
    "name": "Crear_Certificaci_n",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/certifications/create",
        "type": "json"
      }
    ],
    "group": "CERTIFICATION",
    "version": "1.0.0",
    "description": "<p>Asignar una certificación.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que inicio sesión.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>El nombre de la certificación.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "issuing_company",
            "description": "<p>El nombre de la empresa que emitió el certificado.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "date_expedition",
            "description": "<p>Fecha de la expedición del certificado.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "date_expiration",
            "description": "<p>Fecha de vencimiento del certificado</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "File",
            "optional": false,
            "field": "document",
            "description": "<p>Archivo que acredite el certificado</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"user_id\": 1,\n    \"name\": \"Cisco Certification\",\n    \"issuing_company\": \"Cisco\",\n    \"date_expedition\": \"2015-12-12\"\n    \"date_expiration\": \"2019-12-12\",\n    \"file\": \"SO011.pdf\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CERTIFICATION"
  },
  {
    "type": "GET",
    "url": "/certifications/download/:fileName",
    "title": "GET download certifications",
    "name": "Descargar_certificaci_n",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>Nombre del archivo.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/certifications/download/pdf-name.pdf",
        "type": "json"
      }
    ],
    "group": "CERTIFICATION",
    "version": "1.0.0",
    "description": "<p>Descargar certificación.</p>",
    "success": {
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{ }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CERTIFICATION"
  },
  {
    "type": "POST",
    "url": "/certifications/delete",
    "title": "POST delete a certification",
    "name": "Eliminar_Certificaci_n",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/certifications/delete",
        "type": "json"
      }
    ],
    "group": "CERTIFICATION",
    "version": "1.0.0",
    "description": "<p>Eliminar una certificación.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que inicio sesión.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "certification_id",
            "description": "<p>ID del certificado.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"user_id\": 1,\n    \"certification_id\": 1\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CERTIFICATION"
  },
  {
    "type": "GET",
    "url": "/certifications/list-by-id/:user_id",
    "title": "GET show certifications user",
    "name": "Lista_de_certificaciones_del_usuario_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/certifications/list-by-id/1",
        "type": "json"
      }
    ],
    "group": "CERTIFICATION",
    "version": "1.0.0",
    "description": "<p>Show Certification User</p>",
    "success": {
      "fields": {
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        {\n            \"id\": 2,\n            \"name\": \"Cisco Certification\",\n            \"issuing_company\": \"Cisco\",\n            \"expedition\": \"12/12/2015\",\n            \"expiration\": \"12/12/2019\",\n            \"document_url\": \"cde85510-fa94-11e9-bcbf-0123456789abSO011.pdf\"\n        }\n        ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CERTIFICATION"
  },
  {
    "type": "POST",
    "url": "/challenges/createStage",
    "title": "POST create stage",
    "name": "create_stage",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Creación de etapa en la que se encuentra el reto</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "stage",
            "description": "<p>Nombre de la etapa.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción de la etapa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo a quien le pertenece esta etapa (startup o employee)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/createStage\n{\n    \"stage\": \"semilla\",\n    \"description\": \"Etapa semilla\",\n    \"type\": \"startup\"\n}",
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
            "description": "<p>Indica la etapa recien creada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Etapa creado correctamente.\",\n    \"data\": {\n        \"stage\": \"semilla\",\n        \"description\": \"Etapa semilla\",\n        \"type\": \"startup\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/createStep",
    "title": "POST create step",
    "name": "create_step",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Creación de nivel en la que se encuentra el reto.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "stage_id",
            "description": "<p>Id de la etapa a la que pertenece el nivel.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "photo",
            "description": "<p>Icono del nivel.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/createStep\n{\n    \"stage_id\": \"1\",\n    \"photo\": \"\"\n}",
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
            "description": "<p>Indica el nivel recien creado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Nivel creado correctamente.\",\n    \"data\": {\n        \"id\": 7,\n        \"icon\": \"892b95e0-eb8a-11e9-acef-0123456789abfoodU.png\",\n        \"stage_id\": \"1\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/createTip",
    "title": "POST create tip",
    "name": "create_tip",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Creación del reto.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "step_id",
            "description": "<p>Id del nivel al que pertenece el reto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tip",
            "description": "<p>Descripción del reto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/createTip\n{\n    \"tip\": \"Crear mi equipo de desarrollo\",\n    \"step_id\": 7\n}",
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
            "description": "<p>Indica el reto recien creado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Reto creado correctamente\",\n    \"data\": {\n        \"id\": 2,\n        \"tip\": \"Crear mi equipo de desarrollo\",\n        \"step_id\": 7\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/download/:file",
    "title": "POST download file",
    "name": "download_file",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Lista del nivel y sus retos de la startup.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Nomnbre del archivo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/download/maria.PNG",
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
            "field": "data",
            "description": "<p>Indica el listado de retos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/listStageEmp/:user_id",
    "title": "GET list stage employee",
    "name": "list_stage_employee",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Lista de etapa y sus niveles del employee.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
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
          "content": "/challenges/listStageEmp/8",
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
            "field": "data",
            "description": "<p>Indica el listado de retos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Etapa actual con sus niveles\",\n    \"data\": {\n        \"id\": 6,\n        \"stage\": \"Etapa 1 empleado\",\n        \"description\": \"Etapa 1 empleado.\",\n        \"type\": \"employee\",\n        \"steps\": [\n            {\n                \"id\": 21,\n                \"icon\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png\",\n                \"step\": \"Nivel 1 Etapa 1 employee\",\n                \"stage_id\": 6,\n                \"employee_steps\": [\n                    {\n                        \"employee_id\": 4,\n                        \"step_id\": 21,\n                        \"tip_completed\": 0,\n                        \"icon_count_tip\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg\",\n                        \"state\": \"incompleto\"\n                    }\n                ],\n                \"challenges\": [\n                    {\n                        \"id\": 321,\n                        \"user_id\": 8,\n                        \"employee_id\": 4,\n                        \"startup_id\": null,\n                        \"stage_id\": 6,\n                        \"step_id\": 21,\n                        \"tip_id\": 65,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-11-08T20:39:49.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    },\n                    {\n                        \"id\": 322,\n                        \"user_id\": 8,\n                        \"employee_id\": 4,\n                        \"startup_id\": null,\n                        \"stage_id\": 6,\n                        \"step_id\": 21,\n                        \"tip_id\": 66,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-11-08T20:39:49.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    }\n                ]\n            },\n            {\n                \"id\": 22,\n                \"icon\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png\",\n                \"step\": \"Nivel 2 Etapa 1 employee\",\n                \"stage_id\": 6,\n                \"employee_steps\": [\n                    {\n                        \"employee_id\": 4,\n                        \"step_id\": 22,\n                        \"tip_completed\": 0,\n                        \"icon_count_tip\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg\",\n                        \"state\": \"incompleto\"\n                    }\n                ],\n                \"challenges\": [\n                    {\n                        \"id\": 325,\n                        \"user_id\": 8,\n                        \"employee_id\": 4,\n                        \"startup_id\": null,\n                        \"stage_id\": 6,\n                        \"step_id\": 22,\n                        \"tip_id\": 69,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-11-08T20:39:49.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    },\n                    {\n                        \"id\": 326,\n                        \"user_id\": 8,\n                        \"employee_id\": 4,\n                        \"startup_id\": null,\n                        \"stage_id\": 6,\n                        \"step_id\": 22,\n                        \"tip_id\": 70,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-11-08T20:39:49.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    }\n                ]\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/listStage/:startup_id",
    "title": "GET list stage startup",
    "name": "list_stage_startup",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Lista de etapa y sus niveles de la startup.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
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
          "content": "/challenges/listStage/5",
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
            "field": "data",
            "description": "<p>Indica el listado de retos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Etapa actual con sus niveles\",\n    \"data\": {\n        \"id\": 1,\n        \"stage\": \"Pre semilla\",\n        \"description\": \"Etapa donde solo se tiene una idea superficial y se busca validarla.\",\n        \"type\": \"startup\",\n        \"steps\": [\n            {\n                \"id\": 1,\n                \"icon\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png\",\n                \"step\": \"Nivel 1 Etapa 1 startup\",\n                \"stage_id\": 1,\n                \"startup_steps\": [\n                    {\n                        \"startup_id\": 9,\n                        \"step_id\": 1,\n                        \"tip_completed\": 0,\n                        \"icon_count_tip\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/tip-icons/0-reto.svg\",\n                        \"state\": \"incompleto\"\n                    }\n                ],\n                \"challenges\": [\n                    {\n                        \"id\": 1,\n                        \"user_id\": 7,\n                        \"employee_id\": null,\n                        \"startup_id\": 9,\n                        \"stage_id\": 1,\n                        \"step_id\": 1,\n                        \"tip_id\": 1,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-10-30T14:33:25.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    },\n                    {\n                        \"id\": 2,\n                        \"user_id\": 7,\n                        \"employee_id\": null,\n                        \"startup_id\": 9,\n                        \"stage_id\": 1,\n                        \"step_id\": 1,\n                        \"tip_id\": 2,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-10-30T14:33:25.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    },\n                    {\n                        \"id\": 3,\n                        \"user_id\": 7,\n                        \"employee_id\": null,\n                        \"startup_id\": 9,\n                        \"stage_id\": 1,\n                        \"step_id\": 1,\n                        \"tip_id\": 3,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-10-30T14:33:25.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    },\n                    {\n                        \"id\": 4,\n                        \"user_id\": 7,\n                        \"employee_id\": null,\n                        \"startup_id\": 9,\n                        \"stage_id\": 1,\n                        \"step_id\": 1,\n                        \"tip_id\": 4,\n                        \"checked\": false,\n                        \"status\": \"Por verificar\",\n                        \"date\": \"2019-10-30T14:33:25.000Z\",\n                        \"comment\": null,\n                        \"reply\": null\n                    }\n                ]\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/listStepEmp?step_id=ID&user_id=IDD",
    "title": "GET list step employee",
    "name": "list_step_employee",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Lista del nivel y sus retos del impulsor.</p>",
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
            "field": "step_id",
            "description": "<p>Id del step o nivel.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/listStepEmp?step_id=21&user_id=8",
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
            "field": "data",
            "description": "<p>Indica el listado de retos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Listado de retos por nivel del impulsor\",\n    \"data\": {\n        \"id\": 21,\n        \"icon\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png\",\n        \"step\": \"Nivel 1 Etapa 1 employee\",\n        \"stage_id\": 6,\n        \"challenges\": [\n            {\n                \"id\": 321,\n                \"user_id\": 8,\n                \"employee_id\": 4,\n                \"startup_id\": null,\n                \"stage_id\": 6,\n                \"step_id\": 21,\n                \"tip_id\": 65,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-11-08T20:39:49.000Z\",\n                \"comment\": null,\n                \"reply\": null,\n                \"tip\": {\n                    \"id\": 65,\n                    \"tip\": \"Reto 1 Nivel 1 Etapa 1 employee\",\n                    \"description\": null,\n                    \"step_id\": 21,\n                    \"file_tips\": []\n                }\n            },\n            {\n                \"id\": 322,\n                \"user_id\": 8,\n                \"employee_id\": 4,\n                \"startup_id\": null,\n                \"stage_id\": 6,\n                \"step_id\": 21,\n                \"tip_id\": 66,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-11-08T20:39:49.000Z\",\n                \"comment\": null,\n                \"reply\": null,\n                \"tip\": {\n                    \"id\": 66,\n                    \"tip\": \"Reto 2 Nivel 1 Etapa 1 employee\",\n                    \"description\": null,\n                    \"step_id\": 21,\n                    \"file_tips\": []\n                }\n            },\n            {\n                \"id\": 323,\n                \"user_id\": 8,\n                \"employee_id\": 4,\n                \"startup_id\": null,\n                \"stage_id\": 6,\n                \"step_id\": 21,\n                \"tip_id\": 67,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-11-08T20:39:49.000Z\",\n                \"comment\": null,\n                \"reply\": null,\n                \"tip\": {\n                    \"id\": 67,\n                    \"tip\": \"Reto 3 Nivel 1 Etapa 1 employee\",\n                    \"description\": null,\n                    \"step_id\": 21,\n                    \"file_tips\": []\n                }\n            },\n            {\n                \"id\": 324,\n                \"user_id\": 8,\n                \"employee_id\": 4,\n                \"startup_id\": null,\n                \"stage_id\": 6,\n                \"step_id\": 21,\n                \"tip_id\": 68,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-11-08T20:39:49.000Z\",\n                \"comment\": null,\n                \"reply\": null,\n                \"tip\": {\n                    \"id\": 68,\n                    \"tip\": \"Reto 4 Nivel 1 Etapa 1 employee\",\n                    \"description\": null,\n                    \"step_id\": 21,\n                    \"file_tips\": []\n                }\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/listStep?step_id=ID&startup_id=IDD",
    "title": "GET list step startup",
    "name": "list_step_startup",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Lista del nivel y sus retos de la startup.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "startup_id",
            "description": "<p>Id de la startup.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "step_id",
            "description": "<p>Id del step o nivel.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/listStep?step_id=1&startup_id=6",
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
            "field": "data",
            "description": "<p>Indica el listado de retos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Listado de retos por nivel de la startup\",\n    \"data\": {\n        \"id\": 1,\n        \"icon\": \"https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png\",\n        \"step\": \"Nivel 1 Etapa 1 startup\",\n        \"stage_id\": 1,\n        \"challenges\": [\n            {\n                \"id\": 1,\n                \"user_id\": 7,\n                \"employee_id\": null,\n                \"startup_id\": 5,\n                \"stage_id\": 1,\n                \"step_id\": 1,\n                \"tip_id\": 1,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-10-25T21:42:00.000Z\",\n                \"comment\": null\n            },\n            {\n                \"id\": 2,\n                \"user_id\": 7,\n                \"employee_id\": null,\n                \"startup_id\": 5,\n                \"stage_id\": 1,\n                \"step_id\": 1,\n                \"tip_id\": 2,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-10-25T21:42:00.000Z\",\n                \"comment\": null\n            },\n            {\n                \"id\": 3,\n                \"user_id\": 7,\n                \"employee_id\": null,\n                \"startup_id\": 5,\n                \"stage_id\": 1,\n                \"step_id\": 1,\n                \"tip_id\": 3,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-10-25T21:42:00.000Z\",\n                \"comment\": null\n            },\n            {\n                \"id\": 4,\n                \"user_id\": 7,\n                \"employee_id\": null,\n                \"startup_id\": 5,\n                \"stage_id\": 1,\n                \"step_id\": 1,\n                \"tip_id\": 4,\n                \"checked\": false,\n                \"status\": \"Por verificar\",\n                \"date\": \"2019-10-25T21:42:00.000Z\",\n                \"comment\": null\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/reply",
    "title": "POST reply tip",
    "name": "reply_tip",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Lista del nivel y sus retos de la startup.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Archivo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "challenge_id",
            "description": "<p>Id del reto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reply",
            "description": "<p>Respuesta.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/reply\n{\n    \"file\": \"Documento.docx\",\n    \"challenge_id\": 1,\n    \"reply\": \"Respuesta al reto\"\n}",
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
            "field": "data",
            "description": "<p>Indica el listado de retos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Respuesta enviada correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/challenges/summaryTips?tip_id=ID",
    "title": "GET summary of tips",
    "name": "summary_of_tips",
    "group": "CHALLENGES",
    "version": "1.0.0",
    "description": "<p>Retos cumplidos por otros usuarios.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "tip_id",
            "description": "<p>Id del reto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/challenges/summaryTips?tip_id=1",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Reto cumplido por otros usuario\",\n    \"data\": [\n        {\n            \"reply\": \"ReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyRReplyeply\",\n            \"date\": \"2019-11-07T15:39:41.000Z\",\n            \"user\": {\n                \"id\": 12,\n                \"name\": \"Leidy\",\n                \"lastname\": \"Callupe\",\n                \"photo\": null\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "CHALLENGES",
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
    "url": "/employees/compare",
    "title": "POST compare employees",
    "name": "compare_employees",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Comparar a dos impulsores</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "employee_id_1",
            "description": "<p>Id del impulsor 1.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "employee_id_2",
            "description": "<p>Id del impulsor 2.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/employees/compare\n{\n    \"employee_id_1\" : 1,\n    \"employee_id_1\" : 2\n}",
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
            "description": "<p>Indica los datos obtenidos</p>"
          },
          {
            "group": "Datos obtenidos",
            "type": "Object[]",
            "optional": false,
            "field": "data.employees",
            "description": "<p>Indica el array de empleados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Comparación de dos impulsores exitosa\",\n    \"data\": {\n        \"employees\": [\n            {\n                \"id\": 1,\n                \"user_id\": 1,\n                \"category_id\": 1,\n                \"stage_id\": 1,\n                \"short_description\": \"Desarrollador Web\",\n                \"about_me\": \"Soy un desarrollor web\",\n                \"price_hour\": \"15.50\",\n                \"behance_user\": null,\n                \"behance_active\": null,\n                \"linkedin_active\": null,\n                \"category\": {\n                    \"id\": 1,\n                    \"name\": \"Tecnológico\"\n                },\n                \"education\": [],\n                \"experience\": [],\n                \"recommendation\": [],\n                \"languages\": [\n                    {\n                        \"id\": 1,\n                        \"language\": \"Ingles\",\n                        \"employee_language\": {\n                            \"employee_id\": 1,\n                            \"language_id\": 1,\n                            \"level_id\": 2,\n                            \"employeeId\": 1\n                        }\n                    },\n                    {\n                        \"id\": 2,\n                        \"language\": \"Espanol\",\n                        \"employee_language\": {\n                            \"employee_id\": 1,\n                            \"language_id\": 2,\n                            \"level_id\": 3,\n                            \"employeeId\": 1\n                        }\n                    }\n                ],\n                \"skills\": [\n                    {\n                        \"id\": 1,\n                        \"skill\": \"NodeJS\",\n                        \"employee_skill\": {\n                            \"employee_id\": 1,\n                            \"skill_id\": 1\n                        }\n                    }\n                ]\n            },\n            {\n                \"id\": 2,\n                \"user_id\": 2,\n                \"category_id\": 1,\n                \"stage_id\": 1,\n                \"short_description\": \"Desarrollador Web\",\n                \"about_me\": \"Soy un desarrollor web\",\n                \"price_hour\": \"15.50\",\n                \"behance_user\": null,\n                \"behance_active\": null,\n                \"linkedin_active\": null,\n                \"category\": {\n                    \"id\": 1,\n                    \"name\": \"Tecnológico\"\n                },\n                \"education\": [],\n                \"experience\": [],\n                \"recommendation\": [],\n                \"languages\": [\n                    {\n                        \"id\": 1,\n                        \"language\": \"Ingles\",\n                        \"employee_language\": {\n                            \"employee_id\": 2,\n                            \"language_id\": 1,\n                            \"level_id\": 2,\n                            \"employeeId\": 2\n                        }\n                    },\n                    {\n                        \"id\": 2,\n                        \"language\": \"Espanol\",\n                        \"employee_language\": {\n                            \"employee_id\": 2,\n                            \"language_id\": 2,\n                            \"level_id\": 3,\n                            \"employeeId\": 2\n                        }\n                    }\n                ],\n                \"skills\": [\n                    {\n                        \"id\": 1,\n                        \"skill\": \"NodeJS\",\n                        \"employee_skill\": {\n                            \"employee_id\": 2,\n                            \"skill_id\": 1\n                        }\n                    }\n                ]\n            }\n        ]\n    }\n}",
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
          "content": "/employees/create\n{\n    \"user_id\" : 3,\n    \"category_id\" : 1,\n    \"about_me\" : \"Soy un desarrollor web\",\n    \"short_description\" : \"Desarrollador Web\",\n    \"price_hour\" : 15,\n    \"types\" : [1],\n    \"languages\" : [\n            {\n                \"language_id\": 2,\n                \"level_id\": 2\n            },\n            {\n                \"language_id\": 3,\n                \"level_id\": 3\n            }\n        ]\n}",
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
    "title": "POST update employee languages",
    "name": "update_employee_languages",
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
    "url": "/employees/update/skills",
    "title": "POST update employee skills",
    "name": "update_employee_skills",
    "group": "EMPLOYEE",
    "version": "1.0.0",
    "description": "<p>Actualiza las habilidades del empleado</p>",
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
    "title": "POST update employee types",
    "name": "update_employee_types",
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
    "url": "/events/update/:event_id",
    "title": "POST update event",
    "name": "Actualizar_un_evento",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "event_id",
            "description": "<p>ID del evento.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/events/update/1",
        "type": "json"
      }
    ],
    "group": "EVENTS",
    "version": "1.0.0",
    "description": "<p>Horas disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Nombre del evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Date",
            "optional": false,
            "field": "day",
            "description": "<p>Fecha en la cual se realizará el evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Detalle del evento</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Time",
            "optional": false,
            "field": "hour_start",
            "description": "<p>Hora de inicio del evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Time",
            "optional": false,
            "field": "hour_end",
            "description": "<p>Hora fin del evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>Lugar donde se realizará.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "lat",
            "description": "<p>Coordenadas de ubicación.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "lng",
            "description": "<p>Coordenadas de ubicación.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Status retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n      \"title\": \"Nuevo evento\",\n      \"day\": \"2017-11-11\",\n      \"description\": \"description\",\n      \"hour_start\": \"12:00:00\",\n      \"hour_end\": \"15:00:00\",\n      \"place\": \"Lima\",\n      \"user_id\": 2,\n      \"categories\": [ \"Tecnología\", \"IOT\" ]   \n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n      \"status\": true,\n      \"message\": \"(...)\",\n      \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n      \"status\" : false,\n      \"message\": \"(...)\",\n      \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EVENTS"
  },
  {
    "type": "POST",
    "url": "/events/create/",
    "title": "POST create event",
    "name": "Crear_un_evento",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/events/create",
        "type": "json"
      }
    ],
    "group": "EVENTS",
    "version": "1.0.0",
    "description": "<p>Horas disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Nombre del evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Date",
            "optional": false,
            "field": "day",
            "description": "<p>Fecha en la cual se realizará el evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Detalle del evento</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Time",
            "optional": false,
            "field": "hour_start",
            "description": "<p>Hora de inicio del evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Time",
            "optional": false,
            "field": "hour_end",
            "description": "<p>Hora fin del evento.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>Lugar donde se realizará.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "lat",
            "description": "<p>Coordenadas de ubicación.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "lng",
            "description": "<p>Coordenadas de ubicación.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que registró el usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Status retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n      \"title\": \"Nuevo evento\",\n      \"day\": \"2017-11-11\",\n      \"description\": \"description\",\n      \"hour_start\": \"12:00:00\",\n      \"hour_end\": \"15:00:00\",\n      \"place\": \"Lima\",\n      \"user_id\": 2,\n      \"categories\": [ \"Tecnología\", \"IOT\" ]   \n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n      \"status\": true,\n      \"message\": \"(...)\",\n      \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n      \"status\" : false,\n      \"message\": \"(...)\",\n      \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EVENTS"
  },
  {
    "type": "GET",
    "url": "/events/download/:user_id",
    "title": "GET list by user events",
    "name": "Listar_eventos_por_usuario",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/events/list-by-id/1",
        "type": "json"
      }
    ],
    "group": "EVENTS",
    "version": "1.0.0",
    "description": "<p>Descargar certificación.</p>",
    "success": {
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n      \"status\": true,\n      \"message\": \"OK\",\n      \"data\": [\n          {\n              \"id\": 1,\n              \"title\": \"Nuevo evento\",\n              \"description\": \"description\",\n              \"day\": \"2017-11-11\",\n              \"hour_start\": \"12:00:00\",\n              \"hour_end\": \"15:00:00\",\n              \"place\": \"Lima\",\n              \"lat\": null,\n              \"lng\": null,\n              \"user_id\": 1\n          }\n          ...\n      ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EVENTS"
  },
  {
    "type": "POST",
    "url": "/events/take-part",
    "title": "POST Take part event",
    "name": "Participar_en_un_evento",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/events/take-part",
        "type": "json"
      }
    ],
    "group": "EVENTS",
    "version": "1.0.0",
    "description": "<p>Horas disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "event_id",
            "description": "<p>ID del evento.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Status retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n      \"\"user_id\": 1,\n      \"event_id\": 1\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n      \"status\": true,\n      \"message\": \"(...)\",\n      \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n      \"status\" : false,\n      \"message\": \"(...)\",\n      \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "EVENTS"
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
    "url": "/proposals/create",
    "title": "POST create proposal",
    "name": "create_proposal",
    "group": "PROPOSALS",
    "version": "1.0.0",
    "description": "<p>Se crea o actualiza una propuesta para un anuncio.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id del usuario impulsor.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "advertisement_id",
            "description": "<p>Id del anuncio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/proposals/create\n{\n    \"id\": 3,\n    \"advertisement_id\": 1\n}",
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
            "description": "<p>Indica la propuesta creado o actualizado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos obtenidos:",
          "content": "{\n    \"status\": true,\n    \"message\": \"Propuesta creada correctamente.\",\n    \"data\": [\n        {\n            \"accepted\": false,\n            \"created_at\": \"2019-11-04T02:46:40.640Z\",\n            \"employee_id\": 3,\n            \"advertisement_id\": 2\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "PROPOSALS",
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
    "url": "/startups/rating/:startup_id",
    "title": "POST create and update rating",
    "name": "Puntuar_Startup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "startup_id",
            "description": "<p>ID del usuario al que se puntuará.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/startups/rating/1",
        "type": "json"
      }
    ],
    "group": "REVIEW_STARTUP",
    "version": "1.0.0",
    "description": "<p>Puntuar a un usuario.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que inicio sesion y desea puntuar.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Puntaje del 1 al 5 que asignó el usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"user_id\": 2,\n    \"rating\": 5\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Rating asignado correctamente.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "REVIEW_STARTUP"
  },
  {
    "type": "POST",
    "url": "/startups/recommendation/:startup_id",
    "title": "POST create and update recommendation",
    "name": "Recomendaci_n_Startup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "startup",
            "description": "<p>ID startup al que se comentará.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/startups/recommendation/1",
        "type": "json"
      }
    ],
    "group": "REVIEW_STARTUP",
    "version": "1.0.0",
    "description": "<p>Recomendación a una startup.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que inicio sesion y desea comentar.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "review",
            "description": "<p>Recomendación que asignó el usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"user_id\": 2,\n    \"review\": \"Recomendación del usuario 2\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Recomendación asignada correctamente.\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "REVIEW_STARTUP"
  },
  {
    "type": "POST",
    "url": "/users/rating/:to_user_id",
    "title": "POST create and update rating",
    "name": "Puntuar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_user_id",
            "description": "<p>ID del usuario al que se puntuará.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/users/rating/1",
        "type": "json"
      }
    ],
    "group": "REVIEW_USER",
    "version": "1.0.0",
    "description": "<p>Puntuar a un usuario.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "from_user_id",
            "description": "<p>ID del usuario que inicio sesion y desea puntuar.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Puntaje del 1 al 5 que asignó el usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"from_user_id\": 2,\n    \"rating\": 5\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Rating asignado correctamente.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "REVIEW_USER"
  },
  {
    "type": "POST",
    "url": "/users/comment/:to_user_id",
    "title": "POST create and update comment",
    "name": "comentario",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_user_id",
            "description": "<p>ID del usuario al que se comentará.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/users/comment/1",
        "type": "json"
      }
    ],
    "group": "REVIEW_USER",
    "version": "1.0.0",
    "description": "<p>Comentario a un usuario.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "from_user_id",
            "description": "<p>ID del usuario que inicio sesion y desea comentar.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "String",
            "optional": false,
            "field": "review",
            "description": "<p>Comentario que asignó el usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"from_user_id\": 2,\n    \"review\": \"Comentario del usuario 2\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Comentario asignado correctamente.\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "REVIEW_USER"
  },
  {
    "type": "POST",
    "url": "/schedules/create/:user_id",
    "title": "POST availability time user",
    "name": "Horario_de_disponibilidad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario al que se asignará el horario.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/schedules/create/1",
        "type": "json"
      }
    ],
    "group": "SCHEDULE",
    "version": "1.0.0",
    "description": "<p>Asignar una horario de disponiblidad.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que inicio sesión.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Date",
            "optional": false,
            "field": "from_hour",
            "description": "<p>Hora de inicio de trabajo de un usuario.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Date",
            "optional": false,
            "field": "to_hour",
            "description": "<p>Hora final de trabajo del usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"from_hour\": \"7:00 am\",\n    \"to_hour\": \"10:00 pm\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "SCHEDULE"
  },
  {
    "type": "POST",
    "url": "/schedules/not-available/:user_id",
    "title": "POST not available time user",
    "name": "Horario_no_disponible",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario al que se asignará el horario.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/schedules/not-available/1",
        "type": "json"
      }
    ],
    "group": "SCHEDULE",
    "version": "1.0.0",
    "description": "<p>Asignar una hora no disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Time",
            "optional": false,
            "field": "not_available",
            "description": "<p>Hora no disponible.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"not_available\": \"1:00 PM\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "SCHEDULE"
  },
  {
    "type": "POST",
    "url": "/schedules/schedule/:user_id",
    "title": "POST available hours user",
    "name": "Horas_disponible",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario al que se asignará el horario.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/schedules/schedule/1",
        "type": "json"
      }
    ],
    "group": "SCHEDULE",
    "version": "1.0.0",
    "description": "<p>Horas disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Fecha en la cual se quiere obtener las horas disponible.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"date\": \"2019-12-10\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": [\n        \"7:00 AM\",\n        \"8:00 AM\"\n        ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "SCHEDULE"
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
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "skill",
            "description": "<p>Nombre de la habilidad.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "/skills/create\n{\n    \"skill\": \"Programador en Java\"\n}",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Skill creado correctamente\",\n    \"data\": {\n        \"id\": 2,\n        \"skill\": \"Programador en JavaScript\"\n    }\n}",
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
    "url": "/stages/create",
    "title": "POST create a stage",
    "name": "Crear_Stage",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/stages/create",
        "type": "json"
      }
    ],
    "group": "STAGE",
    "version": "1.0.0",
    "description": "<p>Puntuar a un usuario.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que inicio sesion y desea puntuar.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Puntaje del 1 al 5 que asignó el usuario.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"stage\": \"stage\",\n    \"description\": \"description\",\n    \"type\":\"type\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\": {\n        \"id\": ...,\n        \"stage\": \"stage\",\n        \"description\": \"description\",\n        \"type\": \"employee\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "STAGE"
  },
  {
    "type": "GET",
    "url": "/stages/list",
    "title": "GET list stages",
    "name": "List_Stages",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/stages/list",
        "type": "json"
      }
    ],
    "group": "STAGE",
    "version": "1.0.0",
    "description": "<p>Listar.</p>",
    "success": {
      "fields": {
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK.\",\n    \"\"data\": [\n        {\n            \"id\": 1,\n            \"stage\": \"Pre semilla\",\n            \"description\": \"Etapa donde solo se tiene una idea superficial y se busca validarla.\",\n            \"type\": \"startup\"\n        },\n        {\n            \"id\": 2,\n            \"stage\": \"Semilla\",\n            \"description\": \"Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.\",\n            \"type\": \"startup\"\n        },\n        ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "STAGE"
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
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Ok\",\n        \"data\": {\n            \"startups\": [\n                {\n                    \"id\": 5,\n                    \"name\": \"NextMedicall\",\n                    \"photo_url\": \"3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG\",\n                    \"ruc\": \"12312313\",\n                    \"description\": \"Startup de telemedicinaaa\",\n                    \"entrepreneur_id\": 5,\n                    \"category_id\": 1,\n                    \"stage_id\": 1\n                }\n            ]\n        }\n    }",
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
          "content": "\t{\n        \"status\": true,\n        \"startups\": [\n            {\n                \"id\": 1,\n                \"name\": \"NextMedicall\",\n                \"photo_url\": \"3e309850-e613-11e9-aa7b-0123456789abCaptura2.PNG\",\n                \"ruc\": \"12312313\",\n                \"description\": \"Startup de telemedicinaaa\",\n                \"entrepreneur_id\": 5,\n                \"category_id\": 1,\n                \"stage_id\": 1\n            }\n        ]\n    }",
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
          "content": "{\n    \"status\": true,\n    \"message\": \"Ok\",\n    \"data\": {\n        \"sectors\": [\n            {\n                \"id\": 1,\n                \"sector\": \"Medicina\"\n            }\n        ]\n    }\n}",
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
    "type": "POST",
    "url": "/users/update-image",
    "title": "POST update image user",
    "name": "Actualizar_imagen_de_usuario",
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/users/update-image",
        "type": "json"
      }
    ],
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Horas disponible.</p>",
    "success": {
      "fields": {
        "Datos requeridos": [
          {
            "group": "Datos requeridos",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario que realizará que desea actualizar.</p>"
          },
          {
            "group": "Datos requeridos",
            "type": "File",
            "optional": false,
            "field": "photo",
            "description": "<p>Imagen la cual desea actualizar.</p>"
          }
        ],
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos requeridos",
          "content": "{\n    \"user_id\": 1,\n    \"photo\": \"image.png\"\n}",
          "type": "json"
        },
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"(...)\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"Usuario\",\n        \"lastname\": \"Usuario\",\n        \"email\": \"usuario@gmail.com\",\n        \"provider_id\": null,\n        \"confirmed\": true,\n        \"phone\": null,\n        \"role\": \"employee\",\n        \"method\": \"local\",\n        \"active\": true,\n        \"last_login\": null,\n        \"photo\": null,\n        \"photo_dni\": null,\n        \"avg_rating\": null,\n        \"from_hour\": \"07:00:00\",\n        \"to_hour\": \"22:00:00\",\n        \"birthday\": \"1999-12-12\",\n        \"country_id\": 1,\n        \"currency_id\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "USER"
  },
  {
    "type": "GET",
    "url": "/users/show/:user_id",
    "title": "GET show user data",
    "name": "Lista_de_certificaciones_del_usuario_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID del usuario.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request parameter",
        "content": "http://35.175.241.103:8081/users/show/1",
        "type": "json"
      }
    ],
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Show User</p>",
    "success": {
      "fields": {
        "Datos retornados": [
          {
            "group": "Datos retornados",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Indica si la petición fue existosa.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Datos retornados",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Datos retornados",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"OK\",\n    \"data\":\"data\": {\n        \"id\": 1,\n        \"name\": \"Usuario\",\n        \"lastname\": \"Usuario\",\n        \"email\": \"usuario@gmail.com\",\n        \"provider_id\": null,\n        \"confirmed\": true,\n        \"phone\": null,\n        \"role\": \"employee\",\n        \"active\": true,\n        \"last_login\": null,\n        \"photo_dni\": null,\n        \"avg_rating\": null,\n        \"from_hour\": \"07:00:00\",\n        \"to_hour\": \"22:00:00\",\n        \"country_id\": 1,\n        \"currency_id\": 1,\n        \"toUserSkills\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error retornado": [
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Estado negativo de la petición.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje retornado.</p>"
          },
          {
            "group": "Error retornado",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contenido retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 4xx Error\n{\n    \"status\" : false,\n    \"message\": \"(...)\",\n    \"data\":  { }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "util/documentation.js",
    "groupTitle": "USER"
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
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Su cuenta fue verificada.\",\n        \"data\": {\n            \"id\": 49,\n            \"name\": \"Leidy\",\n            \"lastname\": \"Callupe\",\n            \"email\": \"leidy.callupe@tecsup.edu.pe\",\n            \"provider_id\": null,\n            \"confirmed\": false,\n            \"phone\": null,\n            \"role\": \"employee\",\n            \"method\": \"local\",\n            \"password\": \"$2a$10$j0ivFo1F9Yud5sTTmYnEU.CDspnqPq4oa.vzySfLZOlbLZRGvKsEG\",\n            \"active\": true,\n            \"last_login\": null,\n            \"photo\": null,\n            \"photo_dni\": null,\n            \"avg_rating\": null,\n            \"country_id\": 1,\n            \"currency_id\": 1\n        }\n    }",
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
    "url": "/users/createWorkshop",
    "title": "POST create workshop",
    "name": "create_workshop",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Creación de un taller.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id del taller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo del taller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción del taller.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "day",
            "description": "<p>Día del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "hour_start",
            "description": "<p>Hora de inicio del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "hour_end",
            "description": "<p>Hora de cierre del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>Dirección del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitud.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitud. *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/createWorkshop\n    {\n        \"title\": \"Taller de costura\",\n        \"description\": \"DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion\",\n        \"day\": \"12-12-19\",\n        \"hour_start\": \"12:00\",\n        \"hour_end\": \"15:00\",\n        \"place\": \"Av. Atahualpa 123\",\n        \"lat\": -0.1515321,\n        \"lng\": 68.5646464,\n        \"user_id\": 10\n    }",
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
          "content": "{\n    \"status\": 200,\n    \"message\": \"Taller creado correctamente\",\n    \"data\": {\n        \"id\": 2,\n        \"title\": \"Taller de costura\",\n        \"description\": \"DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion\",\n        \"day\": \"2019-12-12T05:00:00.000Z\",\n        \"hour_start\": \"12:00\",\n        \"hour_end\": \"15:00\",\n        \"place\": \"Av. Atahualpa 123\",\n        \"lat\": -0.1515321,\n        \"lng\": 68.5646464,\n        \"user_id\": 10\n    }\n}",
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
    "url": "/users/deleteWorkshop",
    "title": "POST delete workshop",
    "name": "delete_workshop",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Actualización de un taller.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "workshop_id",
            "description": "<p>Id del taller. *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/deleteWorkshop\n    {\n        \"workshop_id\": 2\n    }",
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
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Eliminado correctamente\"\n    }",
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
          "content": "\t{\n        \"status\": true,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken\n        }\n    }",
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
          "content": "\t{\n        \"status\": true,\n        \"accessData\": {\n            \"id\": id,\n            \"email\": email,\n            \"accessToken\": accessToken\n        }\n    }",
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
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Un email de verificación ha sido enviado a leidy.callupe@tecsup.edu.pe .\"\n    }",
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
    "type": "GET",
    "url": "/users/countries",
    "title": "GET list country",
    "name": "resendToken",
    "group": "USER",
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
          "content": "\t{\n        \"status\": true,\n        \"countries\": [\n            {\n                \"id\": 1,\n                \"country\": \"Peru\",\n                \"code\": \"PER\",\n                \"currency_id\": 1\n            }\n        ]\n    }",
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
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Su cambio el password.\",\n        \"data\": {\n            \"id\": 49,\n            \"name\": \"Leidy\",\n            \"lastname\": \"Callupe\",\n            \"email\": \"leidy.callupe@tecsup.edu.pe\",\n            \"provider_id\": null,\n            \"confirmed\": false,\n            \"phone\": null,\n            \"role\": \"employee\",\n            \"method\": \"local\",\n            \"password\": \"$2a$10$j0ivFo1F9Yud5sTTmYnEU.CDspnqPq4oa.vzySfLZOlbLZRGvKsEG\",\n            \"active\": true,\n            \"last_login\": null,\n            \"photo\": null,\n            \"photo_dni\": null,\n            \"avg_rating\": null,\n            \"country_id\": 1,\n            \"currency_id\": 1\n        }\n    }",
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
          "content": "{\n    \"name\":\"Leidy\",\n    \"lastname\": \"Callupe\",\n    \"email\":\"leidy.callupe@tecsup.edu.pe\",\n    \"password\":\"leidy123\",\n}",
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
          "content": "{\n    \"status\": true,\n    \"accessData\": {\n        \"id\": id,\n        \"email\": email,\n        \"accessToken\": accessToken\n    }\n}",
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
          "content": "\t{\n        \"status\": true,\n        \"message\": 'Un email de recuperación ha sido enviado a leidy.callupe@tecsup.edu.pe',\n    }",
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
            "type": "Date",
            "optional": false,
            "field": "birthday",
            "description": "<p>Fecha de nacimiento del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skill_id",
            "description": "<p>Skill que desean destacar [opcional].</p>"
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
            "description": "<p>Nuevo rol del usuario ('entrepreneur', 'employee', 'admin').</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "photo",
            "description": "<p>Imagen del usuario *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "{\n    \"user_id\": 2\n    \"name\": \"Leidy Paula\"\n    \"lastname\": \"Callupe Santisteban\"\n    \"phone\": \"1523456789\"\n    \"active\": \"true\"\n    \"role\": \"entrepreneur\"\n    \"photo\": \"image.png\",\n    \"birthday\": '1998-05-20,\n    \"skill_id\": 1\n}",
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
          "content": "\t{\n        \"status\": true,\n        \"message\": \"Usuario actualizado correctamente\"\n        \"data\": {\n            \"id\": 1,\n            \"name\": \"Usuario\",\n            \"lastname\": \"Usuario\",\n            \"email\": \"usuario@gmail.com\",\n            \"provider_id\": null,\n            \"confirmed\": true,\n            \"phone\": null,\n            \"role\": \"employee\",\n            \"method\": \"local\",\n            \"active\": true,\n            \"last_login\": null,\n            \"photo\": null,\n            \"photo_dni\": null,\n            \"avg_rating\": null,\n            \"from_hour\": \"07:00:00\",\n            \"to_hour\": \"22:00:00\",\n            \"birthday\": \"1999-12-12\",\n            \"country_id\": 1,\n            \"currency_id\": 1\n        }\n    }",
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
    "url": "/users/updateWorkshop",
    "title": "POST update workshop",
    "name": "update_workshop",
    "group": "USER",
    "version": "1.0.0",
    "description": "<p>Actualización de un taller.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "workshop_id",
            "description": "<p>Id del taller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo del taller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción del taller.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "day",
            "description": "<p>Día del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "hour_start",
            "description": "<p>Hora de inicio del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "hour_end",
            "description": "<p>Hora de cierre del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>Dirección del evento.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitud.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitud. *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo url",
          "content": "\t/users/updateWorkshop\n    {\n        \"title\": \"Taller de costuraaaa2\",\n        \"description\": \"DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion\",\n        \"day\": \"12-12-19\",\n        \"hour_start\": \"12:00\",\n        \"hour_end\": \"15:00\",\n        \"place\": \"Av. Atahualpa 123\",\n        \"lat\": -0.1515321,\n        \"lng\": 68.5646464,\n        \"workshop_id\": 2\n    }",
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
          "content": "\t{\n        \"status\": 200,\n        \"message\": \"Taller actualizado correctamente\"\n    }",
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
