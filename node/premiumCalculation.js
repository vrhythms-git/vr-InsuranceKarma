function calculateHomePremium(userData, parametersJSON) {
    console.log("calculateHomePremium called...")
    console.log("Paramter JSON :: " + JSON.stringify(parametersJSON));
    let dwellingPre = userData.data.premium
    let total = parseInt(dwellingPre);
    console.log('***************************** Home Insurance Premium Calculations *******************************************')
    console.log('dwelling default is : ' + dwellingPre);
    for (let i = 0; i < parametersJSON.length; i++)
        switch (parametersJSON[i].category) {

            case 'dwelling': {
               // total = total + (dwellingPre * ((parametersJSON[i].factor1 * parametersJSON[i].factor3) + 1))
               let slots = calculateSlots(userData.data.insuranceData.dwelling_min,userData.data.insuranceData.dwelling, parametersJSON[i].factor2)
               total = total + (dwellingPre * (slots * parametersJSON[i].factor3))
                console.log('dwelling:' + total);
                total = total + calculateSlotPremium(userData.data.insuranceData.dwelling_min, 
                                                      userData.data.insuranceData.dwelling,
                                                      100000,
                                                      10,
                                                      dwellingPre
                                                    )
                console.log('dwelling:' + total);
                break;
            }
            case 'other structure': {

                let slots = calculateSlots(userData.data.insuranceData.otherStructure_min,userData.data.insuranceData.otherStructure, parametersJSON[i].factor2)
                //total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (dwellingPre * slots * parametersJSON[i].factor3)
                console.log('other structure:' + total)

                total = total + calculateSlotPremium(userData.data.insuranceData.otherStructure_min, 
                    userData.data.insuranceData.otherStructure,
                    10000,
                    1,
                    dwellingPre
                  )
                
                  console.log('other structure:' + total)

                break;
            }
            case 'personal property':
                {
                    let slots = calculateSlots(userData.data.insuranceData.personalProperty_min,userData.data.insuranceData.personalProperty, parametersJSON[i].factor2)
                    //total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                    total = total + (dwellingPre * slots * parametersJSON[i].factor3)
                    total = total + calculateSlotPremium(userData.data.insuranceData.personalProperty_min, 
                        userData.data.insuranceData.personalProperty,
                        20000,
                        2,
                        dwellingPre
                      )
                       
                    console.log('personal property:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                    console.log('personal property:' + total)
                    break;
                }
            case 'loss of use': {
                let slots = calculateSlots(userData.data.insuranceData.lossOfUse_min,userData.data.insuranceData.lossOfUse, parametersJSON[i].factor2)

                //total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (dwellingPre * slots * parametersJSON[i].factor3)
                total = total + calculateSlotPremium(userData.data.insuranceData.lossOfUse_min, 
                    userData.data.insuranceData.lossOfUse,
                    10000,
                    1,
                    dwellingPre
                  )

                console.log('loss of use:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                console.log('loss of use:' + total)
                break;
            }
            case 'personal liability': {
                let slots = calculateSlots(userData.data.insuranceData.personalLiability_min,userData.data.insuranceData.personalLiability, parametersJSON[i].factor2)

                //total = total + (parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (slots * parametersJSON[i].factor3)
                total = total + calculateSlotPremiumWithoutPercent(userData.data.insuranceData.personalLiability_min, 
                    userData.data.insuranceData.personalLiability,
                    100000,
                    5
                  )

                console.log('personal liability:' + (parametersJSON[i].factor1 * parametersJSON[i].factor3))
                console.log('personal liability:' + total)
                break;
            }
            case 'medical': {
                let slots = calculateSlots(userData.data.insuranceData.medical_min,userData.data.insuranceData.medical, parametersJSON[i].factor2)

                //total = total + (parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (slots * parametersJSON[i].factor3)
                total = total + calculateSlotPremiumWithoutPercent(userData.data.insuranceData.medical_min, 
                    userData.data.insuranceData.medical,
                    1000,
                    2
                  )

                console.log('medical:' + (slots * parametersJSON[i].factor3))
                console.log('medical:' + total)
                break;
            }
        }
        console.log("total premium is : " + total.toFixed(0));
        return total.toFixed(0)
    }

    function calculateLifePremium(userData, parametersJSON) {
        console.log("calculateLifePremium called...")
        let default_premium = userData.data.premium
        let whole_life_insurance = 0;
        let term_insurance = 0;
            
        console.log('****************************** life Insurance Premium Calculations ******************************************')
        console.log('Life default premium is : ' + default_premium + '  and death benefit is : ' + userData.data.deathBenefit);
        for (let i = 0; i < parametersJSON.length; i++)
            switch (parametersJSON[i].category) {
    
                case 'current debt': {
                    term_insurance = term_insurance + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                    console.log('current debt:' + (default_premium * (parametersJSON[i].factor1 * parametersJSON[i].factor2)));
                    break;
                }
                case 'child education fund': {
    
                    term_insurance = term_insurance + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                    console.log('child education fund:' + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2)))
                    break;
                }
                case 'funeral spend':
                    {
                        term_insurance = term_insurance + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                        console.log('funeral spend:' + (default_premium +( parametersJSON[i].factor1 * parametersJSON[i].factor2)))
                        break;
                    }
                // case 'retirement age': {
                //     total = total + (default_premium + parametersJSON[i].factor1)
                //     console.log('retirement age:' + (default_premium + parametersJSON[i].factor1))
                //     break;
                // }
                case 'Annual Income you want to leave for nominee': {
                    whole_life_insurance = whole_life_insurance + ( default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                    console.log('Annual Income you want to leave for nominee:' + ( default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2)))
                    break;
                }
                case 'How many years do you want the replacement income or emergency fund to last?': {
                    whole_life_insurance = whole_life_insurance + default_premium
                    console.log('How many years do you want the replacement income or emergency fund to last?' + (default_premium))
                    break;
                }
            }
            console.log("Whole life insurance is : " + whole_life_insurance +" and Term isnsurance is :  "+ term_insurance);
            return {    
                whole_life_insurance: whole_life_insurance,
                term_insurance: term_insurance
            }
        }

        function calculateSlotPremium(minValue, currentValue, slot, percentIncrease, premium){
            if (currentValue == undefined || currentValue == null){
                currentValue = minValue;
            }
            let numberOfSlots = (currentValue - minValue)/ slot;
            let newPremium = numberOfSlots * (percentIncrease/100) * premium;
            return newPremium;
        }

        function calculateSlotPremiumWithoutPercent(minValue, currentValue, slot, increase){
            if (currentValue == undefined || currentValue == null){
                currentValue = minValue;
            }
            let numberOfSlots = (currentValue - minValue)/ slot;
            let newPremium = numberOfSlots * increase;
            return parseFloat(newPremium);
        }

        function calculateSlots(minValue, currentValue, slot){
            if (currentValue == undefined || currentValue == null){
                currentValue = minValue;
            }
            let numberOfSlots = (currentValue - minValue)/ slot;
            return parseInt(numberOfSlots);
        }


    module.exports = {
        calculateHomePremium,
        calculateLifePremium
    }