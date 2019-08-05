const axios = require('axios')
//const place = 0
const yelp = {

    getHotels(city) {

        return axios.get(`https://api.yelp.com/v3/businesses/search?location=${city}&term=hotel`,
            { 'headers': { 'Authorization': `Bearer lifkfsZ0BSprXLp7YwJszvCr1ZcDS_AqmXLxt4rrpQYYF6D_vR1TFRc8NLuyTNLBweUoyV4lWqPdcxp---WIbI7XdAh-M4BfVwDHVe5VuuY8iFuOf6PkH5YN5vQzXHYx` } })

    }
}

module.exports = yelp