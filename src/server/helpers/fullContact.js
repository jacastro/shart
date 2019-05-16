var key = process.env.FULLCONTACT_KEY
var fullcontact = require('contacts-api-node')({ apiKey: key })

module.exports.get_fullcontact_info = (email, callback) => {
  fullcontact.v2.person.lookup({
    email: email
  })
    .then(res => {
      // 2xx response
      if (callback) {
        callback({
          full_name: res.contactInfo ? res.contactInfo.fullName : '',
          photo: res.photos[0] ? res.photos[0].url : '',
          location: res.demographics ? res.demographics.locationGeneral : '',
          age: res.demographics ? res.demographics.age : 0,
          gender: res.demographics ? res.demographics.gender : ''
        })
      }
    })
    .catch(res => {
      console.log(res)
      callback({})
    })
}
