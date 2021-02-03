var log4js = require("log4js");
//import { configure, getLogger } from "log4js";
//log4js.configure("../logs/ik_logs.log");
log4js.configure({
    appenders: { 'out': { type: 'stdout', layout: { type: 'colored' } } },
    categories: { default: { appenders: ['out'], level: 'info' } }
  });
//logger.level = "debug";

function logger(){
    
    return log4js.getLogger();
};


module.exports={logger}