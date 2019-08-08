const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bussinesesSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    search_id: {type: Schema.Types.ObjectId, ref: 'Search'},
    name: String,
    image_url: String,
    // location: {
    //     type: { type: String, default:"Point"},
    //     coordinates: [Number]
    // },
    latitude: Number,
    longitude: Number,
    phone: String,
    rating: Number,
    price: String
    
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Bussineses = mongoose.model('Bussineses', bussinesesSchema);
module.exports = Bussineses
