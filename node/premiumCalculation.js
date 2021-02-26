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
                let slots = calculateSlots(userData.data.insuranceData.dwelling_min, userData.data.insuranceData.dwelling, parametersJSON[i].factor2)
                total = total + (dwellingPre * (slots * parametersJSON[i].factor3))
                console.log('dwelling:' + total);

                /*
                total = total + calculateSlotPremium(userData.data.insuranceData.dwelling_min,
                    userData.data.insuranceData.dwelling,
                    100000,
                    10,
                    dwellingPre
                )
                */
                console.log('dwelling:' + total);
                break;
            }
            case 'other structure': {

                let slots = calculateSlots(userData.data.insuranceData.otherStructure_min, userData.data.insuranceData.otherStructure, parametersJSON[i].factor2)
                //total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (dwellingPre * slots * parametersJSON[i].factor3)
                console.log('other structure:' + total)

                /*
                total = total + calculateSlotPremium(userData.data.insuranceData.otherStructure_min,
                    userData.data.insuranceData.otherStructure,
                    10000,
                    1,
                    dwellingPre
                )
                */

                console.log('other structure:' + total)

                break;
            }
            case 'personal property':
                {
                    let slots = calculateSlots(userData.data.insuranceData.personalProperty_min, userData.data.insuranceData.personalProperty, parametersJSON[i].factor2)
                    //total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                    total = total + (dwellingPre * slots * parametersJSON[i].factor3)

                    /*
                    total = total + calculateSlotPremium(userData.data.insuranceData.personalProperty_min,
                        userData.data.insuranceData.personalProperty,
                        20000,
                        2,
                        dwellingPre
                    )
                    */

                    console.log('personal property:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                    console.log('personal property:' + total)
                    break;
                }
            case 'loss of use': {
                let slots = calculateSlots(userData.data.insuranceData.lossOfUse_min, userData.data.insuranceData.lossOfUse, parametersJSON[i].factor2)

                //total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (dwellingPre * slots * parametersJSON[i].factor3)
                /*
                total = total + calculateSlotPremium(userData.data.insuranceData.lossOfUse_min,
                    userData.data.insuranceData.lossOfUse,
                    10000,
                    1,
                    dwellingPre
                )
                */

                console.log('loss of use:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                console.log('loss of use:' + total)
                break;
            }
            case 'personal liability': {
                let slots = calculateSlots(userData.data.insuranceData.personalLiability_min, userData.data.insuranceData.personalLiability, parametersJSON[i].factor2)

                //total = total + (parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (slots * parametersJSON[i].factor3)
                /*
                total = total + calculateSlotPremiumWithoutPercent(userData.data.insuranceData.personalLiability_min,
                    userData.data.insuranceData.personalLiability,
                    100000,
                    5
                )
                */

                console.log('personal liability:' + (parametersJSON[i].factor1 * parametersJSON[i].factor3))
                console.log('personal liability:' + total)
                break;
            }
            case 'medical': {
                let slots = calculateSlots(userData.data.insuranceData.medical_min, userData.data.insuranceData.medical, parametersJSON[i].factor2)

                //total = total + (parametersJSON[i].factor1 * parametersJSON[i].factor3)
                total = total + (slots * parametersJSON[i].factor3)
                /*
                total = total + calculateSlotPremiumWithoutPercent(userData.data.insuranceData.medical_min,
                    userData.data.insuranceData.medical,
                    1000,
                    2
                )
                */

                console.log('medical:' + (slots * parametersJSON[i].factor3))
                console.log('medical:' + total)
                break;
            }
        }

    console.log('Policy data : ' + JSON.stringify(userData.data.policyData))

    if (userData.data.policyData) {
        try {
            let roofCondition = userData.data.policyData["roofCondition"];
            let plumingCondition = userData.data.policyData["plumingCondition"];
            total = calculateByPolicyData(roofCondition, dwellingPre, 'Roof condition', total);
            total = calculateByPolicyData(plumingCondition, dwellingPre, 'Pluming condition', total);
        } catch (error) {
            console.log('Error occured while calculating policy data as : ' + error);
        }

        if (userData.data.policyData.burglerAlarm == true) {
            console.log(`Burgler Alarm present in house so reducing 1% which is ${(dwellingPre * 0.01)} from default premium ${dwellingPre} now new total is : ${total - (dwellingPre * 0.01)}`)
            total = total - (dwellingPre * 0.01);
        }
    }
    console.log("total premium is : " + total.toFixed(0));
    return total.toFixed(0)
}

