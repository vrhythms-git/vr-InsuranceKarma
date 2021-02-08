function calculatePremium(userData, parametersJSON) {
    console.log("calculatePremium called...")
    let dwellingPre = userData.data.premium
    let total = 0;
    console.log('************************************************************************')
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

    module.exports = {
        calculatePremium
    }