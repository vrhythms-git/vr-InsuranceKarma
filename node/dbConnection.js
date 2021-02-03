const url = "mongodb+srv://IK_DB:dbpass@cluster0.jdmxs.mongodb.net/IK_DB?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

async function getInsuraceMasterData() {

  console.log("inside getInsuraceMasterData")
  return new Promise((resolve, reject) => {
    try {

     MongoClient.connect(url, function (err, db) {
        if (err) {
          reject({
            status: "failed",
            errorCode: "IK500",
            errorMsg: "failed to execute query;"
          });

        }
        var dbo = db.db("IK_DB");
        var query = {};
        dbo.collection("ik_home_ins_master_data").find(query).toArray(function (err, result) {
          if (err) {
            resolve({
              status: "failed",
              errorCode: "IK500",
              errorMsg: "failed to execute query;"
            });
          }
          resolve({
            status: "success",
            data: result
          })

          db.close();
        });
      });

    } catch (error) {
      console.log('encountered an error while processing getBrowseCategories as ' + error)
    }
  });
}

module.exports = { getInsuraceMasterData }