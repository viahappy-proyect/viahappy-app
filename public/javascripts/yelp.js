const axios = require('axios')

const yelp = {

    getHotels(city, business) {

        return axios.get(`https://api.yelp.com/v3/businesses/search?location=${city}&term=${business}&limit=50&is_closed=false`,
//{ 'headers': { 'Authorization': `Bearer ${process.env.YELP_API}` } })
            { 'headers': { 'Authorization': `Bearer lifkfsZ0BSprXLp7YwJszvCr1ZcDS_AqmXLxt4rrpQYYF6D_vR1TFRc8NLuyTNLBweUoyV4lWqPdcxp---WIbI7XdAh-M4BfVwDHVe5VuuY8iFuOf6PkH5YN5vQzXHYx` } })

    }
}

module.exports = yelp