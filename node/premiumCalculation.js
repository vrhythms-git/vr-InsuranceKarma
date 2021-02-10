function calculateHomePremium(userData, parametersJSON) {
    console.log("calculateHomePremium called...")
    let dwellingPre = userData.data.premium
    let total = 0;
    console.log('***************************** Home Insurance Premium Calculations *******************************************')
    console.log('dwelling default is : ' + dwellingPre);
    for (let i = 0; i < parametersJSON.length; i++)
        switch (parametersJSON[i].category) {

            case 'dwelling': {
                total = total + (dwellingPre * ((parametersJSON[i].factor1 * parametersJSON[i].factor3) + 1))
                console.log('dwelling:' + (dwellingPre * ((parametersJSON[i].factor1 * parametersJSON[i].factor3) + 1)));
                break;
            }
            case 'other structure': {

                total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                console.log('other structure:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                break;
            }
            case 'personal property':
                {
                    total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                    console.log('personal property:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                    break;
                }
            case 'loss of use': {
                total = total + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3)
                console.log('loss of use:' + (dwellingPre * parametersJSON[i].factor1 * parametersJSON[i].factor3))
                break;
            }
            case 'personal liability': {
                total = total + (parametersJSON[i].factor1 * parametersJSON[i].factor3)
                console.log('personal liability:' + (parametersJSON[i].factor1 * parametersJSON[i].factor3))
                break;
            }
            case 'medical': {
                total = total + (parametersJSON[i].factor1 * parametersJSON[i].factor3)
                console.log('medical:' + (parametersJSON[i].factor1 * parametersJSON[i].factor3))
                break;
            }
        }
        console.log("total premium is : " + total.toFixed(0));
        return total.toFixed(0)
    }

    function calculateLifePremium(userData, parametersJSON) {
        console.log("calculateLifePremium called...")
        let default_premium = userData.data.premium
        let whole_life_insurance = userData.data.deathBenefit;
        let term_insurance = userData.data.deathBenefit;
            
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
                    console.log('child education fund:' + (default_premium + (parametersJSON[i].factor1 * parametersJSON[i].factor3)))
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
            console.log("Whole life insurance is : " + whole_life_insurance.toFixed(0) +" and Term isnsurance is :  "+ term_insurance.toFixed(0));
            return {    
                whole_life_insurance: whole_life_insurance.toFixed(0),
                term_insurance: term_insurance.toFixed(0)
            }
        }

    module.exports = {
        calculateHomePremium,
        calculateLifePremium
    }