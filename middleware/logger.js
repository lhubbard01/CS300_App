//simple logger class that captures events and time of event, lifted from traversy
const moment = require("moment");

const logger = (req, res, next) =>{
  console.log(
    `${req.protocol}://${req.get('host')}${req.originUrl}: ${moment().format()}`
    );
  next();
};

module.exports = logger;
