const url = "mongodb+srv://IK_DB:dbpass@cluster0.jdmxs.mongodb.net/IK_DB?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const premiumCalculation = require('./premiumCalculation')

let queryExecuionFailedErrorJSON = {
  status: "failed",
  errorCode: "IK500",
  errorMsg: "failed to execute query;"
}

async function getInsuraceMasterData() {

  console.log("inside getInsuraceMasterData")
  return new Promise((resolve, reject) => {
    try {

      MongoClient.connect(url, function (err, db) {
        if (err) {
          reject(queryExecuionFailedErrorJSON);

        }
        var dbo = db.db("IK_DB");
        var query = {};
        let response = {}
        dbo.collection("ik_home_ins_master_data").find(query).toArray(function (err, result) {
          if (err) {
            resolve(queryExecuionFailedErrorJSON);
          }
          response.states = result;
          db.close();
        });
        dbo.collection("ik_life_ins_master_data").find(query).toArray(function (err, result) {
          if (err) {
            resolve(queryExecuionFailedErrorJSON);
          }
          response.age = result;

          resolve({
            status: "success",
            data: response
          })

          db.close();
        });

      });

    } catch (error) {
      console.log('encountered an error while processing getBrowseCategories as ' + error)
    }
  });
}


async function calculatePremium(inputJson) {
  console.log('calculatePremium called... with data ' + JSON.stringify(inputJson));

  return new Promise((resolve, reject) => {
    try {

      switch (inputJson.data.insuranceType) {
        case "home": {
          MongoClient.connect(url, function (err, db) {
            if (err) reject(queryExecuionFailedErrorJSON);
            var dbo = db.db("IK_DB");
            var query = { product: inputJson.data.insuranceType };
            console.log("Executing query:" + JSON.stringify(query))
            dbo.collection("ik_parameter_data").find(query).toArray(function (err, result) {
              if (err) {
                resolve(queryExecuionFailedErrorJSON);
              }

              //console.log(JSON.stringify(result));
              let resJson = {}; 
                resJson.newPremium = premiumCalculation.calculateHomePremium(inputJson, result); 
                //Scenario 1
                
                resJson.insight = "Good chances of claim settlement";
                resJson.risk = "Low"

                if(inputJson.data.insuranceData.personalLiability > inputJson.data.insuranceData.dwelling){
                  resJson.insight = "Personal Property is much higher than actual dwelling cost. Low chances of claim settlement";
                  resJson.risk = "High"
                }

                
                //Scenario 2
             //   if(inputJson.data.insuranceData.dwelling)


              resolve({
                status: "success",
                data: resJson
              })

              db.close();
            });
          });
        }
        case "life": {
          MongoClient.connect(url, function (err, db) {
            if (err) reject(queryExecuionFailedErrorJSON);
            var dbo = db.db("IK_DB");
            var query = { product: inputJson.data.insuranceType };
            console.log("Executing query:" + JSON.stringify(query))
            dbo.collection("ik_parameter_data").find(query).toArray(function (err, result) {
              if (err) {
                resolve(queryExecuionFailedErrorJSON);
              }

              let resJson = {}; 
                resJson.newPremium = premiumCalculation.calculateLifePremium(inputJson, result); 

              resolve({
                status: "success",
                data: resJson
              })

              db.close();
            });
          });

        }
      }

    } catch (error) {
      console.log('encountered an error while processing getBrowseCategories as ' + error)
    }
  });

}

module.exports = { getInsuraceMasterData, calculatePremium }