function calculateByPolicyData(conditionRating, dwelling_default, condition, total) {
    console.log(`calculateByPolicyData called... for ${condition} = ${conditionRating}`);

    switch (conditionRating) {
        case 'Good': {
            console.log(`${condition} is Good, subtracting ${(dwelling_default * 0.005)} from dwelling_default ${dwelling_default} now new calculated is ${total - (dwelling_default * 0.005)}`)
            total =  total - ( dwelling_default * 0.005)
            break;
        }
        case 'Excellent': {
            console.log(`${condition} is Excellent, subtracting ${(dwelling_default * 0.01)} from dwelling_default ${dwelling_default} now new dwelling_default is ${total - (dwelling_default * 0.01)}`)
            total = total - (dwelling_default * 0.01)
            break;
        }
        case 'Average': {
            total = total;
            console.log(`${condition} is Average and dwelling_default is ${dwelling_default}`)
            break;
        }
        case 'Poor': {
            console.log(`${condition} is Excellent, adding ${(dwelling_default * 0.005)} from dwelling_default ${dwelling_default} now new dwelling_default is ${total + (dwelling_default * 0.005)}`)
            total = total + (dwelling_default * 0.005)
            break;
        }
    }
    return total;
}

function calculateLifePremium(userData, parametersJSON) {
    console.log("calculateLifePremium called...")
    console.log("User Data :: " + JSON.stringify(userData))
    let default_premium = userData.data.premium
    let whole_life_insurance = default_premium;
    let term_insurance = default_premium;
    let new_term_benefit = userData.data.deathBenefit;
    let new_whole_life_benefit = userData.data.deathBenefit;

    console.log('****************************** life Insurance Premium Calculations ******************************************')
    console.log('Life default premium is : ' + default_premium + '  and death benefit is : ' + userData.data.deathBenefit);
    for (let i = 0; i < parametersJSON.length; i++)
        switch (parametersJSON[i].category) {

            case 'current debt': {
                let slots = calculateSlots(userData.data.insuranceData.currentDebit_min, userData.data.insuranceData.currentDebit, parametersJSON[i].factor2)
                //term_insurance = term_insurance + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                term_insurance = term_insurance + (default_premium * slots * parametersJSON[i].factor3)

                /*
                term_insurance = term_insurance + calculateSlotPremium(userData.data.insuranceData.currentDebit_min,
                    userData.data.insuranceData.currentDebit,
                    parametersJSON[i].factor2,
                    10,
                    default_premium
                );
                */

                if (userData.data.insuranceData.currentDebit != undefined && userData.data.insuranceData.currentDebit != null) {
                    new_term_benefit = new_term_benefit + userData.data.insuranceData.currentDebit;
                } else {
                    new_term_benefit = new_term_benefit + userData.data.insuranceData.currentDebit_min;
                }

                console.log('current debt:' + (default_premium * slots * parametersJSON[i].factor3));
                console.log('current debt:' + term_insurance);

                break;
            }
            case 'child education fund': {

                let slots = calculateSlots(userData.data.insuranceData.childEducationFund_min, userData.data.insuranceData.childEducationFund, parametersJSON[i].factor2)

                //term_insurance = term_insurance + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                term_insurance = term_insurance + (default_premium * slots * parametersJSON[i].factor3)

                /*
                term_insurance = term_insurance + calculateSlotPremium(userData.data.insuranceData.childEducationFund_min,
                    userData.data.insuranceData.childEducationFund,
                    parametersJSON[i].factor2,
                    5,
                    default_premium
                );
                */

                if (userData.data.insuranceData.childEducationFund != undefined && userData.data.insuranceData.childEducationFund != null) {
                    new_term_benefit = new_term_benefit + userData.data.insuranceData.childEducationFund;
                } else {
                    new_term_benefit = new_term_benefit + userData.data.insuranceData.childEducationFund_min;
                }


                console.log('child education fund:' + (default_premium * slots * parametersJSON[i].factor3))
                break;
            }
            case 'funeral spend':
                {
                    let slots = calculateSlots(userData.data.insuranceData.funeralSpend_min, userData.data.insuranceData.funeralSpend, parametersJSON[i].factor2)

                    //term_insurance = term_insurance + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                    term_insurance = term_insurance + (default_premium * slots * parametersJSON[i].factor3)

                    /*
                    term_insurance = term_insurance + calculateSlotPremium(userData.data.insuranceData.funeralSpend_min,
                        userData.data.insuranceData.funeralSpend,
                        parametersJSON[i].factor2,
                        2,
                        default_premium
                    )
                    */

                    if (userData.data.insuranceData.funeralSpend != undefined && userData.data.insuranceData.funeralSpend != null) {
                        new_term_benefit = new_term_benefit + userData.data.insuranceData.funeralSpend;
                    }
                    else {
                        new_term_benefit = new_term_benefit + userData.data.insuranceData.funeralSpend_min;
                    }


                    console.log('funeral spend:' + (default_premium * slots * parametersJSON[i].factor3))
                    break;
                }
            // case 'retirement age': {
            //     total = total + (default_premium + parametersJSON[i].factor1)
            //     console.log('retirement age:' + (default_premium + parametersJSON[i].factor1))
            //     break;
            // }
            case 'Annual Income you want to leave for nominee': {
                let slots = calculateSlots(userData.data.insuranceData.annualIncome_min, userData.data.insuranceData.annualIncome, parametersJSON[i].factor2)

                //whole_life_insurance = whole_life_insurance + ( default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor2))
                whole_life_insurance = whole_life_insurance + (default_premium * slots * parametersJSON[i].factor3)

                /*
                whole_life_insurance = whole_life_insurance + calculateSlotPremium(userData.data.insuranceData.annualIncome_min,
                    userData.data.insuranceData.annualIncome,
                    parametersJSON[i].factor2,
                    10,
                    default_premium
                )
                */

                new_whole_life_benefit = new_whole_life_benefit + userData.data.insuranceData.annualIncome_min;


                console.log('Annual Income you want to leave for nominee:' + (default_premium * slots * parametersJSON[i].factor3))
                break;
            }
            case 'How many years do you want the replacement income or emergency fund to last?': {
                let slots = calculateSlots(userData.data.insuranceData.replacementIncome_min, userData.data.insuranceData.replacementIncome, 1)

                //whole_life_insurance = whole_life_insurance + default_premium
                whole_life_insurance = whole_life_insurance + (default_premium * slots * parametersJSON[i].factor3)

                /*
                whole_life_insurance = whole_life_insurance + calculateSlotPremium(userData.data.insuranceData.replacementIncome_min,
                    userData.data.insuranceData.replacementIncome,
                    1, //parametersJSON[i].factor2,
                    5,
                    default_premium
                )
                */

                new_whole_life_benefit = new_whole_life_benefit + userData.data.insuranceData.replacementIncome_min;

                console.log('How many years do you want the replacement income or emergency fund to last?' + (default_premium * slots * parametersJSON[i].factor3))
                break;
            }
        }
    console.log("Whole life insurance is : " + whole_life_insurance + " and Term isnsurance is :  " + term_insurance);
    console.log("Whole life Benefit is : " + new_whole_life_benefit + " and Term Benefit is :  " + new_term_benefit);

    return {
        whole_life_insurance: whole_life_insurance,
        term_insurance: term_insurance,
        whole_life_benefit: new_whole_life_benefit,
        term_benefit: new_term_benefit

    }
}


