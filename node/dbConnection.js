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
        let sortQuery = { "Premium": 1 }
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

              let dwelling = ifNull(inputJson.data.insuranceData.dwelling, inputJson.data.insuranceData.dwelling_min);
              let personalProperty = ifNull(inputJson.data.insuranceData.personalProperty, inputJson.data.insuranceData.personalProperty_min);
              let personalLiability = ifNull(inputJson.data.insuranceData.personalLiability, inputJson.data.insuranceData.personalLiability_min);


              //Scenario 1 & 2
              try {
                if (personalProperty > dwelling) {
                  resJson.insight = "Personal Property is much higher than actual dwelling cost. Low chances of claim settlement";
                  resJson.risk = "High"
                } else if (personalLiability < (dwelling / 2)) {
                  resJson.insight = "Suggest liability to be changed to $300k";
                  resJson.risk = "Medium"
                } else if (inputJson.data.stateName == 'North Carolina' && (dwelling == inputJson.data.insuranceData.dwelling_min) && inputJson.data.policyData.floodInsurance != true) {
                  resJson.insight = "Floods can occur at any time of the year and just about anywhere in North Carolina. They may be caused by large amounts of rain, hurricanes or dam failures. Eastern North Carolina had a very bad, record-setting 500-year flood caused by Hurricane Floyd in 1999. Suggest to add Flood Insurance @ $370 additional premium";
                  resJson.risk = "High"
                } else if (inputJson.data.stateName == 'North Carolina' && (dwelling == inputJson.data.insuranceData.dwelling_min) && inputJson.data.policyData.floodInsurance == true) {
                  resJson.newPremium = resJson.newPremium + 370;
                }
              } catch (error) {
                console.error('Error occure while handling Home insurance scenario...');
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

              let deathBenefit = ifNull(inputJson.data.insuranceData.deathBenefit, inputJson.data.insuranceData.deathBenefit_min);
              let currentDebit = ifNull(inputJson.data.insuranceData.currentDebit, inputJson.data.insuranceData.currentDebit_min);
              let replacementIncome = ifNull(inputJson.data.insuranceData.replacementIncome, inputJson.data.insuranceData.replacementIncome_min);

              //Scenario 1 & 2
              if (deathBenefit < currentDebit) {
                resJson.insight = "Suggest to take increase whole life benefit to $300k and term plan for $750k for 10 years";
                resJson.risk = "High"
              } else if (replacementIncome == 10) {
                resJson.insight = "Take a Whole Life Insurance along with Annuities Rider for adequate coverage";
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

        case 'auto': {

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

              let bodilyInjuryLability = ifNull(inputJson.data.insuranceData.bodilyInjuryLability, inputJson.data.insuranceData.bodilyInjuryLability_min);
              let uninsuredOrUnderinsuredMotorist = ifNull(inputJson.data.insuranceData.uninsuredOrUnderinsuredMotorist, inputJson.data.insuranceData.uninsuredOrUnderinsuredMotorist_min);

              if (inputJson.data.stateName == 'Ohio' && bodilyInjuryLability <= 50000 && uninsuredOrUnderinsuredMotorist < 100000) {
                resJson.insight = "Considering the annual mileage, suggest to add Uninsured / Underinsured motorist Bodily Injury of $100,000 / person and $300,000 per accident";
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

  function ifNull(value1, value2) {
    if (value1 == undefined || value1 == null)
      return value2;

    return value1;
  }


}

module.exports = { getInsuraceMasterData, calculatePremium }