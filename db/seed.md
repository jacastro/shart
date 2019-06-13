
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
#  db.users.find() view all
# remove all
 db.users.remove({})
 db.mes.remove({})
 db.clients.remove({})
 db.projects.remove({})
#  db.users.find({email: "dummy1@gmail.com"})
#  db.users.find({user_name: { $regex: "o$"}})

## Mes
###############################

var o1 = ObjectId();
var me1 = ObjectId();
db.users.insert({_id: o1, id: "ae4cc7ac-0052-47e0-b2b1-499c6461e509", email: "matiasberrueta@gmail.com", user_name: "mberrueta"})
db.mes.insert({_id: me1, id: "ea1195ad-2732-49c4-a753-bc0eb6ba8180", full_name: "Matias Berrueta", phone: "11-1111-1111", biography: "...", address: "...", city: "bs as", postal_code: "0000", tags: ["aaa", "a2"], user: o1 })

var o2 = ObjectId();
var me2 = ObjectId();
db.users.insert({_id: o2, id: "58f3266e-a155-48f6-83b4-2dc909ecd17f", email: "erikannunez@gmail.com", user_name: "eri"})
db.mes.insert({_id: me2, id: "9d8628e3-189a-4637-a470-44b2b6a55d84", full_name: "Erica Nuñez", phone: "22-2222-2222", biography: "...", address: "...", city: "bs as", postal_code: "1111", tags: ["bbb", "a2"], user: o2 })

var o3 = ObjectId();
var me3 = ObjectId();
db.users.insert({_id: o3, id: "902d84c4-54aa-403d-953c-53be2206f130", email: "otero.florencia96@gmail.com", user_name: "flor"})
db.mes.insert({_id: me3, id: "fae57ec3-f23c-4464-8c5d-9427a37bc811", full_name: "Florencia Otero", phone: "33-3333-3333", biography: "...", address: "...", city: "bs as", postal_code: "2222", tags: ["a1", "ccc"], user: o3 })

var o4 = ObjectId();
var me4 = ObjectId();
db.users.insert({_id: o4, id: "30cdc899-c565-48c7-9235-d98d3d45de71", email: "javiacastro@gmail.com", user_name: "javi"})
db.mes.insert({_id: me4, id: "87bd4371-af14-4085-b7b2-928969fa7672", full_name: "Javier Castro", phone: "44-4444-4444", biography: "...", address: "...", city: "bs as", postal_code: "3333", tags: ["a1", "a2"], user: o4 })

var o5 = ObjectId();
var me5 = ObjectId();
db.users.insert({_id: o5, id: "a4c524e8-b817-4bab-a018-3f215d3cf3b4", email: "alberto.d.sal@gmail.com", user_name: "beto"})
db.mes.insert({_id: me5, id: "6540ce94-b6f8-46d6-8846-a18aae46b618", full_name: "Alrberto Sal", phone: "55-5555-5555", biography: "...", address: "...", city: "bs as", postal_code: "4444", tags: ["a1", "a2"], user: o5 })

## Clients
###############################

o = ObjectId();
db.users.insert({_id: o, id: "0f2e83e4-4d0a-4725-a461-5cfeee8deaef", email: "dummy1@gmail.com", user_name: "dummy1"})
db.clients.insert({id: "56c5c2b8-b6db-444f-a4a8-033a339a9777", full_name: "Pepe Argento", phone: "66-6666-6666", user: o })

o = ObjectId();
db.users.insert({_id: o, id: "1dc483ae-4739-4069-81ea-e815709b972c", email: "dummy2@gmail.com", user_name: "dummy2"})
db.clients.insert({id: "932fe867-7185-4b56-8937-883d3ac53054", full_name: "Pamela David", phone: "77-7777-7777", user: o })

o = ObjectId();
db.users.insert({_id: o, id: "51b94055-104b-4f22-bbdd-cef34c36fe3e", email: "dummy3@gmail.com", user_name: "dumm3"})
db.clients.insert({id: "097dcc40-18e2-46de-8ba9-0292493d9acf", full_name: "Eliot", phone: "88-8888-8888", user: o })

## Projects
###############################


db.projects.insert({
  id: "3d80c2d5-6e56-4301-87d6-5394865d2e39",
  name: 'Stormtrooper toy',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin efficitur erat, nec consectetur metus lobortis id. Donec tempus urna in mi finibus luctus. Donec ligula nisl, pulvinar quis leo nec, auctor vehicula magna. Vivamus et mi nec justo consequat sodales quis at lorem. Nullam ut euismod augue. Mauris ut erat lacus. Nulla eleifend fringilla faucibus. Donec facilisis blandit ligula vitae vestibulum. Vestibulum tincidunt facilisis lacus. Nulla facilisi. Maecenas in cursus lorem.',
  category: 'toys',
  current_phase: 'design',
  start_date: new Date('2019-05-18'),
  end_date: new Date('2019-07-18'),
  images: ['https://i.ebayimg.com/images/g/ud8AAOSwDFBaF3cU/s-l300.jpg'],
  need_collaborations: true,
  project_leader: me1,
  owner: o1,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: true,
  shipping_address: 'Av. siempre viva 54',
  tags: ['toys', 'fun', 'star-wars'],
  view_counts: 1,
  phases: [
    {
      id: "bce337ee-048b-45db-ac80-046109dc5ccf"design',
      name: 'Diseño',
      tasks: [
        {
          id: "d0d15c19-045e-4a74-9f5e-5c2cdb4af085"develop',
          name: 'Desarrollo',
          status: 'in_progress',
          collaborator: me2
        }
      ]
    }
  ],
  postulants: [
    {
      phase: 'design',
      task: 'develop',
      status: 'in_progress',
      collaborator: me3
    },
    {
      phase: 'design',
      task: 'develop',
      status: 'in_progress',
      collaborator: me4
    }
  ],
})

db.projects.insert({
  id: "db6c0d68-734e-4b27-a3e2-399807aa74a8",
  name: 'bonsai',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin efficitur erat, nec consectetur metus lobortis id. Donec tempus urna in mi finibus luctus. Donec ligula nisl, pulvinar quis leo nec, auctor vehicula magna. Vivamus et mi nec justo consequat sodales quis at lorem. Nullam ut euismod augue. Mauris ut erat lacus. Nulla eleifend fringilla faucibus. Donec facilisis blandit ligula vitae vestibulum. Vestibulum tincidunt facilisis lacus. Nulla facilisi. Maecenas in cursus lorem.',
  category: 'trees',
  current_phase: 'design',
  start_date: new Date('2019-05-1'),
  end_date: new Date('2019-05-18'),
  images: ['https://www.bonsaiempire.es/great-bonsai-album/acer-bonsai-pall.jpg'],
  need_collaborations: false,
  project_leader: me4,
  owner: o4,
  promoted_level: '',
  rating: 1,
  region: 'bsas',
  require_shipping: false,
  shipping_address: '',
  tags: ['green', 'trees', 'weedings'],
  view_counts: 1
})

```
