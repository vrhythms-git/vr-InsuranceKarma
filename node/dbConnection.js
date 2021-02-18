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
        let sortQuery = {"Premium" : 1}
        dbo.collection("ik_life_ins_master_data").find(query).sort(sortQuery).toArray(function (err, result) {
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
              resJson.newPremium = parseInt(premiumCalculation.calculateHomePremium(inputJson, result));

              resJson.insight = "";
              resJson.risk = "";
              
              //Scenario 1 & 2
              if (inputJson.data.insuranceData.personalProperty > inputJson.data.insuranceData.dwelling) {
                resJson.insight = "Personal Property is much higher than actual dwelling cost. Low chances of claim settlement";
                resJson.risk = "High"
              }else if (inputJson.data.insuranceData.personalLiability < (inputJson.data.insuranceData.dwelling/2)){
                resJson.insight = "Suggest liability to be changed to 300k";
                resJson.risk = "Medium"
              }else if (inputJson.data.stateName == 'North Carolina' && (inputJson.data.insuranceData.dwelling == inputJson.data.insuranceData.dwelling_min) ){
                resJson.insight = "Floods can occur at any time of the year and just about anywhere in North Carolina. They may be caused by large amounts of rain, hurricanes or dam failures. Eastern North Carolina had a very bad, record-setting 500-year flood caused by Hurricane Floyd in 1999. Suggest to add Flood Insurance @ $370 additional premium";
                resJson.risk = "High"
              }

              console.log("Response data: " + JSON.stringify(resJson));


              resolve({
                status: "success",
                data: resJson
              })

              db.close();
            });
          });
          break;
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

              resJson.insight = "";
              resJson.risk = "";
              
              //Scenario 1 & 2
              if (inputJson.data.insuranceData.deathBenefit < inputJson.data.insuranceData.currentDebit) {
                resJson.insight = "Suggest to increase whole life benefit to 300k and term plan for 750k for 10 years";
                resJson.risk = "High"
              }else if (inputJson.data.insuranceData.replacementIncome == 10 ){
                resJson.insight = "Add annuities rider with the current whole life plan";
                resJson.risk = "Low"
              }

              console.log("Response data: " + JSON.stringify(resJson));
              resolve({
                status: "success",
                data: resJson
              })

              db.close();
            });
          });
          break;
        }

        case 'auto':{

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
              resJson.newPremium = parseInt(premiumCalculation.calculateAutoPremium(inputJson, result));

              resJson.insight = "";
              resJson.risk = "";

              if (inputJson.data.stateName == 'Ohio' && inputJson.data.insuranceData.bodilyInjuryLability <= 50000 ){
              resJson.insight = "Considering the annual mileage, suggest to add Uninsured / Underinsured motorist Bodily Injury os $ 100,000 / person and $ 300,000 per accident";
              resJson.risk = "Medium"
            }
            console.log("Response data: " + JSON.stringify(resJson));

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