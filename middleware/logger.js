//simple logger class that captures events and time of event, lifted from traversy
const moment = require("moment");
//note next must be called to proceed to next middleware program
const logger = (req, res, next) =>{
  console.log(
    `${req.protocol}://${req.get('host')}${req.originUrl}: ${moment().format()}`
    );
  next();
};

module.exports = logger;
