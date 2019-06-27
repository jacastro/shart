
# run

 ```sh
 docker-compose up  -d
 docker exec -it mongoDBSem2 bin/bash
 /usr/bin/mongo
#  show dbs
#  use uade_sem2_shart
#  db.stats() # db info
#  db.getCollectionNames()
 ```

## Seed

Seed data

```sh
db.users.find() view all
# remove all
db.users.remove({})
db.mes.remove({})
db.clients.remove({})
db.projects.remove({})
#  db.users.find({ email: 'dummy1@gmail.com' })
#  db.users.find({ user_name: { $regex: 'o$' } })

## Mes
###############################

var o1 = ObjectId();
var me1 = ObjectId();
db.users.insert({ _id: o1, id: 'ae4cc7ac-0052-47e0-b2b1-499c6461e509', email: 'matiasberrueta@gmail.com', user_name: 'mberrueta' })
db.mes.insert({ _id: me1, id: 'ea1195ad-2732-49c4-a753-bc0eb6ba8180', full_name: 'Matias Berrueta', phone: '+54(011)-3455477', biography: 'Herreria', address: 'Av Independencia 1235', city: 'Buenos Aires', postal_code: '2345', tags: ['Herreria', 'Diseño'], user: o1 })

var o2 = ObjectId();
var me2 = ObjectId();
db.users.insert({ _id: o2, id: '58f3266e-a155-48f6-83b4-2dc909ecd17f', email: 'erikannunez@gmail.com', user_name: 'eri' })
db.mes.insert({ _id: me2, id: '9d8628e3-189a-4637-a470-44b2b6a55d84', full_name: 'Erica Nuñez', phone: '+54(011)-6785477', biography: 'Diseñadora de interiores', address: 'San juan 355', city: 'Buenos Aires', postal_code: '1246', tags: ['Muebles', 'Diseño'], user: o2 })

var o3 = ObjectId();
var me3 = ObjectId();
db.users.insert({ _id: o3, id: '902d84c4-54aa-403d-953c-53be2206f130', email: 'otero.florencia96@gmail.com', user_name: 'flor' })
db.mes.insert({ _id: me3, id: 'fae57ec3-f23c-4464-8c5d-9427a37bc811', full_name: 'Florencia Otero', phone: '+54(011)-7895477', biography: 'Modelar arcilla', address: 'Carlos Calvo 2464', city: 'Buenos Aires', postal_code: '1224', tags: ['toys', 'jueguetes'], user: o3 })

var o4 = ObjectId();
var me4 = ObjectId();
db.users.insert({ _id: o4, id: '30cdc899-c565-48c7-9235-d98d3d45de71', email: 'javiacastro@gmail.com', user_name: 'javi' })
db.mes.insert({ _id: me4, id: '87bd4371-af14-4085-b7b2-928969fa7672', full_name: 'Javier Castro', phone: '+54(011)-3115123', biography: 'Florista, amante de los arboles', address: 'Av Libertador 6003', city: 'Buenos Aires', postal_code: '3612', tags: ['bonsai', 'flores'], user: o4 })

var o5 = ObjectId();
var me5 = ObjectId();
db.users.insert({ _id: o5, id: 'a4c524e8-b817-4bab-a018-3f215d3cf3b4', email: 'alberto.d.sal@gmail.com', user_name: 'beto' })
db.mes.insert({ _id: me5, id: '6540ce94-b6f8-46d6-8846-a18aae46b618', full_name: 'Alberto Sal', phone: '+54(011)-3115567', biography: 'electricista', address: 'San Juan 3230', city: 'Buenos Aires', postal_code: '1363', tags: ['toys', 'Diseño'], user: o5 })

var o6 = ObjectId();
var me6 = ObjectId();
db.users.insert({ _id: o6, id: '7aab7404-a28f-4a04-815a-3dabdacd0f2c', email: 'ckjoseconstancio@gmail.com', user_name: 'ckjoseconstancio' })
db.mes.insert({ _id: me6, id: '4c41b59a-b0ce-46cf-91f2-fe73644f69d7', full_name: 'Jose Constancio', phone: '+54(939)-1115565', biography: 'Licenciado en Tecnologia de Alimentos', address: 'Miranzo No. 54', city: 'Jujuy', postal_code: '78707', tags: ['Cerveza', 'Comida'], user: o6 })

var o7 = ObjectId();
var me7 = ObjectId();
db.users.insert({ _id: o7, id: 'ff2f2d88-95b4-402f-a495-02485aa9ed34', email: 'esromulo@gmail.com', user_name: 'esromulo' })
db.mes.insert({ _id: me7, id: 'eec75533-fcff-4b25-a1dd-5153a7322bd5', full_name: 'Romulo Renilla', phone: '+54(252)-3115477', biography: 'Carpintero', address: 'Bulevar Pritchard No. 163', city: 'Chaco', postal_code: '50842', tags: ['Carpinteria', 'Madera'], user: o7 })

var o8 = ObjectId();
var me8 = ObjectId();
db.users.insert({ _id: o8, id: '3ad29665-126f-4cd4-9060-8ca0c1b82f0b', email: 'bhtrescastro7@gmail.com', user_name: 'bhtrescastro7' })
db.mes.insert({ _id: me8, id: 'f06ec85c-c18b-47ae-ac60-5583948baadd', full_name: 'Dolores Gareta Trescastro', phone: '+54(454)-5441155', biography: 'Pintora', address: 'Privada Aparicio No. 241', city: 'La Rioja', postal_code: '62838', tags: ['Pintura', 'Esculturas'], user: o8 })

var o9 = ObjectId();
var me9 = ObjectId();
db.users.insert({ _id: o9, id: 'f9975d47-b19a-4577-8cd6-9300d9410dc3', email: 'hasobrero@gmail.com', user_name: 'hasobrero' })
db.mes.insert({ _id: me9, id: 'f1febd52-581c-459a-a299-b4f5745c25a0', full_name: 'Ainara Ardanza Sobrero', phone: '+54(454)-0776405', biography: 'Abogado', address: 'Privada Marcotegui No. 724', city: 'La Rioja', postal_code: '62832', tags: ['Manualidades', 'arcilla'], user: o9 })

var o10 = ObjectId();
var me10 = ObjectId();
db.users.insert({ _id: o10, id: 'dd11c073-7dba-4914-8c99-6272afb5481e', email: 'aiaugusto@gmail.com', user_name: 'aiaugusto' })
db.mes.insert({ _id: me10, id: '998c6921-6736-4f4a-93b5-e639ce5830c0', full_name: 'Augusto Zenon Moreno', phone: '+54(939)-2000302', biography: 'Lic. en diseño industrial', address: 'Avenida Zambrano No. 761', city: 'Jujuy', postal_code: '78706', tags: ['Diseño', 'Pintura'], user: o10 })


## Clients
###############################

o = ObjectId();
db.users.insert({ _id: o, id: '0f2e83e4-4d0a-4725-a461-5cfeee8deaef', email: 'hcorvay2@gmail.com', user_name: 'hcorvay2' })
db.clients.insert({ id: '56c5c2b8-b6db-444f-a4a8-033a339a9777', full_name: 'Nahuel A. Cameno Orvay', phone: '+54(242)-8888905', user: o })

o = ObjectId();
db.users.insert({ _id: o, id: '1dc483ae-4739-4069-81ea-e815709b972c', email: 'iwjeronimoamadeo22@gmail.com', user_name: 'iwjeronimoamadeo22' })
db.clients.insert({ id: '932fe867-7185-4b56-8937-883d3ac53054', full_name: 'Jeronimo Amadeo Ayra Blacio', phone: '+54(848)-5441172', user: o })

o = ObjectId();
db.users.insert({ _id: o, id: '51b94055-104b-4f22-bbdd-cef34c36fe3e', email: 'fivive8@gmail.com', user_name: 'fivive8' })
db.clients.insert({ id: '097dcc40-18e2-46de-8ba9-0292493d9acf', full_name: 'Xavier Centeno Vive', phone: '+54(747)-3443467', user: o })

o = ObjectId();
db.users.insert({ _id: o, id: 'e7de6c1c-c953-4937-9078-8e370779a76c', email: 'gobaleztena14@gmail.com', user_name: 'gobaleztena14' })
db.clients.insert({ id: 'de2cb1fd-665d-4322-bcf9-9f827dc74509', full_name: 'Bianca Q. Atenza Baleztena', phone: '+54(434)-3775505', user: o })

o = ObjectId();
db.users.insert({ _id: o, id: '9aa80528-5eff-4feb-a0f3-bc8acd5b1a95', email: 'gvamanda21@gmail.com', user_name: 'gvamanda21' })
db.clients.insert({ id: '624c74db-d902-47c5-8959-6412d8554b40', full_name: 'Amanda Vizueta Baloira', phone: '+54(030)-7000939', user: o })

o = ObjectId();
db.users.insert({ _id: o, id: 'aecf14fa-e143-4485-b90b-269b7e3075d0', email: 'cbflorencia1@gmail.com', user_name: 'cbflorencia1' })
db.clients.insert({ id: '55dc2902-dca9-4441-98bd-cfff7b3f910b', full_name: 'Florencia Costanzo Albite', phone: '+54(343)-9445764', user: o })

## Projects
###############################


db.projects.insert({
  id: '3d80c2d5-6e56-4301-87d6-5394865d2e39',
  name: 'Stormtrooper toy',
  description: 'Colecciona las figuras de 30cm de tus personajes favoritos del universo Star Wars. Dimensiones: 30 cm aprox (la medida varía según el personaje). El proyecto inicia con la creacion de figuras de Troopers',
  category: 'toys',
  current_phase: 'init',
  start_date: new Date('2019-07-18'),
  end_date: new Date('2019-10-18'),
  images: ['https://timedotcom.files.wordpress.com/2015/09/star-wars-black-toys-stormtrooper.jpg'],
  need_collaborations: true,
  finished: false,
  project_leader: me1,
  owner: o1,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: true,
  shipping_address: 'Boulevard Min No. 902',
  tags: ['toys', 'fun', 'star-wars'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño',
      tasks: [
        {
          id: '01',
          name: 'Diseño',
          status: 'todo',
          collaborator: me10
        }
      ]
    },
    {
      id: 'development',
      name: 'Desarrollo'
    },
    {
      id: 'decoration',
      name: 'Decoración',
      tasks: [
        {
          id: '02',
          name: 'Decoración',
          status: 'todo',
          collaborator: me8
        }
      ]
    },
    {
      id: 'ship',
      name: 'Envío'

    },
    {
      id: 'final',
      name: 'Fin'
    }
  ],
  postulants: [
    {
      phase: 'design',
      task: '01',
      status: 'todo',
      collaborator: me10
    },
    {
      phase: 'decoration',
      task: '02',
      status: 'todo',
      collaborator: me8
    }
  ],
})

db.projects.insert({
  id: 'db6c0d68-734e-4b27-a3e2-399807aa74a8',
  name: 'Bonsai Manzano Frutal',
  description: 'Se preparan Bonsai de Manzano Frutal, tienen una altura 30cm',
  category: 'trees',
  current_phase: 'init',
  start_date: new Date('2019-05-1'),
  end_date: new Date('2019-05-18'),
  images: ['https://www.bonsaiempire.es/great-bonsai-album/acer-bonsai-pall.jpg'],
  need_collaborations: false,
  finished: false,
  project_leader: me4,
  owner: o4,
  promoted_level: '',
  rating: 1,
  region: 'Jujuy',
  require_shipping: false,
  shipping_address: '',
  tags: ['green', 'trees', 'weedings'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio',
      tasks: [
        {
          id: '01',
          name: 'Inicio',
          status: 'todo'
        }
      ]
    },
    {
      id: 'design',
      name: 'Diseño',
      tasks: [
        {
          id: '02',
          name: 'Diseño',
          status: 'todo'
        }
      ]
    },
    {
      id: 'development',
      name: 'Desarrollo'
    },
    {
      id: 'decoration',
      name: 'Decoración'
    },
    {
      id: 'ship',
      name: 'Envío'
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ]
})

db.projects.insert({
  id: '0967bdfd-355b-46e9-9ca8-182e67c4e2c9',
  name: 'Organizador de escritorio con reloj',
  description: 'Organizador de escritorio con reloj. Portalapices y portatacos elaborado artesanalemente con variedad de cueros.',
  category: 'escritorio',
  current_phase: 'init',
  start_date: new Date('2019-07-18'),
  end_date: new Date('2019-08-18'),
  images: ['https://elboyero.com/3534-large_default/organizador-de-escritorio-con-reloj-el-boyero.jpg'],
  need_collaborations: true,
  finished: false,
  project_leader: me7,
  owner: o7,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: true,
  shipping_address: 'Avenida Canar No. 406',
  tags: ['escritorio', 'reloj', 'estudio'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño',
      tasks: [
        {
          id: '01',
          name: 'Diseño',
          status: 'todo',
          collaborator: me10
        }
      ]
    },
    {
      id: 'development',
      name: 'Desarrollo',
      tasks: [
        {
          id: '02',
          name: 'Desarrollo',
          status: 'todo',
          collaborator: me1
        }
      ]
    },
    {
      id: 'decoration',
      name: 'Decoración'
    },
    {
      id: 'ship',
      name: 'Envío'
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ],
  postulants: [
    {
      phase: 'design',
      task: '01',
      status: 'todo',
      collaborator: me10
    },
    {
      phase: 'development',
      task: '02',
      status: 'todo',
      collaborator: me1
    }
  ],
})

db.projects.insert({
  id: '322472a0-4c24-4373-a182-94a03e4894ed',
  name: 'Lapicera classic pluma',
  description: ' Lapiceras classic pluma,  hechas por artesanos argentinos con maderas nativas de árboles caídos: quebracho, guayacán, itín, manzano, mora, retamo, jarilla entre otras. La marca de la pluma es Roden Point, el material de la misma es iridium y el trazo medio. Las partes metálicas están enchapadas en oro.',
  category: 'escritorio',
  current_phase: 'init',
  start_date: new Date('2019-09-1'),
  end_date: new Date('2019-10-18'),
  images: ['https://elboyero.com/7809-large_default/lapicera-classic-pluma-el-boyero.jpg'],
  need_collaborations: false,
  finished: false,
  project_leader: me7,
  owner: o7,
  promoted_level: '',
  rating: 1,
  region: 'La Rioja',
  require_shipping: false,
  shipping_address: '',
  tags: ['escritorio', 'reloj', 'estudio'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño'
    },
    {
      id: 'development',
      name: 'Desarrollo',
      tasks: [
        {
          id: '01',
          name: 'Desarrollo',
          status: 'todo'
        }
      ]
    },
    {
      id: 'decoration',
      name: 'Decoración'
    },
    {
      id: 'ship',
      name: 'Envío',
      tasks: [
        {
          id: '02',
          name: 'Envío',
          status: 'todo'
        }
      ]
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ]
})

db.projects.insert({
  id: '3d80c2d5-6e56-4301-87d6-5394865d2e39',
  name: 'Caja simple de madera',
  description: 'Cajas de madera nativas hechas a mano con maderas naturales combinadas. Le dan una  excelente presentación a las lapiceras. Pueden ser personalizadas mediante sistema láser. ',
  category: 'muables',
  current_phase: 'init',
  start_date: new Date('2019-07-18'),
  end_date: new Date('2019-08-18'),
  images: ['https://elboyero.com/7813-large_default/caja-simple-de-madera-el-boyero.jpg'],
  need_collaborations: true,
  finished: false,
  project_leader: me7,
  owner: o7,
  promoted_level: '',
  rating: 1,
  region: 'Buenos Aires',
  require_shipping: true,
  shipping_address: 'Real del Visanzay No. 829',
  tags: ['escritorio', 'lapiceras', 'estudio'],
  view_counts: 100,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño',
      tasks: [
        {
          id: '01',
          name: 'Diseño',
          status: 'todo',
          collaborator: me5
        }
      ]
    },
    {
      id: 'development',
      name: 'Desarrollo'
    },
    {
      id: 'decoration',
      name: 'Decoración',
      tasks: [
        {
          id: '02',
          name: 'Decoración',
          status: 'todo',
          collaborator: me10
        }
      ]
    },
    {
      id: 'ship',
      name: 'Envío',
      tasks: [
        {
          id: '03',
          name: 'Envío',
          status: 'todo',
          collaborator: me9
        }
      ]
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ],
  postulants: [
    {
      phase: 'design',
      task: '01',
      status: 'todo',
      collaborator: me5
    },
    {
      phase: 'decoration',
      task: '02',
      status: 'todo',
      collaborator: me10
    },
    {
      phase: 'ship',
      task: '03',
      status: 'todo',
      collaborator: me9
    }
  ],
})

db.projects.insert({
  id: 'ebaae8d2-25e2-4227-a173-d2a2cf165b12',
  name: 'Jarra de base Triangular',
  description: 'Jarra de base Triangular: delicada pieza Hecha a Mano con alpaca salteña y manija de asta de chivo.',
  category: 'Jarra',
  current_phase: 'init',
  start_date: new Date('2019-011-1'),
  end_date: new Date('2019-12-18'),
  images: ['https://elboyero.com/4878-large_default/jarra-de-base-triangular-hecha-a-mano-el-boyero.jpg'],
  need_collaborations: false,
  finished: false,
  project_leader: me10,
  owner: o10,
  promoted_level: '',
  rating: 1,
  region: 'Buenos Aires',
  require_shipping: false,
  shipping_address: '',
  tags: ['Jarra'],
  view_counts: 27,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño'
    },
    {
      id: 'development',
      name: 'Desarrollo'
    },
    {
      id: 'decoration',
      name: 'Decoración'
    },
    {
      id: 'ship',
      name: 'Envío',
      tasks: [
        {
          id: '01',
          name: 'Envío',
          status: 'todo'
        }
      ]
    },
    {
      id: 'final',
      name: 'Fin',
      tasks: [
        {
          id: '02',
          name: 'Fin',
          status: 'todo'
        }
      ]
    }
  ]
})

db.projects.insert({
  id: '06a11d53-60bb-45d9-81fe-94e155fe4415',
  name: 'Cerveza artesanal',
  description: 'Se prepararan 20Lt de cerveza artesanal, sabores: trigo, ipa y apa ',
  category: 'bebidas',
  current_phase: 'init',
  start_date: new Date('2019-8-18'),
  end_date: new Date('2019-12-18'),
  images: ['https://resizer.iprofesional.com/unsafe/640x/https://assets.iprofesional.com/assets/jpg/2019/02/473856_landscape.jpg?3.3.4.2'],
  need_collaborations: true,
  finished: false,
  project_leader: me6,
  owner: o6,
  promoted_level: '',
  rating: 1,
  region: 'Bueno Aires',
  require_shipping: true,
  shipping_address: 'Bulevar Tacna No. 615',
  tags: ['Bebidas', 'Cerveza'],
  view_counts: 570,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño'
    },
    {
      id: 'development',
      name: 'Desarrollo'
    },
    {
      id: 'decoration',
      name: 'Decoración',
      tasks: [
        {
          id: '01',
          name: 'Decoración',
          status: 'todo',
          collaborator: me6
        }
      ]
    },
    {
      id: 'ship',
      name: 'Envío',
      tasks: [
        {
          id: '02',
          name: 'Envío',
          status: 'todo',
          collaborator: me9
        }
      ]
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ],
  postulants: [
    {
      phase: 'decoration',
      task: '01',
      status: 'todo',
      collaborator: me6
    },
    {
      phase: 'ship',
      task: '02',
      status: 'todo',
      collaborator: me9
    }
  ],
})

db.projects.insert({
  id: '0a31328e-54a5-4a71-9873-c9e00a0ae8de',
  name: 'BROTHER SACRUM ',
  description: 'Figuras de accion',
  category: 'toys',
  current_phase: 'init',
  start_date: new Date('2019-08-1'),
  end_date: new Date('2019-08-18'),
  images: ['https://scontent.faep8-1.fna.fbcdn.net/v/t1.0-9/31306738_1645899022112706_2014410219681614346_n.jpg?_nc_cat=106&_nc_ht=scontent.faep8-1.fna&oh=6e3abfabe31675fcf30550428fafc17f&oe=5D7DBFE9'],
  need_collaborations: false,
  finished: false,
  project_leader: me4,
  owner: o1,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: false,
  shipping_address: '',
  tags: ['toys', 'jueguetes'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño'
    },
    {
      id: 'development',
      name: 'Desarrollo',
      tasks: [
        {
          id: '01',
          name: 'Desarrollo',
          status: 'todo'
        }
      ]
    },
    {
      id: 'decoration',
      name: 'Decoración',
      tasks: [
        {
          id: '02',
          name: 'Envío',
          status: 'todo'
        }
      ]
    },
    {
      id: 'ship',
      name: 'Envío'
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ]
})

db.projects.insert({
  id: '24e27679-bc08-465e-8187-8339903adb7e',
  name: 'CAU',
  description: 'CAU (comando terrorista unipersonal) El azote del terror . Muñeco hecho de resina',
  category: 'toys',
  current_phase: 'init',
  start_date: new Date('2019-05-18'),
  end_date: new Date('2019-07-18'),
  images: ['https://scontent.faep8-1.fna.fbcdn.net/v/t1.0-9/61799873_2313556802302749_4581363231490048000_n.jpg?_nc_cat=106&_nc_ht=scontent.faep8-1.fna&oh=f68ef392dbca213adcc8db2f04f74efc&oe=5D796DEA'],
  need_collaborations: true,
  finished: false,
  project_leader: me9,
  owner: o1,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: true,
  shipping_address: 'Av Libertador 357',
  tags: ['toys', 'fun'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño',
      tasks: [
        {
          id: '01',
          name: 'Diseño',
          status: 'todo',
          collaborator: me10
        }
      ]
    },
    {
      id: 'development',
      name: 'Desarrollo',
      tasks: [
        {
          id: '02',
          name: 'Desarrollo',
          status: 'todo',
          collaborator: me7
        }
      ]
    },
    {
      id: 'decoration',
      name: 'Decoración',
      tasks: [
        {
          id: '03',
          name: 'Decoración',
          status: 'todo',
          collaborator: me8
        }
      ]
    },
    {
      id: 'ship',
      name: 'Envío',
      tasks: [
        {
          id: '04',
          name: 'Envío',
          status: 'todo',
          collaborator: me9
        }
      ]
    },
    {
    id: 'final',
    name: 'Fin'
    }
  ],
  postulants: [
    {
      phase: 'design',
      task: '01',
      status: 'todo',
      collaborator: me10
    },
    {
      phase: 'development',
      task: '02',
      status: 'todo',
      collaborator: me7
    },
    {
      phase: 'decoration',
      task: '03',
      status: 'todo',
      collaborator: me8
    },
    {
      phase: 'ship',
      task: '04',
      status: 'todo',
      collaborator: me9
    }
  ],
})

db.projects.insert({
  id: 'bb46686d-6c33-4e84-a2a4-6c603c166fce',
  name: 'Batman',
  description: 'Figura de accion de Batman hecho de resina.',
  category: 'batman',
  current_phase: 'init',
  start_date: new Date('2019-10-1'),
  end_date: new Date('2019-10-18'),
  images: ['https://scontent.faep8-1.fna.fbcdn.net/v/t1.0-9/45186767_2113824931985382_1697576065578303488_n.jpg?_nc_cat=111&_nc_ht=scontent.faep8-1.fna&oh=9d2171b6912b9453fdb24c722c98774d&oe=5D7C7A97'],
  need_collaborations: false,
  finished: false,
  project_leader: me2,
  owner: o1,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: false,
  shipping_address: '',
  tags: ['toys', 'fun'],
  view_counts: 1,
  phases: [
    {
      id: 'init',
      name: 'Inicio'
    },
    {
      id: 'design',
      name: 'Diseño',
      tasks: [
        {
          id: '01',
          name: 'Envío',
          status: 'todo'
        }
      ]
    },
    {
      id: 'development',
      name: 'Desarrollo',
      tasks: [
        {
          id: '02',
          name: 'Desarrollo',
          status: 'todo'
        }
      ]
    },
    {
      id: 'decoration',
      name: 'Decoración'
    },
    {
      id: 'ship',
      name: 'Envío'
    },
    {
      id: 'final',
      name: 'Fin'
    }
  ]
})

db.projects.updateMany({}, { $set: { need_collaborations: true } })
```
