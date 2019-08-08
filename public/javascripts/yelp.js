const axios = require('axios')

const yelp = {

    getHotels(city, business) {

        return axios.get(`https://api.yelp.com/v3/businesses/search?location=${city}&term=${business}&limit=50&is_closed=false`,
            { 'headers': { 'Authorization': `Bearer ${process.env.YELP_API}` } })

    }
}

module.exports = yelp