const { Users } = require("./models");
const authenticate = sequelize => {
  return sequelize
    .authenticate()
    .then(() => {
      global.hasDB = true;
      console.log("Connection has been established successfully.");

      // TODO - this logic will be moved to the auth service with phase 5

      return Users.findAll()
        .then(values => {
          const { hasDB } = global;

          const cleanData = JSON.stringify(values, null, 4);

          console.log("All users:", cleanData);
          if (hasDB === true && values.length === 0) {
            return Users.create({ email: "admin@admin" })
              .then(admin => {
                console.log("Auto-generated ID:", admin.id, admin.email);
                return admin;
              })
              .catch(err => {
                const error = "Unable to create original user: " + err;
                console.error(error);
                return error;
              });
          }
          return values;
        })
        .catch(err => {
          const error = "Unable to connect to findAll users: " + err;
          console.error(error);
          return error;
        });
    })
    .catch(err => {
      const error = "Unable to connect to the database: " + err;
      console.error(error);
      global.hasDB = false;
      global.dBError = error;
      return error;
    });
};

module.exports = authenticate;