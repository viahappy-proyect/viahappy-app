const axios = require('axios')

const yelp = {

    getHotels(city) {

        return axios.get(`https://api.yelp.com/v3/businesses/search?location=${city}&term=hotel&limit=50`,
            { 'headers': { 'Authorization': `Bearer lifkfsZ0BSprXLp7YwJszvCr1ZcDS_AqmXLxt4rrpQYYF6D_vR1TFRc8NLuyTNLBweUoyV4lWqPdcxp---WIbI7XdAh-M4BfVwDHVe5VuuY8iFuOf6PkH5YN5vQzXHYx` } })

    },

    getRestaurants(city) {

        return axios.get(`https://api.yelp.com/v3/businesses/search?location=${city}&term=restaurant&limit=50`,
            { 'headers': { 'Authorization': `Bearer lifkfsZ0BSprXLp7YwJszvCr1ZcDS_AqmXLxt4rrpQYYF6D_vR1TFRc8NLuyTNLBweUoyV4lWqPdcxp---WIbI7XdAh-M4BfVwDHVe5VuuY8iFuOf6PkH5YN5vQzXHYx` } })

    }
}

module.exports = yelp