function calculateAutoPremium(userData, parametersJSON) {
    console.log("calculateAutoPremium called...");
    console.log("User Data :: " + JSON.stringify(userData))
    let default_premium = userData.data.premium
    let auto_premium = default_premium;

    console.log('****************************** Auto Insurance Premium Calculations ******************************************')
    console.log('Auto default premium is : ' + default_premium);

    // Bodily Injury liability
    auto_premium = auto_premium + calculateSlotPremium(userData.data.insuranceData.bodilyInjuryLability_min,
        userData.data.insuranceData.bodilyInjuryLability,
        20000,
        5,
        auto_premium
    );

    console.log('Bodily injury:' + auto_premium);


    // Property damage liability
    auto_premium = auto_premium + calculateSlotPremium(userData.data.insuranceData.propertyDamageLiability_min,
        userData.data.insuranceData.propertyDamageLiability,
        20000,
        5,
        auto_premium
    );

    console.log('Property damage:' + auto_premium);

    // Comprehensive and collision
    auto_premium = auto_premium + calculateSlotPremium(userData.data.insuranceData.comprehensiveAndCollision_min,
        userData.data.insuranceData.comprehensiveAndCollision,
        500,
        1,
        auto_premium
    );
    console.log('Collision:' + auto_premium);


    // Personal injury protection
    auto_premium = auto_premium + calculateSlotPremium(userData.data.insuranceData.personalInjuryProtection_min,
        userData.data.insuranceData.personalInjuryProtection,
        1000,
        1,
        auto_premium
    );
    console.log('Personal injury:' + auto_premium);


    // Uninsured/Underinsured motorist bodily injury
    auto_premium = auto_premium + calculateSlotPremium(userData.data.insuranceData.uninsuredOrUnderinsuredMotorist_min,
        userData.data.insuranceData.uninsuredOrUnderinsuredMotorist,
        50000,
        2,
        auto_premium
    );
    console.log('Uninsured motorist:' + auto_premium);
    console.log('Total auto premium: ' + auto_premium)

    return auto_premium.toFixed(0)
}


function calculateSlotPremium(minValue, currentValue, slot, percentIncrease, premium) {
    if (currentValue == undefined || currentValue == null) {
        currentValue = minValue;
    }
    let numberOfSlots = (currentValue - minValue) / slot;
    let newPremium = numberOfSlots * (percentIncrease / 100) * premium;
    return newPremium;
}

function calculateSlotPremiumWithoutPercent(minValue, currentValue, slot, increase) {
    if (currentValue == undefined || currentValue == null) {
        currentValue = minValue;
    }
    let numberOfSlots = (currentValue - minValue) / slot;
    let newPremium = numberOfSlots * increase;
    return parseFloat(newPremium);
}

function calculateSlots(minValue, currentValue, slot) {
    if (currentValue == undefined || currentValue == null) {
        currentValue = minValue;
    }
    let numberOfSlots = (currentValue - minValue) / slot;
    return parseInt(numberOfSlots);
}

/*

function calculateAutoPremium(userData, parametersJSON){
console.log("********* Auto Data ******");
console.log(JSON.stringify(userData))
    return userData.data.premium

}
*/

module.exports = {
    calculateHomePremium,
    calculateLifePremium,
    calculateAutoPremium
}