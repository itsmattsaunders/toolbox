
// const inputData = require('./data/shipping-unformated.json');
const { handelize } = require('./utils.js');

// Format unstructured JSON data into settings_data for Shopify

const transformDataForShopify = (inputData) => {
    let result = {
        countries: []
    };

    inputData.forEach(data => {
        let countryIndex = result.countries.findIndex(c => c.country === data.country);


        if (countryIndex === -1) {
            const handle = handelize(data.country) || data.handle;

            countryIndex = result.countries.findIndex(c => handelize(c.country) === handle);

            if (countryIndex === -1) {
                result.countries.push({
                    country: data.country,
                    carriers: [{
                        courier: data.courier,
                        eta: data.eta,
                        price: data.price,
                        customs: data.customs
                    }]
                });
            } else {
                result.countries[countryIndex].carriers.push({
                    courier: data.courier,
                    eta: data.eta,
                    price: data.price,
                    customs: data.customs
                });
            }
        } else {
            result.countries[countryIndex].carriers.push({
                courier: data.courier,
                eta: data.eta,
                price: data.price,
                customs: data.customs
            });
        }
    });

    console.log(JSON.stringify(result, null, 2));

    return result;
};

transformDataForShopify(inputData);

module.exports = {
    transformDataForShopify
}