const key = process.env.FULLCONTACT_KEY;
const fullcontact = require('contacts-api-node')({ apiKey: key });

module.exports.get_fullcontact_info = (email, callback) => {
  fullcontact.v2.person.lookup({
    email
  })
    .then((res) => {
      // 2xx response
      if (res && callback) {
        callback({
          full_name: res.contactInfo ? res.contactInfo.fullName : '',
          photo: res.photos ? res.photos[0].url : '',
          location: res.demographics ? res.demographics.locationGeneral : '',
          age: res.demographics ? res.demographics.age : 0,
          gender: res.demographics ? res.demographics.gender : ''
        });
      }
    })
    .catch((res) => {
      console.log(res);
      callback({});
    });
};
