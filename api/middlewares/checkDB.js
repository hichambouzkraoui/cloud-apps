const { sequelize } = require("../services/postgres");
/** Utility to connect to DB
 * @dev prevents API crashes when DB is unavailable
 */

module.exports = function checkDB(){
  return async (req, res, next) => {
    if (global.hasDB === false){
      res.status(503)
      return res.json(global.dBError);
    }else{
      next()
    }
  }
}