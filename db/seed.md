
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

```sh
#  db.users.find() view all
# remove all
#  db.users.remove({})
#  db.mes.remove({})
#  db.clients.remove({})
#  db.users.find({email: "dummy1@gmail.com"})
#  db.users.find({user_name: { $regex: "o$"}})

var o = ObjectId();
db.users.insert({_id: o, id: '518630cd-4f74-47dd-b407-b28fd22fab14', email: "matiasberrueta@gmail.com", user_name: "mberrueta"})
db.mes.insert({id: "07c1f058-ba1f-4338-904a-3dafa4cca96f", full_name: "Matias Berrueta", phone: "11-1111-1111", biography: "...", address: "...", city: "bs as", postal_code: "0000", tags: ["a1", "a2"], user: o })

o = ObjectId();
db.users.insert({_id: o, id: 'abde5c83-ae0b-4e13-b98b-bc6c2cc18fe9', email: "erikannunez@gmail.com", user_name: "eri"})
db.mes.insert({id: "b4773d3f-7498-49e4-9af5-d8c71dd705e5", full_name: "Erica Nuñez", phone: "22-2222-2222", biography: "...", address: "...", city: "bs as", postal_code: "1111", tags: ["a1", "a2"], user: o })

o = ObjectId();
db.users.insert({_id: o, id: '790cb6d5-7dc8-4c67-bd87-70a1babaca57', email: "otero.florencia96@gmail.com", user_name: "flor"})
db.mes.insert({id: "3c42e759-51c8-48dd-bb89-b7dc0271b0f2", full_name: "Florencia Otero", phone: "33-3333-3333", biography: "...", address: "...", city: "bs as", postal_code: "2222", tags: ["a1", "a2"], user: o })

o = ObjectId();
db.users.insert({_id: o, id: '97705399-ca0b-4dff-bb5a-86cbd8217b69', email: "javiacastro@gmail.com", user_name: "javi"})
db.mes.insert({id: "869e7c64-d3f6-4568-90a5-2dbfc7db8442", full_name: "Javier Castro", phone: "44-4444-4444", biography: "...", address: "...", city: "bs as", postal_code: "3333", tags: ["a1", "a2"], user: o })

o = ObjectId();
db.users.insert({_id: o, id: 'a7bee685-3e5b-4598-bf94-991234474265', email: "alberto.d.sal@gmail.com", user_name: "beto"})
db.mes.insert({id: "79cdc644-937a-4643-91d6-fdbae6e165e6", full_name: "Alrberto Sal", phone: "55-5555-5555", biography: "...", address: "...", city: "bs as", postal_code: "4444", tags: ["a1", "a2"], user: o })

o = ObjectId();
db.users.insert({_id: o, id: 'ff9a9004-eac9-4bf4-a6df-ea919dcdf44b', email: "dummy1@gmail.com", user_name: "dummy1"})
db.clients.insert({id: "6a3b1805-9b81-4a5c-a7ad-615edd6e8ff9", full_name: "Pepe Argento", phone: "66-6666-6666", user: o })

o = ObjectId();
db.users.insert({_id: o, id: '71920526-65e1-43b6-9113-0a75f3b7ee2a', email: "dummy2@gmail.com", user_name: "dummy2"})
db.clients.insert({id: "bb79a649-5780-4a40-89f8-5173b26fad83", full_name: "Pamela David", phone: "77-7777-7777", user: o })

o = ObjectId();
db.users.insert({_id: o, id: '74ed58c0-ed42-46f0-9b58-b5b4b9e254b6', email: "dummy3@gmail.com", user_name: "dumm3"})
db.clients.insert({id: "0678aed3-d4c7-4eda-976e-bd88eed2665b", full_name: "Eliot", phone: "88-8888-8888", user: o })
```